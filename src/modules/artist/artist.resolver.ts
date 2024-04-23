import { Resolver } from '@nestjs/graphql';
import { ArtistService } from './artist.service';

@Resolver('Artist')
export class ArtistResolver {
  constructor(private readonly artistService: ArtistService) {}
}
