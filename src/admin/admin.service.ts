// admin.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NurseEntity } from '../nurse/nurse.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(NurseEntity)
    private readonly nurseRepository: Repository<NurseEntity>,
  ) {}

  async verifyNurseDetails(nurseId: number): Promise<NurseEntity | null> {
    try {
      // Implement logic to verify nurse details and documents
      const nurse = await this.nurseRepository.findOne({
        where: { id: nurseId },
      });
      if (!nurse) {
        return null;
      }
      // Update nurse verification status or perform verification logic as needed
      // For example, set nurse.verified = true;
      return nurse;
    } catch (error) {
      throw new NotFoundException('Nurse not found');
    }
  }

  async approveNurseApplication(nurseId: number): Promise<NurseEntity | null> {
    try {
      // Implement logic to approve nurse's application
      const nurse = await this.nurseRepository.findOne({
        where: { id: nurseId },
      });
      if (!nurse) {
        return null;
      }
      // Update nurse's application status or perform approval logic as needed
      // For example, set nurse.applicationStatus = 'Approved';
      return nurse;
    } catch (error) {
      throw new NotFoundException('Nurse not found');
    }
  }
}
