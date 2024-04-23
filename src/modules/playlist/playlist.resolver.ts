import { Resolver } from '@nestjs/graphql';
import { PlaylistService } from './playlist.service';

@Resolver('Playlist')
export class PlaylistResolver {
  constructor(private readonly playlistService: PlaylistService) {}
}
