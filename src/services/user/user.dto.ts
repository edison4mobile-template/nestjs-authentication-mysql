import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'The first name of the user.',
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user.',
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user.',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'The password of the user.',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginUserDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'The password of the user' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'The updated first name of the user.',
  })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The updated last name of the user.',
  })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The updated email of the user.',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: 'Address',
    description: 'The address of the user.',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: 'city',
    description: 'The city of the user.',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    example: 'zipcode',
    description: 'The zipcode of the user.',
  })
  @IsOptional()
  @IsString()
  zipcode?: string;

  @ApiProperty({
    example: 'state',
    description: 'The state of the user.',
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({
    example: 'Country',
    description: 'The country of the user.',
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({
    example: '2000-01-01',
    description: 'The birthday of the user (YYYY-MM-DD format).',
  })
  @IsOptional()
  @IsDateString()
  birthday?: string;
}
