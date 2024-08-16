import { Music } from '@/schemas/music.schema';
import { Transaction } from '@/schemas/transaction.schema';
import { Users } from '@/schemas/user.schema';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionResolver } from './transaction.resolver';
import { TransactionService } from './transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Music, Users, Transaction])],
  providers: [TransactionResolver, TransactionService],
})
export class TransactionModule {}
