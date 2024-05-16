import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingResolver } from './rating.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from '@/schemas/music.schema';
import { Users } from '@/schemas/user.schema';
import { Vote } from '@/schemas/vote.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Music, Users, Vote])],
  providers: [RatingResolver, RatingService],
})
export class RatingModule {}
