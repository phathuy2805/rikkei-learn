import { Injectable, NotFoundException } from '@nestjs/common';
import { Salary } from './entities/salary.entity';

@Injectable()
export class SalariesService {
  private salaries: Salary[] = [
    {
      id: 1,
      ownerId: 101,
      employeeName: 'Nguyen Van A',
      baseSalary: 25000000,
      bonus: 5000000,
      netSalary: 30000000,
      month: '09/2026',
    },
    {
      id: 2,
      ownerId: 102,
      employeeName: 'Tran Thi B',
      baseSalary: 35000000,
      bonus: 8000000,
      netSalary: 43000000,
      month: '09/2026',
    },
  ];

  findOne(id: number): Salary {
    const salary = this.salaries.find((s) => s.id === id);
    if (!salary) {
      throw new NotFoundException(`Không tìm thấy bản ghi lương có ID ${id}`);
    }
    const entity = new Salary();
    Object.assign(entity, salary);
    return entity;
  }
}
