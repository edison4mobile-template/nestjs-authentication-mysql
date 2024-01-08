import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constant';
import { CreateUserDto, LoginUserDto } from 'src/services/user/user.dto';
import { ChangePasswordDto, User } from 'src/entities/user.entity';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(
    loginDto: LoginUserDto,
  ): Promise<{ accessToken: string; expire: string }> {
    const user = await this.userService.findOneByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({ email: user.email, id: user.id });

    const expire = jwtConstants.expire;
    return { accessToken: token, expire };
  }

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userService.findOneByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    const newUser = await this.userService.create(createUserDto);
    await this.userService.save(newUser);

    return newUser;
  }

  async changePassword(
    id: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<User> {
    const user = await this.userService.findOneById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const isOldPasswordValid = await bcrypt.compare(
      changePasswordDto.oldPassword,
      user.password,
    );
    if (!isOldPasswordValid) {
      throw new UnauthorizedException('Invalid old password');
    }

    const hashedNewPassword = await bcrypt.hash(
      changePasswordDto.newPassword,
      10,
    );

    return await this.userService.updatePassword(user.id, hashedNewPassword);
  }

  async refreshToken(
    req: Request,
  ): Promise<{ accessToken: string; expire: string }> {
    const oldToken = req.get('authorization')?.split(' ')[1];

    if (!oldToken) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const decodedToken = await this.jwtService.verifyAsync(oldToken);
      const user = await this.userService.findOneByEmail(decodedToken.email);
      if (!user) {
        throw new UnauthorizedException();
      }

      const token = this.jwtService.sign({ email: user.email, id: user.id });

      const expire = jwtConstants.expire;
      return { accessToken: token, expire };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async validateUser(payload: any) {
    const user = await this.userService.findOneByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
