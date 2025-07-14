import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityException } from '../error/entity.exception';

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

  constructor() {}

  public static build() {
    return new this();
  }

  public setId(id: string) {
    this.id = id;
    return this;
  }

  public setName(name: string) {
    this.name = name;
    return this;
  }

  public setDescription(desc: string) {
    this.description = desc;
    return this;
  }

  public setDeleted(deleted: boolean) {
    this.deleted = deleted ? 1 : 0;
    return this;
  }

  public setPrice(price: number) {
    if (price < 0.01) throw new EntityException('Preço invalido!');
    this.price = price;
    return this;
  }

  public setImage(imagePath?: string) {
    this.image = imagePath;
    return this;
  }
}
