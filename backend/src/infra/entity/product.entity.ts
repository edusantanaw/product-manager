import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

interface IProduct {
  name?: string;
  price: number;
  image?: string;
  description?: string;
}

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false, type: 'float' })
  price: number;
  @Column({ nullable: false, type: 'text' })
  name: string;
  @Column({ nullable: false, type: 'text' })
  description: string;
  @Column({ nullable: true })
  image?: string;
  @Column({ type: 'int', default: 0 })
  deleted: number = 0;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  constructor(data: IProduct) {
    if (data?.name) this.name = data?.name;
    if (data?.description) this.description = data?.description;
    if (data?.price) this.price = data?.price;
    this.image = data?.image;
  }
}
