import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ItemStatus } from './item.model'

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  price: number

  @Column()
  status: ItemStatus
}

