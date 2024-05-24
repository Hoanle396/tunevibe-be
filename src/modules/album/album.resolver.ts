import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AlbumService } from './album.service';
import { Album } from '@/schemas/album.schema';
import {
  CreateAlbumInput,
  ListAlbumResult,
  UpdateAlbumInput,
} from './dto/album-dto';
import { UserInputError } from 'apollo-server-express';
import { Pagination } from '@/decorators/types';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { Users } from '@/schemas/user.schema';

@Resolver('Album')
export class AlbumResolver {
  constructor(private readonly albumService: AlbumService) {}
  @Mutation(() => Album)
  async createAlbum(@Args('input') input: CreateAlbumInput): Promise<Album> {
    try {
      return await this.albumService.create(input);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @Mutation(() => Album)
  async updateAlbum(@Args('input') input: UpdateAlbumInput): Promise<Album> {
    try {
      return await this.albumService.update(input);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => ListAlbumResult)
  async getAlbums(
    @Context('req') { user }: { user?: Users },
    @Args('pagination', { nullable: true }) pagination?: Pagination
  ) {
    try {
      return await this.albumService.find(pagination, user);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @Query(() => Album)
  async getAlbum(@Args('id') id: string) {
    try {
      const music = await this.albumService.findOne(+id);

      if (music) return music;
      throw new NotFoundException('Music not found');
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @Mutation(() => Album)
  async deleteAlbum(@Args('id') id: string): Promise<any> {
    try {
      return await this.albumService.delete(+id);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }
}
