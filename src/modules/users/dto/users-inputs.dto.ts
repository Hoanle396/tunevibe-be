import { Users } from '@/schemas/user.schema';
import { InputType, Field, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
  @Field(() => String)
  wallet: string;
}

@InputType()
export class LoginUserInput {
  @Field(() => String)
  email?: string;
  @Field(() => String)
  password: string;
}

@InputType()
export class LoginWithWallet {
  @Field(() => String)
  wallet: string;
}

@InputType()
export class UpdatePasswordInput {
  @Field(() => String)
  oldPassword: string;
  @Field(() => String)
  newPassword: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  username?: string;
  @Field(() => String)
  email?: string;
  password?: UpdatePasswordInput;
  @Field(() => Boolean)
  enabled?: boolean;
}

@ObjectType()
export class LoginResult {
  @Field(() => Users)
  user: Users;
  @Field(() => String)
  token: string;
}

@ObjectType()
export class SignOutResult {
  @Field(() => Users)
  user: Users;
  @Field(() => null)
  token: null;
}

@InputType()
export class User {
  @Field(() => String)
  email: string;
  @Field(() => [String])
  permissions: string[];
  @Field(() => Boolean)
  enabled: boolean;
  @Field(() => String)
  id: string;
}
