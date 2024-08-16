import { Meta } from '@/decorators/types';
import { Album } from '@/schemas/album.schema';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateAlbumInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  cover: string;

  @Field(() => Number)
  artist: number;
}

@InputType()
export class UpdateAlbumInput extends CreateAlbumInput {
  @Field(() => Number)
  id: number;
}

@ObjectType()
export class ListAlbumResult {
  @Field(() => Meta)
  meta: Meta;

  @Field(() => [Album!])
  data: Album[];
}
