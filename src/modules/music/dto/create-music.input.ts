import { Meta } from '@/decorators/types';
import { Music } from '@/schemas/music.schema';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateMusicInput {
  @Field(() => String)
  name: string;

  @Field(() => String || undefined)
  content: string;

  @Field(() => Number)
  limit: number;

  @Field(() => String)
  cover: string;

  @Field(() => Number)
  price: number;

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
