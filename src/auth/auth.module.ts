import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { IEnvironmentVariables } from 'src/config/configuration-interface';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<IEnvironmentVariables>) => ({
        secret: configService.get('jwtSecret'),
        signOptions: { expiresIn: '15m' }, 
      }),
      inject: [ConfigService]
    }),
  ],
  providers: [AuthService, LocalAuthGuard, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
