import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IpBlockMiddleware implements NestMiddleware {
  private readonly blacklist: string[] = [
    '::1',
    '127.0.0.1',
    '::ffff:127.0.0.1',
    '192.168.1.100',
  ];

  use(req: Request, res: Response, next: NextFunction) {
    const clientIp =
      (req.headers['x-forwarded-for'] as string) ||
      req.socket.remoteAddress ||
      req.ip ||
      '';

    const isBlocked = this.blacklist.some((blockedIp) =>
      clientIp.includes(blockedIp),
    );

    if (isBlocked) {
      return res.status(403).json({
        statusCode: 403,
        error: 'Forbidden',
        message: `Your IP address [${clientIp}] has been blocked by Security Middleware.`,
        timestamp: new Date().toISOString(),
      });
    }

    next();
  }
}
