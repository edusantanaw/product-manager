import {
  Column,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product')
export class ProductEntity {
  @Generated('uuid')
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column({ nullable: false, type: 'float' })
  price: number;
  @Column({ nullable: false, type: 'text' })
  name: string;
  @Column({ nullable: false, type: 'longtext' })
  description: string;
  @Column({ nullable: true })
  image?: string;
  @Column({ type: 'int', default: 0 })
  deleted: number = 0;
  @Column({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
