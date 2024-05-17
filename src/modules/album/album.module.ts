import { Album } from '@/schemas/album.schema';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumResolver } from './album.resolver';
import { AlbumService } from './album.service';
import { Artist } from '@/schemas/artist.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Artist])],
  providers: [AlbumResolver, AlbumService],
})
export class AlbumModule {}
