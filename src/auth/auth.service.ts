import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/auth.schema';
import { CreateDTO } from './dto/createDTO';
import * as bcrypt from 'bcrypt';
import { SignInDTO } from './dto/signInDTO';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  getHello() {
    return 'Hello User';
  }

  async create(createDTO: CreateDTO): Promise<User> {
    createDTO.password = bcrypt.hashSync(createDTO.password, 8);
    const create = new this.userModel(createDTO);
    return create.save();
  }

  async signin(signInDTO: SignInDTO) {
    // find user
    const user = await this.userModel.findOne({
      username: new RegExp(signInDTO.username.toLowerCase(), 'i'),
    });
    if (user == undefined) {
      return 'Not Found';
    }

    // check password
    const checkpassword = await bcrypt.compareSync(
      signInDTO.password,
      user.password,
    );
    if (!checkpassword) {
      return 'Invalid Password';
    }

    // create token
    const secret = process.env.SECRET_TOKEN;
    const access_token = await jwt.sign(
      {
        data: user._id,
      },
      secret,
      {
        expiresIn: process.env.TIME_TOKEN,
      },
    );
    user.token = access_token;
    user.save();
    return user;
  }
}
