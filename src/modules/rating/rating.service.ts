import { Music } from '@/schemas/music.schema';
import { Users } from '@/schemas/user.schema';
import { Vote } from '@/schemas/vote.schema';
import { genMeta } from '@/utils/function';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateVoteInput,
  FindByMe,
  ListVoteResult,
  VoteArgs,
} from './dto/rating-dto';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Vote) private Vote: Repository<Vote>,
    @InjectRepository(Users) private Users: Repository<Users>,
    @InjectRepository(Music) private Musics: Repository<Music>
  ) {}
  async vote(vote: CreateVoteInput, users: Users): Promise<Vote> {
    try {
      const user = await this.Users.findOne({ where: { id: users.id } });
      if (!user) {
        throw new BadRequestException('User does not exist');
      }

      const music = await this.Musics.findOne({ where: { id: vote.musicId } });
      if (!music) {
        throw new BadRequestException('Music does not exist');
      }

      const exits = await this.Vote.findOne({
        where: { user: { id: user.id }, music: { id: music.id } },
      });

      if (exits) {
        exits.rate = vote.rate;
        return await exits.save();
      } else {
        return await this.Vote.save({ ...vote, music, user });
      }
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

  async findByMe(params: FindByMe, user: Users): Promise<Vote> {
    const { musicId } = params;
    try {
      const music = await this.Musics.findOne({ where: { id: musicId } });
      if (!music) {
        throw new BadRequestException('Music not found');
      }
      const vote = await this.Vote.findOne({
        where: {
          music: { id: music.id },
          user: { id: user.id },
        },
        relations: {
          user: true,
        },
      });
      if (!vote) {
        return {
          id: 0,
          rate: 0,
          user,
          music,
        } as Vote;
      }
      return vote;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
