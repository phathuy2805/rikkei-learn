import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService, User } from './users.service';

describe('UsersService Mutation Testing', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('isEligibleForDiscount', () => {
    it('should throw BadRequestException when age is negative', () => {
      expect(() => service.isEligibleForDiscount(-1)).toThrow(BadRequestException);
    });

    it('should return false for age strictly less than 18', () => {
      expect(service.isEligibleForDiscount(17)).toBe(false);
    });

    it('should return true for boundary age 18', () => {
      expect(service.isEligibleForDiscount(18)).toBe(true);
    });

    it('should return true for age inside range', () => {
      expect(service.isEligibleForDiscount(30)).toBe(true);
    });

    it('should return true for boundary age 60', () => {
      expect(service.isEligibleForDiscount(60)).toBe(true);
    });

    it('should return false for age strictly greater than 60', () => {
      expect(service.isEligibleForDiscount(61)).toBe(false);
    });
  });

  describe('calculateRewardPoints', () => {
    it('should return 0 when user is not active', () => {
      const user: User = { id: 3, name: 'Charlie', age: 30, isActive: false, role: 'USER' };
      expect(service.calculateRewardPoints(user)).toBe(0);
    });

    it('should calculate points for active USER without admin bonus', () => {
      const user: User = { id: 2, name: 'Bob', age: 20, isActive: true, role: 'USER' };
      expect(service.calculateRewardPoints(user)).toBe(200);
    });

    it('should calculate points for active ADMIN with 100 bonus points', () => {
      const user: User = { id: 1, name: 'Alice', age: 25, isActive: true, role: 'ADMIN' };
      expect(service.calculateRewardPoints(user)).toBe(350);
    });
  });

  describe('findById', () => {
    it('should return user when found', () => {
      const user = service.findById(1);
      expect(user.id).toBe(1);
      expect(user.name).toBe('Alice');
    });

    it('should throw NotFoundException when user does not exist', () => {
      expect(() => service.findById(999)).toThrow(NotFoundException);
    });
  });
});
