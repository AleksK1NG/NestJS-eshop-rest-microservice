import { EntityRepository, Repository } from 'typeorm'
import { Item } from './item.entity'
import { CreateItemDto } from './dto/create-item.dto'
import { ItemStatus } from './item-status.enum'
import { GetItemsFilterDto } from './dto/get-items-filter.dto'

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  async getAllItems(filterDto: GetItemsFilterDto): Promise<Item[]> {
    const { search, status } = filterDto

    const query = this.createQueryBuilder('item')

    // where overwrite, andWhere add next one
    if (status) {
      query.andWhere('item.status = :status', { status })
    }

    if (search) {
      // `%${search}%` for partial word find, from documentation
      query.andWhere('item.title LIKE :search OR item.description LIKE :search', { search: `%${search}%` })
    }

    const items = await query.getMany()

    return items
  }

  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    const { title, description, price } = createItemDto

    const item = new Item()
    item.title = title
    item.price = price
    item.description = description
    item.status = ItemStatus.Sale

    await item.save()

    return item
  }
}
