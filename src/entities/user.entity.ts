import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsDateString,
  IsString,
} from 'class-validator';

export enum UserRole {
  admin = 'admin',
  customer = 'customer',
}

@Entity('users')
export class User {
  @PrimaryColumn()
  id: number;

  @ApiProperty({
    example: 'John',
    description: 'The first name of the user.',
  })
  @Column()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user.' })
  @Column()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user.',
  })
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'The phone of the user.',
  })
  @Column({ unique: true })
  @IsPhoneNumber()
  phone: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ default: false })
  profile_completed: boolean;

  @ApiProperty({
    example: 'Address',
    description: 'The address of the user.',
  })
  @Column()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 'city',
    description: 'The city of the user.',
  })
  @Column()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    example: 'zipcode',
    description: 'The zipcode of the user.',
  })
  @Column()
  @IsNotEmpty()
  zipcode: string;

  @ApiProperty({
    example: 'state',
    description: 'The state of the user.',
  })
  @Column()
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    example: 'Country',
    description: 'The country of the user.',
  })
  @Column()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    example: '2000-01-01',
    description: 'The birthday of the user (YYYY-MM-DD format).',
  })
  @Column()
  @IsDateString()
  birthday: string;

  @Column({ default: false })
  email_verified: boolean;

  @Column()
  password: string;

  @Column({ default: UserRole.customer })
  role: UserRole;

  @ApiProperty({
    example: '2023-05-02T00:00:00.000Z',
    description: 'The time the user was created.',
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    example: '2023-05-02T00:00:00.000Z',
    description: 'The time the user was last updated.',
  })
  @UpdateDateColumn()
  updated_at: Date;
}

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
