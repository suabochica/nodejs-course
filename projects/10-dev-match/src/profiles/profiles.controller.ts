import { Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('profiles')
export class ProfilesController {
  // GET /profiles
  @Get()
  findAll(@Query('age') age: number) {
    return [{ age }];
  }

  // GET /profiles/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return { id };
  }

  // POST /profiles
  @Post()
  create() {
    return 'This action adds a new profile';
  }

  // PUT /profiles/:id
  @Put(':id')
  update() {
    return 'This action updates a profile';
  }

  // DELETE /profiles/:id
  @Delete(':id')
  remove() {
    return 'This action removes a profile';
  }
}
