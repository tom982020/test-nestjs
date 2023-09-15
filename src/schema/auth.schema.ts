import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  deleted: boolean;

  @Prop()
  token: string;

  @Field(() => Date, { description: 'Created At' })
  createdAt?: Date;

  @Prop()
  @Field(() => Date, { description: 'Updated At' })
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
