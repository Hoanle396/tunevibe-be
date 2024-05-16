import { Meta, Pagination } from '@/decorators/types';
import { Vote } from '@/schemas/vote.schema';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateVoteInput {
  @Field(() => Number)
  musicId: number;

  @Field(() => Number)
  rate: number;

  @Field(() => Number)
  userId: number;
}

@InputType()
export class VoteArgs extends Pagination {
  @Field(() => Number)
  musicId: number;
}

@ObjectType()
export class ListVoteResult {
  @Field(() => Meta)
  meta: Meta;

  @Field(() => [Vote!])
  data: Vote[];
}
