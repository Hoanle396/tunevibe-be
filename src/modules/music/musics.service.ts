import { Pagination } from '@/decorators/types';
import { genMeta } from '@/utils/function';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from 'src/schemas/music.schema';
import { ILike, Repository } from 'typeorm';
import { CreateMusicInput, ListMusicResult } from './dto/create-music.input';

@Injectable()
export class MusicsService {
  constructor(@InjectRepository(Music) private musicModel: Repository<Music>) {}
  async create(createMusicInput: CreateMusicInput): Promise<Music> {
    try {
      return await this.musicModel.save(createMusicInput);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async find(params: Pagination): Promise<ListMusicResult> {
    const { limit = 10, search = '', page = 1 } = params;
    try {
      const [musics, counts] = await this.musicModel.findAndCount({
        where: { name: ILike('%' + search + '%') },
        take: limit,
        skip: (page - 1) * limit,
      });
      console.log({ musics, counts });

      return {
        data: musics,
        meta: genMeta(counts, limit, page),
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number): Promise<Music> {
    try {
      return await this.musicModel.findOne({ where: { id: id } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
