import { Pagination } from '@/decorators/types';
import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import { Music } from 'src/schemas/music.schema';
import { CreateMusicInput, ListMusicResult } from './dto/create-music.input';
import { MusicsService } from './musics.service';

@Resolver(() => Music)
export class MusicsResolver {
  constructor(private readonly musicsService: MusicsService) {}

  @Mutation(() => Music)
  async create(
    @Args('createMusicInput') createMusicInput: CreateMusicInput
  ): Promise<Music> {
    let created: Music | undefined;
    try {
      created = await this.musicsService.create(createMusicInput);
    } catch (error) {
      throw new UserInputError(error.message);
    }
    return created;
  }

  @Query(() => ListMusicResult)
  async getMusics(
    @Args('pagination', { nullable: true }) pagination?: Pagination
  ) {
    try {
      return await this.musicsService.find(pagination);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @Query(() => Music)
  async getMusic(@Args('id') id: string) {
    try {
      const music = await this.musicsService.findOne(+id);

      if (music) return music;
      throw new NotFoundException('Music not found');
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }
}
