// nurse.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole, UserEntity } from '../user/user.entity';
import { NurseEntity } from './nurse.entity';
import { UpdateUserDto } from '../user/create-user.dto';
import {
  DocumentUploadDto,
  NurseOnboardDto,
  UpdateNurseDto,
} from './create-nurse.dto';

@Injectable()
export class NurseService {
  constructor(
    @InjectRepository(NurseEntity)
    private readonly nurseRepository: Repository<NurseEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async onboardNurse(nurseOnboardDto: NurseOnboardDto): Promise<NurseEntity> {
    // Create a new nurse entity and associate it with an existing user
    const nurse = new NurseEntity();
    nurse.skills = nurseOnboardDto.skills;
    nurse.experienceLevel = nurseOnboardDto.experienceLevel;
    nurse.expertise = nurseOnboardDto.expertise;

    // Assuming you have a user with a unique email
    const user = await this.userRepository.findOne({
      where: { email: nurseOnboardDto.email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update the user's role to "nurse"
    user.role = UserRole.Nurse;

    // Associate the nurse entity with the user
    nurse.user = user;

    // Save the nurse entity
    await this.nurseRepository.save(nurse);

    return nurse;
  }

  async updateUserPersonalInfo(
    nurseId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const nurse = await this.nurseRepository.findOne({
      where: { id: nurseId },
      relations: ['user'],
    });
    if (!nurse) {
      throw new NotFoundException('Nurse not found');
    }

    // Update the user's personal info
    nurse.user.name = updateUserDto.name ? updateUserDto.name : nurse.user.name;
    // nurse.user.email = updateUserDto.email;

    // Save the updated user entity
    const updatedUser = await this.userRepository.save(nurse.user);

    return updatedUser;
  }

  async updateNurseProfessionalInfo(
    nurseId: number,
    updateNurseDto: UpdateNurseDto,
  ): Promise<NurseEntity> {
    const nurse = await this.nurseRepository.findOne({
      where: { id: nurseId },
    });
    if (!nurse) {
      throw new NotFoundException('Nurse not found');
    }

    // Update the nurse's professional info
    nurse.skills = updateNurseDto.skills;
    nurse.experienceLevel = updateNurseDto.experienceLevel;
    nurse.expertise = updateNurseDto.expertise;

    // Save the updated nurse entity
    const updatedNurse = await this.nurseRepository.save(nurse);

    return updatedNurse;
  }

  async uploadNurseDocument(
    nurseId: number,
    documentUploadDto: DocumentUploadDto,
  ): Promise<void> {
    const nurse = await this.nurseRepository.findOne({
      where: { id: nurseId },
    });
    if (!nurse) {
      throw new NotFoundException('Nurse not found');
    }
    console.log('document upload', documentUploadDto);
    // Implement logic to handle nurse's document upload
    // You can save the document information in the nurse entity

    // For example, you can add the document to an array property
    // if (!nurse.documents) {
    //   nurse.documents = [];
    // }

    // nurse.documents.push({
    //   documentType: documentUploadDto.documentType,
    //   documentUrl: documentUploadDto.documentUrl,
    // });

    // Save the updated nurse entity
    await this.nurseRepository.save(nurse);
  }

  async getNurseById(nurseId: number): Promise<NurseEntity | null> {
    const nurse = await this.nurseRepository.findOne({
      where: {
        id: nurseId,
      },
    });
    if (!nurse) {
      throw new NotFoundException('Nurse not found');
    }
    return nurse;
  }

  async getOnboardingStatus(nurseId: number): Promise<string | null> {
    try {
      // Implement logic to retrieve the onboarding status of the nurse based on nurseId
      // For example, assume the nurse has an 'onboardingStatus' property in the NurseEntity
      const nurse = await this.nurseRepository.findOne({
        where: { id: nurseId },
      });
      if (!nurse) {
        return null;
      }
      // return nurse.onboardingStatus || 'Not available';
      return null;
    } catch (error) {
      throw new NotFoundException('Nurse not found');
    }
  }

  async getInterviewDetails(nurseId: number): Promise<any | null> {
    try {
      // Implement logic to retrieve interview details for the nurse based on nurseId
      // For example, assume the nurse has an 'interviewDetails' property in the NurseEntity
      const nurse = await this.nurseRepository.findOne({
        where: { id: nurseId },
      });
      if (!nurse) {
        return null;
      }
      //return nurse.interviewDetails || 'Not available';
      return null;
    } catch (error) {
      throw new NotFoundException('Nurse not found');
    }
  }
}
