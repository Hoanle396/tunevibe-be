import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumResolver } from './album.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from '@/schemas/album.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
  ],
  providers: [AlbumResolver, AlbumService],
})
export class AlbumModule {}
