import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Music } from './music.schema';
import { PlayList } from './playlist.schema';

@Entity()
@ObjectType()
export class PlayListMusic extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Music)
  @ManyToOne(() => Music, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  music: Music;

  @Field(() => PlayList)
  @ManyToOne(() => PlayList, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  playlist: PlayList;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
