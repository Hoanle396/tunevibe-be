import { Music } from '@/schemas/music.schema';
import { PlayList } from '@/schemas/playlist.schema';
import { Users } from '@/schemas/user.schema';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistResolver } from './playlist.resolver';
import { PlaylistService } from './playlist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Music, Users, PlayList])],
  providers: [PlaylistResolver, PlaylistService],
})
export class PlaylistModule {}
