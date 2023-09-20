// admin.controller.ts
import { Controller, Get, Param, NotFoundException, Put } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('verify-nurse/:id')
  async verifyNurse(@Param('id') nurseId: number) {
    const nurse = await this.adminService.verifyNurseDetails(nurseId);
    if (!nurse) {
      throw new NotFoundException('Nurse not found');
    }
    return nurse;
  }

  @Put('approve-nurse/:id')
  async approveNurse(@Param('id') nurseId: number) {
    const nurse = await this.adminService.approveNurseApplication(nurseId);
    if (!nurse) {
      throw new NotFoundException('Nurse not found');
    }
    return nurse;
  }
}
