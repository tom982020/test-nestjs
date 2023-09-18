import { Module } from '@nestjs/common';
import { JokeService } from './joke.service';
import { JokeController } from './joke.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Jokes, JokesSchema } from 'src/schema/jokes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Jokes.name, schema: JokesSchema }]),
  ],
  controllers: [JokeController],
  providers: [JokeService],
  exports: [JokeService],
})
export class JokeModule {}
