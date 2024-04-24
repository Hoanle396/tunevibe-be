import { Album } from '@/schemas/album.schema';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumResolver } from './album.resolver';
import { AlbumService } from './album.service';

@Module({
  imports: [TypeOrmModule.forFeature([Album])],
  providers: [AlbumResolver, AlbumService],
})
export class AlbumModule {}
