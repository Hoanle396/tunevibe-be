import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Music } from './music.schema';
import { Users } from './user.schema';

@Entity()
@ObjectType()
export class Vote extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Music)
  @ManyToOne(() => Music, (m) => m.id)
  music: Music;

  @Field(() => Number)
  @Column({ nullable: true, type: 'float' })
  rate: number;

  @Field(() => Users)
  @ManyToOne(() => Users)
  user: Users;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
