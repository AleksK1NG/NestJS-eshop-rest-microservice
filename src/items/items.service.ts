import { Injectable, NotFoundException } from '@nestjs/common'
import { ISItem, ItemStatus } from './item.model'
import * as uuid from 'uuid/v1'
import { CreateItemDto } from './dto/create-item.dto'
import { GetItemsFilterDto } from './dto/get-items-filter.dto'

@Injectable()
export class ItemsService {
  private items: ISItem[] = []

  getAllItems(): ISItem[] {
    return this.items
  }

  getAllItemWithFilters(filterDto: GetItemsFilterDto): ISItem[] {
    const { search, status } = filterDto
    let result = this.items

    if (status) {
      result = this.items.filter((item) => item.status === status)
      return result
    }

    if (search) {
      result = this.items.filter((item) => item.title.includes(search) || item.description.includes(search))
      return result
    }

    return result
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

  getItemById(id: string): ISItem {
    const found = this.items.find((item) => item.id === id)
    if (!found) {
      throw new NotFoundException(`Task with ${id} id not found`)
    }
    return found
  }

  deleteItem(id: string): boolean {
    const found = this.items.find((item) => item.id === id)
    if (!found) {
      return false
    }
    this.items = this.items.filter((item) => item.id !== id)
    return true
  }

  updateItemStatus(id: string, status: ItemStatus) {
    const found = this.items.find((item) => item.id === id)
    if (!found) {
      return null
    }

    found.status = status
    return found
  }
}
