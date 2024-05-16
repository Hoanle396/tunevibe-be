import { Music } from '@/schemas/music.schema';
import { PlayList } from '@/schemas/playlist.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreatePlaylistInput, ListPlayListResult } from './dto/play-list-dto';
import { Users } from '@/schemas/user.schema';
import { Pagination } from '@/decorators/types';
import { genMeta } from '@/utils/function';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(PlayList) private PlayList: Repository<PlayList>,
    @InjectRepository(Music) private Musics: Repository<Music>
  ) {}

  async create(input: CreatePlaylistInput, user: Users): Promise<PlayList> {
    try {
      return await this.PlayList.create({ ...input, user });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async find(params: Pagination): Promise<ListPlayListResult> {
    const { limit = 10, search = '', page = 1 } = params;
    try {
      const [playlist, counts] = await this.PlayList.findAndCount({
        where: { name: ILike('%' + search + '%') },
        take: limit,
        skip: (page - 1) * limit,
        relations: {
          musics: true,
          user: true,
        },
      });
      return {
        data: playlist,
        meta: genMeta(counts, limit, page),
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number): Promise<PlayList> {
    try {
      return await this.PlayList.findOne({
        where: { id: id },
        relations: {
          musics: true,
          user: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
