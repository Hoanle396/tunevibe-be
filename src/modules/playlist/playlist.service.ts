import { Pagination } from '@/decorators/types';
import { Music } from '@/schemas/music.schema';
import { PlayList } from '@/schemas/playlist.schema';
import { Users } from '@/schemas/user.schema';
import { genMeta } from '@/utils/function';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import {
  AddToPlaylistInput,
  CreatePlaylistInput,
  ListPlayListResult,
  UpdatePlaylistInput,
} from './dto/play-list-dto';

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

  async delete(id: number) {
    try {
      return await this.PlayList.delete(id);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async addToPlaylist(input: AddToPlaylistInput) {
    try {
      const exitsPlaylist = await this.PlayList.findOne({
        where: { id: input.playlistId },
        relations: {
          musics: true,
        },
      });
      if (!exitsPlaylist) {
        throw new BadRequestException('Playlist does not exist');
      }
      const exitsMusic = await this.Musics.findOne({
        where: { id: input.musicId },
      });
      if (!exitsMusic) {
        throw new BadRequestException('Music does not exist');
      }
      exitsPlaylist.musics?.push(exitsMusic);

      return await exitsPlaylist.save();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async deleteFromPlaylist(input: AddToPlaylistInput) {
    try {
      const exitsPlaylist = await this.PlayList.findOne({
        where: { id: input.playlistId },
        relations: {
          musics: true,
        },
      });
      if (!exitsPlaylist) {
        throw new BadRequestException('Playlist does not exist');
      }
      const exitsMusic = await this.Musics.findOne({
        where: { id: input.musicId },
      });
      if (!exitsMusic) {
        throw new BadRequestException('Music does not exist');
      }
      exitsPlaylist.musics = exitsPlaylist.musics.filter(
        (m) => m.id !== exitsMusic.id
      );

      return await exitsPlaylist.save();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async update(input: UpdatePlaylistInput) {
    try {
      const exits = await this.PlayList.findOne({ where: { id: input.id } });
      if (!exits) {
        throw new BadRequestException('Playlist Not Found');
      }
      if (input.name) exits.name = input.name;
      return await exits.save();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async find(params: Pagination, user: Users): Promise<ListPlayListResult> {
    const { limit = 10, search = '', page = 1 } = params;
    try {
      const [playlist, counts] = await this.PlayList.findAndCount({
        where: { name: ILike('%' + search + '%'), user },
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
