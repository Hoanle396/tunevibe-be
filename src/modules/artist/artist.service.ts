import { Pagination } from '@/decorators/types';
import { Artist } from '@/schemas/artist.schema';
import { Music } from '@/schemas/music.schema';
import { Users } from '@/schemas/user.schema';
import { genMeta } from '@/utils/function';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateArtistInput, ListArtistResult } from './dto/artist-dto';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist) private Artist: Repository<Artist>,
    @InjectRepository(Users) private Users: Repository<Users>,
    @InjectRepository(Music) private Music: Repository<Music>
  ) {}
  async createOrUpdate(input: CreateArtistInput): Promise<Artist> {
    try {
      if (input.id) {
        const artist = await this.Artist.findOne({ where: { id: input.id } });
        if (!artist) {
          throw new BadRequestException('Artist does not exist');
        }
        if (input.description) artist.description = input.description;
        if (input.name) artist.name = input.name;
        return await artist.save();
      } else {
        const user = await this.Users.findOne({ where: { id: +input.userId } });
        if (!user) {
          throw new BadRequestException('User does not exist');
        }
        return await this.Artist.save({ ...input, user });
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getMe({ id }: Users) {
    try {
      const me = await this.Artist.findOne({
        where: {
          user: {
            id,
          },
        },
      });
      if (me) {
        return me;
      }
      return undefined;
    } catch (error) {
      return undefined;
    }
  }

  async find(params: Pagination): Promise<ListArtistResult> {
    const { limit = 10, search = '', page = 1 } = params;
    try {
      const [musics, counts] = await this.Artist.findAndCount({
        where: { name: ILike('%' + search + '%') },
        take: limit,
        skip: (page - 1) * limit,
        relations: {
          user: true,
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

  async findOne(id: number): Promise<Artist> {
    try {
      return await this.Artist.findOne({
        where: { id: id },
        relations: {
          user: true,
          albums: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findByArtist(id: number) {
    try {
      if (await this.Artist.exists({ where: { user: { id } } })) {
        return await this.Music.find({
          where: {
            album: {
              artist: {
                id,
              },
            },
          },
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
      }
      return [];
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
