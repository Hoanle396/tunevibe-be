import { Resolver } from '@nestjs/graphql';
import { InteractionService } from './interaction.service';

@Resolver('Interaction')
export class InteractionResolver {
  constructor(private readonly interactionService: InteractionService) {}
}
