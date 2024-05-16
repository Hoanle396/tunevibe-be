import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistResolver } from './playlist.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from '@/schemas/music.schema';
import { Users } from '@/schemas/user.schema';
import { PlayList } from '@/schemas/playlist.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Music, Users, PlayList])],
  providers: [PlaylistResolver, PlaylistService],
})
export class PlaylistModule {}
