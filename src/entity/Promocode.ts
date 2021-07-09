import { Order } from "./Order";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

enum Status {
  "new",
  "approved",
  "rejected",
  "canceled",
  "delivered",
  "paid",
}

@Entity()
export class Promocode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({})
  expiry: Date;

  @Column()
  usage: number;

  @Column()
  amount: number;

  @Column()
  isFixed: boolean;

  @Column()
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations

  @OneToMany((type) => Order, (order) => order.promocode)
  orders: Order[];
}
