import { Controller, Post, Body } from '@nestjs/common';
import { WalletService } from './wallet.service.js';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('transfer')
  transfer(@Body() body: { recipientId: string; amount: number }) {
    return this.walletService.transfer(body.recipientId, body.amount);
  }
}
