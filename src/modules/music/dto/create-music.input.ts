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
export class CreateMusicResult {
  @Field(() => String)
  name: string;
  @Field(() => String || undefined)
  content: string;

  @Field(() => String)
  hash: string;

  @Field(() => Album)
  album: Album;
}
