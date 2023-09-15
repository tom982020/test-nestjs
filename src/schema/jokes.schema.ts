import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { HydratedDocument } from 'mongoose';

export type JokesDocument = HydratedDocument<Jokes>;

@Schema({ timestamps: true })
export class Jokes {
  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  funny: number;

  @Prop()
  notfunny: number;

  @Prop({ default: false })
  deleted: boolean;

  @Field(() => Date, { description: 'Created At' })
  createdAt?: Date;

  @Prop()
  @Field(() => Date, { description: 'Updated At' })
  updatedAt?: Date;
}

export const JokesSchema = SchemaFactory.createForClass(Jokes);
