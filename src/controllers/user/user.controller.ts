import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';
import { JwtAdminGuard } from 'src/services/auth/jwt-admin.guard';
import { JwtCustomerGuard } from 'src/services/auth/jwt-customer.guard';
import { CurrentUser, Id } from 'src/services/auth/user-decorator';
import { UpdateUserDto } from 'src/services/user/user.dto';
import { UserService } from 'src/services/user/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put(':id')
  @ApiBearerAuth('token')
  @UseGuards(JwtCustomerGuard)
  async updateUser(
    @Id() id: number,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userService.update(id, dto);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Get('profile')
  @ApiBearerAuth('token')
  @UseGuards(JwtCustomerGuard)
  async getUser(@CurrentUser() currentUser: User): Promise<User> {
    return currentUser;
  }

  @Post('verify-identity')
  @ApiBearerAuth('token')
  @UseGuards(JwtAdminGuard)
  async verifyIdentity(@CurrentUser() currentUser: User): Promise<User> {
    currentUser.verified = true;
    return await this.userService.save(currentUser);
  }

  @Post('verify-email')
  @ApiBearerAuth('token')
  @UseGuards(JwtCustomerGuard)
  async verifyEmail(@CurrentUser() currentUser: User): Promise<User> {
    currentUser.email_verified = true;
    return await this.userService.save(currentUser);
  }
}
