import { Resolver } from '@nestjs/graphql';
import { AlbumService } from './album.service';

@Resolver('Album')
export class AlbumResolver {
  constructor(private readonly albumService: AlbumService) {}
}
