import { Music } from '@/schemas/music.schema';
import { Users } from '@/schemas/user.schema';
import { Vote } from '@/schemas/vote.schema';
import { genMeta } from '@/utils/function';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVoteInput, ListVoteResult, VoteArgs } from './dto/rating-dto';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Vote) private Vote: Repository<Vote>,
    @InjectRepository(Users) private Users: Repository<Users>,
    @InjectRepository(Music) private Musics: Repository<Music>
  ) {}
  async vote(vote: CreateVoteInput): Promise<Vote> {
    try {
      const user = await this.Users.findOne({ where: { id: vote.userId } });
      if (!user) {
        throw new BadRequestException('User does not exist');
      }
      return await this.Vote.save({ ...vote, user });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findByMusic(params: VoteArgs): Promise<ListVoteResult> {
    const { limit = 10, search = '', page = 1, musicId } = params;
    try {
      const music = await this.Musics.findOne({ where: { id: musicId } });
      if (!music) {
        throw new BadRequestException('Music not found');
      }
      const [votes, counts] = await this.Vote.findAndCount({
        where: { music },
        take: limit,
        skip: (page - 1) * limit,
        relations: {
          user: true,
        },
      });
      return {
        data: votes,
        meta: genMeta(counts, limit, page),
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
