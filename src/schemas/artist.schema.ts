import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Users } from './user.schema';

export type ArtistDocument = Artist & Document;

@Schema()
@ObjectType()
export class Artist {
  @Field()
  _id: string;

  @Field(() => String)
  @Prop({
    required: true,
  })
  name: string;

  @Field(() => String)
  @Prop({ required: false })
  description: string;

  @Field(() => Users)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: Users;

  @Field(() => Date)
  @Prop()
  timestamp: Date;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
