import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput, LoginResult } from './dto/users-inputs.dto';
import { UsersService } from './users.service';

import { UserInputError } from 'apollo-server-core';
import { Users } from '../../schemas/user.schema';

@Resolver(() => Users)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => LoginResult)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<LoginResult> {
    let createdUser: LoginResult | undefined;
    try {
      createdUser = await this.usersService.create(createUserInput);
    } catch (error) {
      throw new UserInputError(error.message);
    }
    return createdUser;
  }
}
