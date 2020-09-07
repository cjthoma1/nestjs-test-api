import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RateLimiterModule, RateLimiterInterceptor } from 'nestjs-rate-limiter';
import passPortConfig from './config/passport-configuration';
import appConfig from './config/app-configuration';
import { APP_INTERCEPTOR } from '@nestjs/core';


@Module({
  imports: [
    RateLimiterModule.register({
      for: 'Fastify',
      points: 10,
      duration: 60,
      keyPrefix: 'global',
      errorMessage: 'Rate limit exceeded, you have to wait before trying again'
  }),
  ConfigModule.forRoot({ 
    isGlobal: true,
    load: [ appConfig, passPortConfig]
  }), 
  AuthModule, 
  UsersModule
],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RateLimiterInterceptor,
    }
  ],
})
export class AppModule {}
