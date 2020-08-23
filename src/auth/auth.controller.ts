import { Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Log user in' })
    @Post('login')
    async login(@Request() req: { user: User }) {
      return this.authService.login(req.user);
    }
  
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Return user profile' })
    @Get('profile')
    getProfile(@Request() req: { user: User }) {
      return req.user;
    }
}
