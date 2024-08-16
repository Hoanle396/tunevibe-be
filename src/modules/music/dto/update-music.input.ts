import { PartialType } from '@nestjs/mapped-types';
import { CreateMusicInput } from './create-music.input';

export class UpdateMusicInput extends PartialType(CreateMusicInput) {
  id: number;
}
