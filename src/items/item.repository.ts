import { EntityRepository, Repository } from 'typeorm'
import { Item } from './item.entity'
import { CreateItemDto } from './dto/create-item.dto'
import { ItemStatus } from './item-status.enum'
import { GetItemsFilterDto } from './dto/get-items-filter.dto'
import { User } from '../auth/user.entity'
import { InternalServerErrorException, Logger } from '@nestjs/common'

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  private logger = new Logger('ItemRepository')

  async getAllItems(filterDto: GetItemsFilterDto, user: User): Promise<Item[]> {
    const { search, status } = filterDto

    const query = this.createQueryBuilder('item')
    if (user && user.id) {
      query.where('item.userId = :userId', { userId: user.id })
    }

    // where overwrite, andWhere add next one
    if (status) {
      query.andWhere('item.status = :status', { status })
    }

    if (search) {
      // `%${search}%` for partial word find, from documentation
      query.andWhere('item.title LIKE :search OR item.description LIKE :search', { search: `%${search}%` })
    }

    try {
      const items = await query.getMany()
      return items
    } catch (error) {
      this.logger.error(`Failed to get items, error: ${error} `)
      throw new InternalServerErrorException()
    }
  }

  async createItem(createItemDto: CreateItemDto, user: User): Promise<Item> {
    const { title, description, price } = createItemDto

    const item = new Item()
    item.title = title
    item.price = price
    item.description = description
    item.status = ItemStatus.Sale
    item.user = user

    try {
      await item.save()

      delete item.user

      return item
    } catch (error) {
      this.logger.error(`Failed to create item, error: ${error} `)
      throw new InternalServerErrorException()
    }
  }
}
