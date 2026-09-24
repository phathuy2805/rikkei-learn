import { Controller, Get, Param, Headers, ParseIntPipe, ForbiddenException } from '@nestjs/common';
import { SalariesService } from './salaries.service';
import { CaslAbilityFactory, UserContext } from '../casl/casl-ability.factory';
import { Action } from '../casl/action.enum';

@Controller('salaries')
export class SalariesController {
  constructor(
    private readonly salariesService: SalariesService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Headers('x-user-id') userIdHeader?: string,
    @Headers('x-user-role') userRoleHeader?: string,
  ) {
    const userId = userIdHeader ? parseInt(userIdHeader, 10) : 101;
    const role = (userRoleHeader as 'ADMIN' | 'USER') || 'USER';

    const currentUser: UserContext = {
      id: userId,
      username: `user_${userId}`,
      role,
    };

    const salary = this.salariesService.findOne(id);
    const ability = this.caslAbilityFactory.createForUser(currentUser);

    if (!ability.can(Action.Read, salary)) {
      throw new ForbiddenException(
        'Bạn không có quyền truy cập dữ liệu lương của nhân viên khác (ABAC Rule: User.id === Salary.ownerId)',
      );
    }

    return {
      message: 'Truy cập thông tin bảng lương thành công theo chính sách ABAC',
      data: salary,
    };
  }
}
