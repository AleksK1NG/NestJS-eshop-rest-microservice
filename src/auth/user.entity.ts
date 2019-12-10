import * as bcrypt from 'bcrypt'
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { Item } from '../items/item.entity'

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  salt: string

  // eager for get all items for user
  @OneToMany(
    (type) => Item,
    (item) => item.user,
    { eager: true },
  )
  items: Item[]

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password
  }
}
