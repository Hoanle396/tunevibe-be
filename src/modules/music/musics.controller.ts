import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { MusicsService } from './musics.service';

@Controller('/music')
export class MusicController {
  constructor(private readonly musicsService: MusicsService) {}

  @Get('/:id')
  async getMusic(@Param('id') id: string) {
    try {
      const music = await this.musicsService.findOne(+id);

      if (music) return music;
      throw new NotFoundException('Music not found');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
