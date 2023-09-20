// src/services/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './create-user.dto';
import { JobApplicationDto } from './job-application.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async getUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.getUserById(userId);
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.getUserById(userId);
    await this.userRepository.remove(user);
  }

  async applyForJob(jobApplicationDto: JobApplicationDto): Promise<string> {
    // Implement the logic to process the job application here
    // Example: Save the application to the database
    // Return a success message or an application ID
    console.log(`JobApplication`, jobApplicationDto);
    return 'Job application submitted successfully';
  }

  async getJobUpdates(candidateId: string): Promise<any> {
    // Implement the logic to fetch job updates for the candidate
    // Example: Query the database for updates
    console.log('Query the database for updates', candidateId);
    const updates: any = []; // Replace with actual updates
    return updates;
  }
}
