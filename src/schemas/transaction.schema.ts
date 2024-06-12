import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Music } from './music.schema';
import { Users } from './user.schema';
import { Transfer } from '@/decorators/types';

@Entity()
@ObjectType()
export class Transaction extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ nullable: false })
  name: string;

  @Field(() => Users)
  @ManyToOne(() => Users, (u) => u.id)
  user: Users;

  @Field(() => Music)
  @ManyToOne(() => Music, (u) => u.id)
  @JoinTable()
  music: Music;

  @Field(() => Transfer)
  @Column({ nullable: false, default: Transfer.Hold })
  status: Transfer;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
