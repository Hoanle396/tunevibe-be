import { Meta } from '@/decorators/types';
import { PlayList } from '@/schemas/playlist.schema';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreatePlaylistInput {
  @Field(() => String)
  name: string;
}

@InputType()
export class UpdatePlaylistInput extends CreatePlaylistInput {
  @Field(() => Number)
  id: number;
}

@InputType()
export class AddToPlaylistInput {
  @Field(() => Number)
  playlistId: number;

  @Field(() => Number)
  musicId: number;
}

@ObjectType()
export class ListPlayListResult {
  @Field(() => Meta)
  meta: Meta;

  @Field(() => [PlayList!])
  data: PlayList[];
}
