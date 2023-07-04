import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CartService } from 'src/services/cart/CartService';
import { SaveAbandonedCartRequest } from 'src/services/cart/ICartService';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @MessagePattern('cart-abandoned')
  async saveOpportunity(@Payload() request: any) {
    console.log(
      '🚀 ~ file: CartController.ts:12 ~ CartController ~ saveOpportunity ~ request:',
      request,
    );
    const response = await this.cartService.saveAbandonedCart(request);
    console.log(
      '🚀 ~ file: CartController.ts:17 ~ CartController ~ saveOpportunity ~ response:',
      response,
    );
    return response;
  }
}
