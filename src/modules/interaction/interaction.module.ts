import { Module } from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { InteractionResolver } from './interaction.resolver';

@Module({
  providers: [InteractionResolver, InteractionService],
})
export class InteractionModule {}
