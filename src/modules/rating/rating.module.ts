import { Music } from '@/schemas/music.schema';
import { Users } from '@/schemas/user.schema';
import { Vote } from '@/schemas/vote.schema';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingResolver } from './rating.resolver';
import { RatingService } from './rating.service';

@Module({
  imports: [TypeOrmModule.forFeature([Music, Users, Vote])],
  providers: [RatingResolver, RatingService],
})
export class RatingModule {}
