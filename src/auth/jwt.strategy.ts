import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnvironmentVariables } from 'src/config/configuration-interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private configService: ConfigService<IEnvironmentVariables>;
  constructor(configService: ConfigService<IEnvironmentVariables>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwtSecret')
    });

    this.configService = configService;
  }

  async validate(payload: any) {
      // Can look up userId in a list of revoked tokens (token revocation)
      // Hit the DB to gather up more user and enrich the user object
    return { userId: payload.sub, username: payload.username };
  }
}