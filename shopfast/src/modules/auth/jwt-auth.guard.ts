import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      if (isPublic) return true;
      throw new UnauthorizedException('Vui lòng đăng nhập để tiếp tục');
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer?.toLowerCase() !== 'bearer' || !token) {
      if (isPublic) return true;
      throw new UnauthorizedException('Token không hợp lệ');
    }

    try {
      const payload = await this.jwt.verifyAsync(token);
      request.user = {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
        fullName: payload.name,
      };
      return true;
    } catch {
      if (isPublic) return true;
      throw new UnauthorizedException('Phiên đăng nhập đã hết hạn');
    }
  }
}
