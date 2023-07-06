import { Customer } from 'src/models/Customer';

export interface ICartService {
  saveAbandonedCart(request: SaveAbandonedCartRequest): Promise<any>;
}

export class CartItem {
  id: number;
  name: string;
  quantity: number;
}

export class SaveAbandonedCartRequest {
  customer: Customer;
  id: number;
  items: CartItem[];
}
