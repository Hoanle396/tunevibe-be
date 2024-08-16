import { Transfer } from '@/decorators/types';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Music } from './music.schema';
import { Users } from './user.schema';

registerEnumType(Transfer, {
  name: 'Transfer',
});
@Entity()
@ObjectType()
export class Transaction extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Number)
  @Column({ nullable: false, zerofill: true, type: 'float' })
  price: number;

  @Field(() => Users)
  @ManyToOne(() => Users, (u) => u.id)
  user: Users;

  @Field(() => Music)
  @ManyToOne(() => Music, (u) => u.id)
  @JoinTable()
  music: Music;

  @Field(() => Transfer)
  @Column({
    nullable: false,
    default: Transfer.Hold,
    type: 'enum',
    enum: Transfer,
  })
  status: Transfer;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
