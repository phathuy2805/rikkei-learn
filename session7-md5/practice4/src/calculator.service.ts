import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  add(a: number, b: number): number {
    return a + b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): number {
    if (b === 0) {
      throw new BadRequestException('Không thể chia cho số 0');
    }
    return a / b;
  }
}
