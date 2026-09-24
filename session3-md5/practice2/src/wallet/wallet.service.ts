import { Injectable } from '@nestjs/common';
import { InsufficientFundsException } from '../exceptions/insufficient-funds.exception.js';

@Injectable()
export class WalletService {
  private balance = 500000;

  transfer(recipientId: string, amount: number) {
    if (amount > this.balance) {
      throw new InsufficientFundsException();
    }

    this.balance -= amount;
    return {
      success: true,
      message: `Chuyển thành công ${amount} VND tới người nhận ${recipientId}`,
      remainingBalance: this.balance,
    };
  }
}
