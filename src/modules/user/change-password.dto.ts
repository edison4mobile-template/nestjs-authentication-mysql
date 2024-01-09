import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    example: 'old_password',
    description: "The user's current password.",
  })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({
    example: 'new_password',
    description: "The user's new password.",
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
