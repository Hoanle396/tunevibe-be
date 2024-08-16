import { Pagination } from '@/decorators/types';
import { Album } from '@/schemas/album.schema';
import { Artist } from '@/schemas/artist.schema';
import { Users } from '@/schemas/user.schema';
import { genMeta } from '@/utils/function';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import {
  CreateAlbumInput,
  ListAlbumResult,
  UpdateAlbumInput,
} from './dto/album-dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album) private Album: Repository<Album>,
    @InjectRepository(Artist) private Artist: Repository<Artist>
  ) {}
  async create({ name, artist, cover }: CreateAlbumInput): Promise<Album> {
    try {
      const artistExits = await this.Artist.findOne({ where: { id: artist } });
      if (!artistExits) {
        throw new BadRequestException('Artist not found');
      }
      return await this.Album.save({
        name,
        cover,
        artist: artistExits,
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async update({ name, artist, cover, id }: UpdateAlbumInput): Promise<Album> {
    try {
      const exits = await this.Album.findOne({ where: { id: id } });
      if (!exits) {
        throw new BadRequestException('Album not found');
      }
      if (name) exits.name = name;
      if (cover) exits.cover = cover;
      return await exits.save();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async delete(id: number) {
    try {
      return await this.Album.delete(id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findOne(id: number): Promise<Album> {
    try {
      return await this.Album.findOne({
        where: { id: id },
        relations: {
          musics: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async find(params: Pagination, user?: Users): Promise<ListAlbumResult> {
    const { limit = 10, search = '', page = 1 } = params;
    let where: FindOptionsWhere<Album> = {};
    try {
      let artist: Artist | undefined;
      if (user) {
        artist = await this.Artist.findOne({
          where: {
            user: {
              id: user.id,
            },
          },
        });

        if (artist)
          where = {
            artist: {
              id: artist.id,
            },
          };
      }
      where.name = ILike('%' + search + '%');
      const [albums, counts] = await this.Album.findAndCount({
        where,
        take: limit,
        skip: (page - 1) * limit,
        relations: {
          musics: true,
          artist: true,
        },
      });
      return {
        data: albums,
        meta: genMeta(counts, limit, page),
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
