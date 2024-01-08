import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PassportStrategy } from '@nestjs/passport';
import { User, UserRole } from 'src/entities/user.entity';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from 'src/constant';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.userService.findOneByEmail(payload.email);

    if (!user || user.role !== UserRole.admin) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }
}
