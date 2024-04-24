import { Meta } from '@/decorators/types';
import { Music } from '@/schemas/music.schema';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Album } from 'src/schemas/album.schema';

@InputType()
export class CreateMusicInput {
  @Field(() => String)
  name: string;
  @Field(() => String || undefined)
  content: string;

  @Field(() => String)
  hash: string;

  @Field(() => String)
  albumId: string;
}

@ObjectType()
export class ListMusicResult {
  @Field(() => Meta)
  meta: Meta;

  @Field(() => [Music!])
  data: Music[];
}
