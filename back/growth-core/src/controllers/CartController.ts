import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from 'src/services/cart/CartService';
import { SaveAbandonedCartRequest } from 'src/services/cart/ICartService';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/save/abandoned')
  async saveAbandonedCart(@Body() body: SaveAbandonedCartRequest) {
    const response = await this.cartService.saveAbandonedCart(body);

    return response;
  }
}
