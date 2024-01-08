import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { User, UserRole } from 'src/entities/user.entity';

@Injectable()
export class JwtAdminGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<TUser extends User = User>(err: any, user: TUser): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    if (user.role !== UserRole.admin) {
      throw new UnauthorizedException(
        'You do not have permission to perform this action',
      );
    }
    return user;
  }
}
