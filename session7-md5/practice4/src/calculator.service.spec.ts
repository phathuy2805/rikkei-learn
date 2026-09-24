import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { CalculatorService } from './calculator.service';

describe('CalculatorService CI Tests', () => {
  let service: CalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatorService],
    }).compile();

    service = module.get<CalculatorService>(CalculatorService);
  });

  it('should add two numbers correctly', () => {
    expect(service.add(10, 25)).toBe(35);
  });

  it('should multiply two numbers correctly', () => {
    expect(service.multiply(6, 7)).toBe(42);
  });

  it('should divide two numbers correctly', () => {
    expect(service.divide(100, 4)).toBe(25);
  });

  it('should throw BadRequestException when dividing by zero', () => {
    expect(() => service.divide(50, 0)).toThrow(BadRequestException);
  });
});
