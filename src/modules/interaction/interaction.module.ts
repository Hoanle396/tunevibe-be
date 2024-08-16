import { Module } from '@nestjs/common';
import { InteractionResolver } from './interaction.resolver';
import { InteractionService } from './interaction.service';

@Module({
  providers: [InteractionResolver, InteractionService],
})
export class InteractionModule {}
