import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ArtistService } from './artist.service';
import { Artist } from '@/schemas/artist.schema';
import { CreateArtistInput, ListArtistResult } from './dto/artist-dto';
import { UserInputError } from 'apollo-server-express';
import { Pagination } from '@/decorators/types';
import {
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { Users } from '@/schemas/user.schema';
import { Music } from '@/schemas/music.schema';

@Resolver('Artist')
export class ArtistResolver {
  constructor(private readonly artistService: ArtistService) {}

  @Mutation(() => Artist)
  async createUpdateArtist(
    @Args('input') input: CreateArtistInput
  ): Promise<Artist> {
    let created: Artist | undefined;
    try {
      created = await this.artistService.createOrUpdate(input);
    } catch (error) {
      throw new UserInputError(error.message);
    }
    return created;
  }

  @Query(() => ListArtistResult)
  async getArtists(
    @Args('pagination', { nullable: true }) pagination?: Pagination
  ) {
    try {
      return await this.artistService.find(pagination);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @Query(() => Artist)
  async getArtist(@Args('id') id: string) {
    try {
      const music = await this.artistService.findOne(+id);

      if (music) return music;
      throw new NotFoundException('Artist not found');
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @Query(() => [Music])
  async getMusicByArtist(@Args('id') id: string) {
    try {
      return await this.artistService.findByArtist(+id);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Artist)
  async getMe(@Context('req') req: any) {
    try {
      const user: Users = req.user;
      if (!user)
        throw new UnauthorizedException(
          'Could not log-in with the provided credentials'
        );

      return await this.artistService.getMe(user);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }
}
