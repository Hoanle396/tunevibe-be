import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import { Music } from 'src/schemas/music.schema';
import { CreateMusicInput, CreateMusicResult } from './dto/create-music.input';
import { MusicsService } from './musics.service';

@Resolver(() => Music)
export class MusicsResolver {
  constructor(private readonly musicsService: MusicsService) {}

  @Mutation(() => CreateMusicResult)
  async create(
    @Args('createMusicInput') createMusicInput: CreateMusicInput
  ): Promise<CreateMusicResult> {
    let created: CreateMusicResult | undefined;
    try {
      created = await this.musicsService.create(createMusicInput);
    } catch (error) {
      throw new UserInputError(error.message);
    }
    return created;
  }
}
