import { Artist } from '@/schemas/artist.schema';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistResolver } from './artist.resolver';
import { ArtistService } from './artist.service';
import { Music } from '@/schemas/music.schema';
import { Users } from '@/schemas/user.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Music, Users])],
  providers: [ArtistResolver, ArtistService],
})
export class ArtistModule {}
