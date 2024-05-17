import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ArtistService } from './artist.service';
import { Artist } from '@/schemas/artist.schema';
import { CreateArtistInput, ListArtistResult } from './dto/artist-dto';
import { UserInputError } from 'apollo-server-express';
import { Pagination } from '@/decorators/types';
import { NotFoundException } from '@nestjs/common';

@Resolver('Artist')
export class ArtistResolver {
  constructor(private readonly artistService: ArtistService) {}

  @Mutation(() => Artist)
  async createArtist(@Args('input') input: CreateArtistInput): Promise<Artist> {
    let created: Artist | undefined;
    try {
      created = await this.artistService.create(input);
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
}
