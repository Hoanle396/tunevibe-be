import { Resolver } from '@nestjs/graphql';
import { RatingService } from './rating.service';

@Resolver('Rating')
export class RatingResolver {
  constructor(private readonly ratingService: RatingService) {}
}
