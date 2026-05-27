import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  ParseUUIDPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import type { UUID } from 'crypto';

import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

import { ProfilesService } from './profiles.service';
import { ProfilesGuard } from './profiles.guard';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  // GET /profiles
  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  // GET /profiles/:id
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.profilesService.findOne(id);

    /** Handle exceptions with try/catch to categorize errors.
    try {
      return this.profilesService.findOne(id);
    } catch (error) {
      if (error instanceof DatabaseException) {
        // Handle the case where the profile is not found
        throw new NotFoundException(`Profile with id ${id} not found`); 
      }
      // Handle other types of errors if necessary
      throw error;
    }
    */
  }

  // POST /profiles
  @Post()
  create(@Body(new ValidationPipe()) createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  // PUT /profiles/:id
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body(new ValidationPipe()) updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.update(id, updateProfileDto);
  }

  // DELETE /profiles/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(ProfilesGuard) // Apply the guard to protect this route
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.profilesService.remove(id);
  }
}
