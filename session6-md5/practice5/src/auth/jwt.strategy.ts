import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { BlacklistService } from './blacklist.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly blacklistService: BlacklistService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'JWT_SECRET_BLACKLIST_DEMO_2026',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const rawToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (!rawToken || this.blacklistService.isBlacklisted(rawToken)) {
      throw new UnauthorizedException('Token đã bị vô hiệu hóa do đã đăng xuất (Blacklisted Token)');
    }
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}
