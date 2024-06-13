import {
  CreateTransaction,
  ListTransactionResult,
  UpdateTransaction,
} from './dto/transaction.dto';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { Transaction } from '@/schemas/transaction.schema';
import { Users } from '@/schemas/user.schema';
import { UserInputError } from 'apollo-server-express';
import { Pagination } from '@/decorators/types';

@Resolver('Transaction')
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Transaction)
  async createTransaction(
    @Context('req') req: any,
    @Args('input') input: UpdateTransaction
  ): Promise<Transaction> {
    const user: Users = req.user;
    if (!user)
      throw new UnauthorizedException(
        'Could not log-in with the provided credentials'
      );
    try {
      return await this.transactionService.create(input, user);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @Query(() => ListTransactionResult)
  @UseGuards(JwtAuthGuard)
  async getTransaction(
    @Context('req') req: any,
    @Args('pagination') pagination: Pagination
  ) {
    const user: Users = req.user;
    if (!user)
      throw new UnauthorizedException(
        'Could not log-in with the provided credentials'
      );
    try {
      return await this.transactionService.findByMe(pagination, user);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }

  @Query(() => ListTransactionResult)
  async getOnSale(
    @Context('req') req: any,
    @Args('pagination') pagination: Pagination
  ) {
    try {
      return await this.transactionService.find(pagination);
    } catch (error) {
      throw new UserInputError(error.message);
    }
  }
}
