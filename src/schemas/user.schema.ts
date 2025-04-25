import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/enums/role.enum';

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop({ enum: Role, default: Role.EMPLOYEE })
  role: string;
}

export type userDocument = Document & User;

export const UserSchema = SchemaFactory.createForClass(User);
