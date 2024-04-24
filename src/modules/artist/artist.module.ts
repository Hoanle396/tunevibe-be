import { Artist } from '@/schemas/artist.schema';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistResolver } from './artist.resolver';
import { ArtistService } from './artist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  providers: [ArtistResolver, ArtistService],
})
export class ArtistModule {}
