import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/jwt-auth.guard';

@ApiTags('Health')
@Public()
@Controller('api/health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check endpoint cho AWS EC2 / Docker / ALB' })
  check() {
    return {
      status: 'ok',
      service: 'shopfast-backend',
      uptimeSec: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION || '1.0.0',
    };
  }
}
