import { Injectable } from '@nestjs/common'
import { ISItem, ItemStatus } from './item.model'
import * as uuid from 'uuid/v1'

@Injectable()
export class ItemsService {
  private items: ISItem[] = []

  getAllItems(): ISItem[] {
    return this.items
  }

  createItem(title: string, description: string, price: number): ISItem {
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
