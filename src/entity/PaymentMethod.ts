import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
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
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  name: string;

  @Column({})
  image: string;

  @Column()
  min: number;

  @Column()
  max: number;

  @Column()
  redirect: boolean;

  @Column({
    type: "jsonb",
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  fields: Array<{}>;

  @Column()
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations

  // userId
  // promocodeId
}
