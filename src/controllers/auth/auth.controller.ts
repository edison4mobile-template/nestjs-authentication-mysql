import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from 'src/services/user/user.dto';
import { AuthService } from 'src/services/auth/auth.service';
import { JwtCustomerGuard } from 'src/services/auth/jwt-customer.guard';
import { Request } from 'express';
import { Id } from 'src/services/auth/user-decorator';
import { ChangePasswordDto } from 'src/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Signup' })
  @Post('signup')
  async signup(@Body() userDto: CreateUserDto): Promise<void> {
    await this.authService.signup(userDto);
  }

  @ApiOperation({ summary: 'Login' })
  @Post('login')
  async login(@Body() userDto: LoginUserDto): Promise<{ accessToken: string }> {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Refresh token by old bearer token' })
  @Get('refresh-token')
  @ApiBearerAuth('token')
  @UseGuards(JwtCustomerGuard)
  async refreshToken(@Req() req: Request): Promise<{ accessToken: string }> {
    return this.authService.refreshToken(req);
  }

  @Post('change-password')
  @ApiBearerAuth('token')
  @UseGuards(JwtCustomerGuard)
  async changePassword(
    @Id() id: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    await this.authService.changePassword(id, changePasswordDto);
  }
}
