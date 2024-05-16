import { Meta } from '@/decorators/types';
import { PlayList } from '@/schemas/playlist.schema';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreatePlaylistInput {
  @Field(() => String)
  name: string;
}

@ObjectType()
export class ListPlayListResult {
  @Field(() => Meta)
  meta: Meta;

  @Field(() => [PlayList!])
  data: PlayList[];
}
