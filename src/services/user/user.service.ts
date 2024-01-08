import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from 'src/services/user/user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    return this.userRepository.create(dto);
  }

  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    const options = {
      where: { email: email },
    };
    return await this.userRepository.findOne(options);
  }

  async findOneById(id: number): Promise<User> {
    const options = {
      where: { id: id },
    };
    return await this.userRepository.findOne(options);
  }

  async updatePassword(id: number, hashedNewPassword: string) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    user.password = hashedNewPassword;
    return await this.userRepository.save(user);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (dto.first_name) {
      user.first_name = dto.first_name;
    }
    if (dto.last_name) {
      user.last_name = dto.last_name;
    }
    if (dto.email) {
      user.email = dto.email;
    }

    if (dto.address) {
      user.address = dto.address;
    }

    if (dto.city) {
      user.city = dto.city;
    }

    if (dto.zipcode) {
      user.zipcode = dto.zipcode;
    }

    if (dto.state) {
      user.state = dto.state;
    }

    if (dto.country) {
      user.country = dto.country;
    }

    if (dto.birthday) {
      user.birthday = dto.birthday;
    }

    const isValid = Object.values(dto).every((value) => value !== undefined);

    if (isValid) {
      user.profile_completed = true;
    }

    return await this.userRepository.save(user);
  }
}
