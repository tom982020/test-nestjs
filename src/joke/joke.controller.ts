import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { JokeService } from './joke.service';
import { request } from 'http';
import { CreateDTO } from './dto/createDTO';

@Controller('joke')
export class JokeController {
  constructor(private jokeService: JokeService) {}

  @Post()
  create(@Body() request: CreateDTO) {
    return this.jokeService.create(request);
  }

  @Get()
  findAll() {
    return this.jokeService.findAll();
  }

  @Put('/funny/:id')
  funny(@Param('id') id: string) {
    return this.jokeService.funny(id);
  }

  @Put('/notfunny/:id')
  notfunny(@Param('id') id: string) {
    return this.jokeService.notfunny(id);
  }
}
