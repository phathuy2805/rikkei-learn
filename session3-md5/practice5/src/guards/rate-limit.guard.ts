import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly rateLimitMap = new Map<string, { count: number; resetTime: number }>();
  private readonly limit = 10;
  private readonly windowMs = 60 * 1000;

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const ip = req.ip || req.socket.remoteAddress || '127.0.0.1';
    const now = Date.now();

    const record = this.rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
      this.rateLimitMap.set(ip, { count: 1, resetTime: now + this.windowMs });
      return true;
    }

    if (record.count >= this.limit) {
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: 'Vượt quá giới hạn 10 request/phút. Vui lòng thử lại sau.',
          error: 'Too Many Requests',
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    record.count++;
    return true;
  }
}
