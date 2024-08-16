import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Album } from './album.schema';
import { Users } from './user.schema';

@Entity()
@ObjectType()
export class Artist extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ nullable: false })
  name: string;

  @Field(() => String)
  @Column({ nullable: false })
  description: string;

  @Field(() => Users)
  @OneToOne(() => Users, (user) => user.id)
  @JoinColumn()
  user: Users;

  @Field(() => [Album])
  @OneToMany(() => Album, (post) => post.artist)
  @JoinTable()
  albums: Album[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
