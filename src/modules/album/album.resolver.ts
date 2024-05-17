import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AlbumService } from './album.service';
import { Album } from '@/schemas/album.schema';
import {
  CreateAlbumInput,
  ListAlbumResult,
  UpdateAlbumInput,
} from './dto/album-dto';
import { UserInputError } from 'apollo-server-express';
import { Pagination } from '@/decorators/types';
import { NotFoundException } from '@nestjs/common';

@Resolver('Album')
export class AlbumResolver {
  constructor(private readonly albumService: AlbumService) {}
  @Mutation(() => Album)
  async create(@Args('input') input: CreateAlbumInput): Promise<Album> {
    try {
      return await this.albumService.create(input);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @Mutation(() => Album)
  async update(@Args('input') input: UpdateAlbumInput): Promise<Album> {
    try {
      return await this.albumService.update(input);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @Query(() => ListAlbumResult)
  async getMusics(
    @Args('pagination', { nullable: true }) pagination?: Pagination
  ) {
    try {
      return await this.albumService.find(pagination);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @Query(() => Album)
  async getMusic(@Args('id') id: string) {
    try {
      const music = await this.albumService.findOne(+id);

      if (music) return music;
      throw new NotFoundException('Music not found');
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @Mutation(() => Album)
  async delete(@Args('id') id: string): Promise<any> {
    try {
      return await this.albumService.delete(+id);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }
}
