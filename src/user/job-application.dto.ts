// src/dto/job-application.dto.ts
export class JobApplicationDto {
  readonly name: string;
  readonly email: string;
  readonly resume: string; // URL or file reference to the resume
  // Other job application fields
}
