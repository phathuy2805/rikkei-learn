import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user || { id: Number(request.headers['x-user-id'] || 1) };
    const resourceId = Number(request.params.id);

    if (user.id !== resourceId) {
      throw new ForbiddenException('Bạn không có quyền thao tác trên tài nguyên của người dùng khác');
    }

    return true;
  }
}
