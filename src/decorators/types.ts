import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class Pagination {
  @Field(() => Number, { defaultValue: 1, nullable: true })
  page?: number;
  @Field(() => Number, { defaultValue: 10, nullable: true })
  limit?: number;
  @Field(() => String, { defaultValue: '', nullable: true })
  search?: string;
}
@ObjectType()
export class Meta {
  @Field(() => Number)
  limit?: number;
  @Field(() => Number)
  page?: number;
  @Field(() => Number)
  totalPages?: number;
  @Field(() => Number)
  totalItems?: number;
}

export enum Transfer {
  OnSale = 'On Sale',
  Hold = 'Hold',
  Sold = 'Sold',
}
