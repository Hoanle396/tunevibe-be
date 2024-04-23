import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from 'src/schemas/album.schema';
import { Artist, ArtistSchema } from 'src/schemas/artist.schema';
import { Music, MusicSchema } from 'src/schemas/music.schema';
import { MusicsResolver } from './musics.resolver';
import { MusicsService } from './musics.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Music.name, schema: MusicSchema },
      { name: Album.name, schema: AlbumSchema },
      { name: Artist.name, schema: ArtistSchema },
    ]),
  ],
  providers: [MusicsResolver, MusicsService],
  exports: [MusicsService],
})
export class MusicsModule {}
