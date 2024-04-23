import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistResolver } from './artist.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from '@/schemas/artist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
  ],
  providers: [ArtistResolver, ArtistService],
})
export class ArtistModule {}
