// src/dto/create-user.dto.ts
export class CreateUserDto {
  readonly username: string;
  readonly password: string;
  readonly name: string;
  readonly email: string;
  // Other user-related fields
}

// src/dto/update-user.dto.ts
export class UpdateUserDto {
  readonly name?: string;
  readonly password?: string;
  readonly username?: string;
  // Other fields you want to allow updating
}
