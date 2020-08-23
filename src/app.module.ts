import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import passPortConfig from './config/passport-configuration';
import appConfig from './config/app-configuration';


@Module({
  imports: [
  ConfigModule.forRoot({ 
    isGlobal: true,
    load: [ appConfig, passPortConfig]
  }), 
  AuthModule, 
  UsersModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
