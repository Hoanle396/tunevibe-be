import { Meta } from "@/decorators/types";
import { Artist } from "@/schemas/artist.schema";
import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class CreateArtistInput {
  @Field(() => String)
  name: string;

  @Field(() => String || undefined)
  description: string;

  @Field(() => String)
  userId: string;
}

@ObjectType()
export class ListArtistResult {
  @Field(() => Meta)
  meta: Meta;

  @Field(() => [Artist!])
  data: Artist[];
}
