import { EntityRepository, Repository } from 'typeorm'
import { Item } from './item.entity'
import { CreateItemDto } from './dto/create-item.dto'
import { ItemStatus } from './item-status.enum'

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
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


  async deleteItem(id: number): Promise<void> {

  }
}
