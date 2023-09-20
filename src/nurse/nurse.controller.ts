// nurse.controller.ts
import { Controller, Post, Put, Body, Param, Get } from '@nestjs/common';
import {
  DocumentUploadDto,
  NurseOnboardDto,
  UpdateNurseDto,
} from './create-nurse.dto';
import { NurseService } from './nurse.service';
import { UpdateUserDto } from '../user/create-user.dto';

@Controller('nurse')
export class NurseController {
  constructor(private readonly nurseService: NurseService) {}

  @Post('onboard')
  async onboard(@Body() nurseOnboardDto: NurseOnboardDto) {
    // Implement nurse onboarding logic using NurseEntity and UserEntity
    return await this.nurseService.onboardNurse(nurseOnboardDto);
  }

  @Put('personal-info/:id')
  async updatePersonalInfo(
    @Param('id') nurseId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    // Implement updating user's personal info
    return await this.nurseService.updateUserPersonalInfo(
      nurseId,
      updateUserDto,
    );
  }

  @Put('professional-info/:id')
  async updateProfessionalInfo(
    @Param('id') nurseId: number,
    @Body() updateNurseDto: UpdateNurseDto,
  ) {
    // Implement updating nurse's professional info
    return await this.nurseService.updateNurseProfessionalInfo(
      nurseId,
      updateNurseDto,
    );
  }

  @Post('upload-document/:id')
  async uploadDocument(
    @Param('id') nurseId: number,
    @Body() documentUploadDto: DocumentUploadDto,
  ) {
    // Implement uploading nurse's documents
    return await this.nurseService.uploadNurseDocument(
      nurseId,
      documentUploadDto,
    );
  }

  @Get(':id')
  async getNurseById(@Param('id') nurseId: number) {
    return await this.nurseService.getNurseById(nurseId);
  }

  @Get('status/:id')
  async getOnboardingStatus(@Param('id') nurseId: number) {
    return await this.nurseService.getOnboardingStatus(nurseId);
  }

  @Get('interview/:id')
  async getInterviewDetails(@Param('id') nurseId: number) {
    return await this.nurseService.getInterviewDetails(nurseId);
  }
}
