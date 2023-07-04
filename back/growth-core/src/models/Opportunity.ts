import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './Customer';
import { CartItem } from 'src/services/cart/ICartService';

@Entity()
export class Opportunity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @ManyToOne(() => Customer, { eager: false })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column('json')
  items: CartItem[];
}
