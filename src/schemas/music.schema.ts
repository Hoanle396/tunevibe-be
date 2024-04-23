import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Album } from './album.schema';

export type MusicDocument = Music & Document;

@Schema()
@ObjectType()
export class Music {
  @Field()
  _id: string;

  @Field(() => String)
  @Prop({
    required: true,
  })
  name: string;

  @Field(() => String)
  @Prop({ required: false })
  content: string;

  @Field(() => String)
  @Prop({
    required: true,
    unique: true,
  })
  hash: string;

  @Field(() => Album)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Album' })
  album: Album;

  @Field(() => Date)
  @Prop()
  timestamp: Date;
}

export const MusicSchema = SchemaFactory.createForClass(Music);
