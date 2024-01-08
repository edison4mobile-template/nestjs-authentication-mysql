import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './services/auth/jwt.strategy';
import { JwtCustomerStrategy } from './services/auth/jwt-customer.strategy';
import { JwtAdminStrategy } from './services/auth/jwt-admin.strategy';
import dataSourceOptions from './db/ormconfig';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    AppService,
    JwtService,
    JwtStrategy,
    JwtCustomerStrategy,
    JwtAdminStrategy,
  ],
})
export class AppModule {}
