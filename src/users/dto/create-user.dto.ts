export class CreateUserDto {
  readonly username: string;
  readonly password?: string;
  readonly key: string;
}

export class UserProfileDto {
  readonly username: string;
  readonly key: string;
}
