import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";

import { Order } from "./Order";
import { Review } from "./Review";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  otp: number;

  @Column({ default: false })
  isBuyer: boolean;

  @Column({ nullable: true })
  birthDate: Date;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  passwordOtp: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //

  @OneToMany((type) => Order, (order) => order.user)
  orders: Order[];

  @OneToMany((type) => Review, (review) => review.user)
  reviews: Review[];
}
