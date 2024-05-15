import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Album } from './album.schema';
import { Vote } from './vote.schema';
import { Comment } from './comment.schema';
import { Interaction } from './interaction.schema';
import { Play } from './play.schema';

@Entity()
@ObjectType()
export class Music extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({
    nullable: false,
  })
  name: string;

  @Field(() => String)
  @Column({
    nullable: true,
  })
  content: string;

  @Field(() => String)
  @Column({
    nullable: false,
    unique: true,
  })
  hash: string;

  @Field(() => Number)
  @Column({
    nullable: false,
    zerofill: true,
  })
  limit: number;

  @Field(() => Number)
  @Column({
    nullable: false,
    zerofill: true,
  })
  price: number;

  @Field(() => String)
  @Column({
    nullable: true,
  })
  cover: string;

  @Field(() => Album)
  @ManyToOne(() => Album, (album) => album.musics)
  album: Album;

  @Field(() => [Vote])
  @OneToMany(() => Vote, (v) => v.music)
  vote: Vote[];

  @Field(() => [Comment])
  @OneToMany(() => Comment, (v) => v.music)
  comment: Comment[];

  @Field(() => [Interaction])
  @OneToMany(() => Interaction, (v) => v.music)
  interaction: Interaction[];

  @Field(() => Play)
  @OneToOne(() => Play)
  @JoinColumn()
  play: Play;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
