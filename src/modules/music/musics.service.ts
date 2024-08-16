import { Pagination } from '@/decorators/types';
import { Album } from '@/schemas/album.schema';
import { Play } from '@/schemas/play.schema';
import { genMeta } from '@/utils/function';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from 'src/schemas/music.schema';
import { ILike, Repository } from 'typeorm';
import { CreateMusicInput, ListMusicResult } from './dto/create-music.input';

@Injectable()
export class MusicsService {
  constructor(
    @InjectRepository(Music) private musicModel: Repository<Music>,
    @InjectRepository(Album) private Album: Repository<Album>
  ) {}
  async create(input: CreateMusicInput): Promise<Music> {
    try {
      const { albumId, content, cover, hash, limit, name, price } = input;
      const exits = await this.Album.findOne({
        where: { id: +albumId },
      });
      if (!exits) {
        throw new BadRequestException('Album not found');
      }
      const play = new Play();
      play.save();
      const music = new Music();
      music.album = exits;
      music.cover = cover;
      music.content = content;
      music.hash = hash;
      music.limit = limit;
      music.name = name;
      music.price = price;
      music.play = play;
      return await music.save();
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
        relations: {
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
      });
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
      return await this.musicModel.findOne({
        where: { id: id },
        relations: {
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
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
