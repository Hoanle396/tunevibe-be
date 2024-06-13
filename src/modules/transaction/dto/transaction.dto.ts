import { Meta, Transfer } from '@/decorators/types';
import { Transaction } from '@/schemas/transaction.schema';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateTransaction {
  @Field(() => Number)
  musicId: number;

  @Field(() => Number)
  price: number;
}

@InputType()
export class UpdateTransaction extends CreateTransaction {
  @Field(() => Number, { nullable: true })
  id: number;

  @Field(() => Transfer)
  status: Transfer;
}

@ObjectType()
export class ListTransactionResult {
  @Field(() => Meta)
  meta: Meta;

  @Field(() => [Transaction!])
  data: Transaction[];
}
