import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionResolver } from './transaction.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from '@/schemas/music.schema';
import { Users } from '@/schemas/user.schema';
import { Transaction } from '@/schemas/transaction.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Music, Users, Transaction])],
  providers: [TransactionResolver, TransactionService],
})
export class TransactionModule {}
