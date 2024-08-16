import { Pagination, Transfer } from '@/decorators/types';
import { Music } from '@/schemas/music.schema';
import { Transaction } from '@/schemas/transaction.schema';
import { Users } from '@/schemas/user.schema';
import { genMeta } from '@/utils/function';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ListTransactionResult,
  UpdateTransaction,
} from './dto/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction) private Transaction: Repository<Transaction>,
    @InjectRepository(Users) private Users: Repository<Users>,
    @InjectRepository(Music) private Musics: Repository<Music>
  ) {}
  async findByMe(
    { limit, page }: Pagination,
    { id }: Users
  ): Promise<ListTransactionResult> {
    try {
      const [list, counts] = await this.Transaction.findAndCount({
        where: { user: { id } },
        take: limit,
        skip: (page - 1) * limit,
        relations: {
          user: true,
          music: {
            album: {
              artist: {
                user: true,
              },
            },
            comment: true,
            interaction: true,
            vote: true,
            play: true,
          },
        },
      });
      return {
        data: list,
        meta: genMeta(counts, limit, page),
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async find({ limit, page }: Pagination): Promise<ListTransactionResult> {
    try {
      const [list, counts] = await this.Transaction.findAndCount({
        where: { status: Transfer.OnSale },
        take: limit,
        skip: (page - 1) * limit,
        relations: {
          user: true,
          music: true,
        },
      });
      return {
        data: list,
        meta: genMeta(counts, limit, page),
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async create(input: UpdateTransaction, users: Users): Promise<Transaction> {
    const { id, status, price, musicId } = input;
    try {
      const user = await this.Users.findOne({ where: { id: users.id } });
      if (!user) {
        throw new BadRequestException('User does not exist');
      }

      const music = await this.Musics.findOne({ where: { id: musicId } });
      if (!music) {
        throw new BadRequestException('Music does not exist');
      }

      const transaction = await this.Transaction.findOne({ where: { id } });
      if (!transaction) {
        const transaction = new Transaction();

        transaction.music = music;
        transaction.user = user;
        transaction.price = price;
        transaction.status = Transfer.Hold;
        return await transaction.save();
      } else if (status == Transfer.Sold) {
        transaction.status = Transfer.Sold;
        await transaction.save();

        const newTransaction = new Transaction();
        newTransaction.music = music;
        newTransaction.user = user;
        newTransaction.price = price;
        newTransaction.status = Transfer.Hold;
        return await newTransaction.save();
      } else {
        transaction.price = price;
        transaction.status = input.status;
        return await transaction.save();
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
