import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

enum Status {
  "new",
  "approved",
  "rejected",
  "canceled",
  "delivered",
  "paid",
}

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @Column({ default: 0 })
  price: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations

  // orderId
  @ManyToOne((type) => Order, (order) => order.items)
  order: Order;
  // productId
  @ManyToOne((type) => Product, (product) => product.items)
  product: Product;
}
