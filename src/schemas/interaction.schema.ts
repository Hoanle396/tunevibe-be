import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Artist } from './artist.schema';
import { Music } from './music.schema';
import { Users } from './user.schema';

@Entity()
@ObjectType()
export class Interaction extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Music)
  @ManyToOne(() => Music, (m) => m.id)
  music: Music;

  @Field(() => Boolean)
  @Column({ nullable: true, default: false })
  liked: boolean;

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
