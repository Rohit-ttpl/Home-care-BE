// src/nurse/nurse.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NurseController } from './nurse.controller';
import { NurseService } from './nurse.service';
import { NurseEntity } from './nurse.entity';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NurseEntity, UserEntity])],
  controllers: [NurseController],
  providers: [NurseService],
  exports: [NurseService],
})
export class NurseModule {}
