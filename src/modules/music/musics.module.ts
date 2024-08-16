import { Play } from '@/schemas/play.schema';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from 'src/schemas/album.schema';
import { Artist } from 'src/schemas/artist.schema';
import { Music } from 'src/schemas/music.schema';
import { MusicController } from './musics.controller';
import { MusicsResolver } from './musics.resolver';
import { MusicsService } from './musics.service';

@Module({
  imports: [TypeOrmModule.forFeature([Music, Album, Artist, Play])],
  providers: [MusicsResolver, MusicsService],
  controllers: [MusicController],
  exports: [MusicsService],
})
export class MusicsModule {}
