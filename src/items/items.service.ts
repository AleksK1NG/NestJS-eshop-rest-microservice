import { Injectable } from '@nestjs/common'
import { ISItem, ItemStatus } from './item.model'
import * as uuid from 'uuid/v1'
import { CreateItemDto } from './dto/create-item.dto'

@Injectable()
export class ItemsService {
  private items: ISItem[] = []

  getAllItems(): ISItem[] {
    return this.items
  }

  createItem(createItemDto: CreateItemDto): ISItem {
    const { title, description, price } = createItemDto
    const item: ISItem = {
      id: uuid(),
      title,
      description,
      price,
      status: ItemStatus.InStock,
    }

    this.items.push(item)

    return item
  }
}
