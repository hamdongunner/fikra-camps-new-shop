import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Product } from './Product';

enum Status {
  "new",
  "approved",
  "rejected",
  "canceled",
  "delivered",
  "paid",
}

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stars: number;

  @Column({ nullable: true })
  comment: string;

  @Column()
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations

  // userId
  @ManyToOne((type) => User, (user) => user.reviews)
  user: User;
  // productId
  @ManyToOne((type) => Product, (product) => product.reviews)
  product: Product;
}
