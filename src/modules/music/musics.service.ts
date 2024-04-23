import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Music, MusicDocument } from 'src/schemas/music.schema';
import { CreateMusicInput, CreateMusicResult } from './dto/create-music.input';

@Injectable()
export class MusicsService {
  constructor(
    @InjectModel(Music.name) private musicModel: Model<MusicDocument>,
  ) {}
  async create(createMusicInput: CreateMusicInput): Promise<CreateMusicResult> {
    const created = new this.musicModel(createMusicInput);
    let music: MusicDocument | undefined;
    try {
      music = await created.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
    return music;
  }
}
