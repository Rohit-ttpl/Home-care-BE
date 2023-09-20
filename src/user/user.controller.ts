// src/controllers/candidate.controller.ts
import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Put,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './create-user.dto';
import { JobApplicationDto } from './job-application.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add-user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  @Get(':id')
  async getUserById(@Param('id') userId: number) {
    const user = await this.userService.getUserById(userId);
    return user;
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.updateUser(
      userId,
      updateUserDto,
    );
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: number) {
    const result = await this.userService.deleteUser(userId);
    return result;
  }

  @Post('apply')
  async apply(@Body() jobApplicationDto: JobApplicationDto) {
    // Call the service to process the job application
    const result = await this.userService.applyForJob(jobApplicationDto);
    return result;
  }

  @Get('job-updates/:id')
  async getJobUpdates(@Param('id') candidateId: string) {
    // Call the service to fetch job updates for the candidate
    const updates = await this.userService.getJobUpdates(candidateId);
    return updates;
  }
}
