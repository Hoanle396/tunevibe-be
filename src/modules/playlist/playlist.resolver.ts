import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PlaylistService } from './playlist.service';
import { PlayList } from '@/schemas/playlist.schema';
import {
  AddToPlaylistInput,
  CreatePlaylistInput,
  ListPlayListResult,
  UpdatePlaylistInput,
} from './dto/play-list-dto';
import { UserInputError } from 'apollo-server-express';
import { Users } from '@/schemas/user.schema';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Pagination } from '@/decorators/types';

@Resolver('Playlist')
export class PlaylistResolver {
  constructor(private readonly playlistService: PlaylistService) {}

  @Mutation(() => PlayList)
  async create(
    @Args('input') input: CreatePlaylistInput,
    @Context('req') request: any
  ): Promise<PlayList> {
    const user: Users = request.user;
    if (!user)
      throw new UnauthorizedException(
        'Could not log-in with the provided credentials'
      );
    try {
      return await this.playlistService.create(input, user);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @Query(() => ListPlayListResult)
  async getPlaylists(
    @Context('req') request: any,
    @Args('pagination', { nullable: true }) pagination?: Pagination
  ) {
    const user: Users = request.user;
    if (!user)
      throw new UnauthorizedException(
        'Could not log-in with the provided credentials'
      );
    try {
      return await this.playlistService.find(pagination, user);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @Query(() => PlayList)
  async getPlaylist(@Args('id') id: string) {
    try {
      const Playlist = await this.playlistService.findOne(+id);

      if (Playlist) return Playlist;
      throw new NotFoundException('Playlist not found');
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @Mutation(() => PlayList)
  async update(@Args('input') input: UpdatePlaylistInput): Promise<PlayList> {
    try {
      return await this.playlistService.update(input);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @Mutation(() => Boolean)
  async delete(@Args('id') id: string): Promise<boolean> {
    try {
      const deleted = await this.playlistService.delete(+id);
      if (deleted) return true;
      return false;
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @Mutation(() => PlayList)
  async addToPlaylist(
    @Args('input') input: AddToPlaylistInput
  ): Promise<PlayList> {
    try {
      return await this.playlistService.addToPlaylist(input);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @Mutation(() => PlayList)
  async deleteFromPlaylist(
    @Args('input') input: AddToPlaylistInput
  ): Promise<PlayList> {
    try {
      return await this.playlistService.deleteFromPlaylist(input);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }
}
