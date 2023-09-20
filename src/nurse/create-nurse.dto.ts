// DTO for nurse onboarding
export class NurseOnboardDto {
  readonly name: string;
  readonly email: string;
  readonly skills: string;
  readonly experienceLevel: string;
  readonly expertise: string;
}

// DTO for updating nurse's professional info
export class UpdateNurseDto {
  readonly skills: string;
  readonly experienceLevel: string;
  readonly expertise: string;
}

// DTO for uploading nurse's documents
export class DocumentUploadDto {
  readonly documentType: string;
  readonly documentUrl: string; // URL or file reference
}
