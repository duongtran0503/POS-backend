import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, userDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<userDocument>) {}

  async createDefaultAdmin() {
    try {
      const check = await this.userModel.findOne({
        username: 'admin',
        role: 'admin',
      });
      if (!check) {
        const hashPassword = await bcrypt.hash('admin', 10);
        await this.userModel.create({
          name: 'admin',
          username: 'admin',
          role: 'admin',
          password: hashPassword,
        });
        console.log('//// ADMIN  ACCOUNT CREATE WITH USERNAME:admin///');
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  async findUserByUsername(username: string) {
    return this.userModel.findOne({ username: username });
  }
}
