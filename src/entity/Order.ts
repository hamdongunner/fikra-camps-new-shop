import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { OrderItem } from "./OrderItem";
import { Promocode } from "./Promocode";
import { User } from "./User";

enum Status {
  "new",
  "approved",
  "rejected",
  "canceled",
  "delivered",
  "paid",
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  address: string;

  @Column({})
  city: string;

  @Column()
  gov: string;

  @Column({ default: "new" })
  status: string;

  @Column()
  total: number;

  @Column({ default: 0 })
  discount: number;

  @Column()
  totalAfterDiscount: number;

  @Column({})
  paymentMethod: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations

  // userId
  @ManyToOne((type) => User, (user) => user.orders)
  user: User;
  // promocodeId
  @ManyToOne((type) => Promocode, (promocode) => promocode.orders)
  promocode: Promocode;

  // item
  @OneToMany((type) => OrderItem, (item) => item.order)
  items: OrderItem[];
}
