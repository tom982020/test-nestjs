import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Jokes } from 'src/schema/jokes.schema';
import { CreateDTO } from './dto/createDTO';

@Injectable()
export class JokeService {
  constructor(@InjectModel(Jokes.name) private jokesModel: Model<Jokes>) {}

  async create(joke: CreateDTO): Promise<Jokes> {
    const newJoke = new this.jokesModel(joke);
    return newJoke.save();
  }

  async findAll(): Promise<Jokes[]> {
    return this.jokesModel.find().exec();
  }

  async funny(id: string): Promise<Jokes> {
    const joke = await this.jokesModel.findOne({
      _id: id,
    });
    if (joke) {
      return this.jokesModel.findByIdAndUpdate(
        id,
        {
          $set: {
            funny: (await joke).funny == undefined ? 1 : (await joke).funny + 1,
          },
        },
        { new: true },
      );
    }
    return;
  }

  async notfunny(id: string): Promise<Jokes> {
    const joke = await this.jokesModel.findOne({
      _id: id,
    });
    if (joke) {
      return this.jokesModel.findByIdAndUpdate(
        id,
        {
          $set: {
            notfunny:
              (await joke).notfunny == undefined
                ? 1
                : (await joke).notfunny + 1,
          },
        },
        { new: true },
      );
    }
    return;
  }
}
