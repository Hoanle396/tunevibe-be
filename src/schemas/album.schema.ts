import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Artist } from './artist.schema';

export type AlbumDocument = Album & Document;

@Schema()
@ObjectType()
export class Album {
  @Field()
  _id: string;

  @Field(() => String)
  @Prop({
    required: true,
  })
  name: string;

  @Field(() => String)
  @Prop({
    required: true,
    unique: true,
  })
  cover: string;

  @Field(() => Artist)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' })
  artist: Artist;

  @Field(() => Date)
  @Prop()
  timestamp: Date;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
