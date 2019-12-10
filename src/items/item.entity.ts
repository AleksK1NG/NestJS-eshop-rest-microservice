import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ItemStatus } from './item-status.enum'
import { User } from '../auth/user.entity'

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

  @ManyToOne(
    (type) => User,
    (user) => user.items,
    { eager: false },
  )
  user: User

  @Column()
  userId: number
}
