import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  platform_category_id!: number;

  @Column()
  category_id!: number;

  @Column()
  sub_category_id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  slug!: string;

  @Column('longtext')
  description!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  discount_price!: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
  })
  discount_percentage!: number;

  @Column({
    type: 'int',
    default: 0,
  })
  quantity!: number;

  @Column({
    default: true,
  })
  in_stock!: boolean;

  @Column({
    nullable: true,
  })
  brand!: string;

  @Column({
    default: true,
  })
  is_active!: boolean;

  @Column({
    nullable: true,
  })
  meta_title!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  meta_description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}