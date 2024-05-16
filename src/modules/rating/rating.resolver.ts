import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RatingService } from './rating.service';
import { Vote } from '@/schemas/vote.schema';
import { CreateVoteInput, ListVoteResult, VoteArgs } from './dto/rating-dto';
import { UserInputError } from 'apollo-server-express';

@Resolver('Rating')
export class RatingResolver {
  constructor(private readonly ratingService: RatingService) {}
  @Mutation(() => Vote)
  async createVote(@Args('input') input: CreateVoteInput): Promise<Vote> {
    let created: Vote | undefined;
    try {
      created = await this.ratingService.vote(input);
    } catch (error) {
      throw new UserInputError(error.message);
    }
    return created;
  }

  @Query(() => ListVoteResult)
  async getVotes(@Args('pagination') pagination: VoteArgs) {
    try {
      return await this.ratingService.findByMusic(pagination);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }
}
