import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { Users } from '@/schemas/user.schema';
import { Vote } from '@/schemas/vote.schema';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import {
  CreateVoteInput,
  FindByMe,
  ListVoteResult,
  VoteArgs,
} from './dto/rating-dto';
import { RatingService } from './rating.service';

@Resolver('Rating')
export class RatingResolver {
  constructor(private readonly ratingService: RatingService) {}
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Vote)
  async createVote(
    @Context('req') req: any,
    @Args('input') input: CreateVoteInput
  ): Promise<Vote> {
    const user: Users = req.user;
    if (!user)
      throw new UnauthorizedException(
        'Could not log-in with the provided credentials'
      );
    try {
      return await this.ratingService.vote(input, user);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @Query(() => ListVoteResult)
  async getVotes(@Args('pagination') pagination: VoteArgs) {
    try {
      return await this.ratingService.findByMusic(pagination);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Vote)
  async getVote(@Context('req') req: any, @Args('input') input: FindByMe) {
    const user: Users = req.user;
    if (!user)
      throw new UnauthorizedException(
        'Could not log-in with the provided credentials'
      );
    try {
      return await this.ratingService.findByMe(input, user);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }
}
