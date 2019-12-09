import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateItemDto } from './dto/create-item.dto'
import { ItemRepository } from './item.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Item } from './item.entity'

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemRepository)
    private itemRepository: ItemRepository,
  ) {}

  async getItemById(id: number): Promise<Item> {
    const found = await this.itemRepository.findOne(id)
    if (!found) {
      throw new NotFoundException(`Item with id ${id} not found`)
    }

    return found
  }

  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    return this.itemRepository.createItem(createItemDto)
  }

  // getAllItems(): ISItem[] {
  //   return this.items
  // }
  //
  // getAllItemWithFilters(filterDto: GetItemsFilterDto): ISItem[] {
  //   const { search, status } = filterDto
  //   let result = this.items
  //
  //   if (status) {
  //     result = this.items.filter((item) => item.status === status)
  //     return result
  //   }
  //
  //   if (search) {
  //     result = this.items.filter((item) => item.title.includes(search) || item.description.includes(search))
  //     return result
  //   }
  //
  //   return result
  // }
  //
  // createItem(createItemDto: CreateItemDto): ISItem {
  //   const { title, description, price } = createItemDto
  //   const item: ISItem = {
  //     id: uuid(),
  //     title,
  //     description,
  //     price,
  //     status: ItemStatus.InStock,
  //   }
  //
  //   this.items.push(item)
  //
  //   return item
  // }
  //
  // getItemById(id: string): ISItem {
  //   const found = this.items.find((item) => item.id === id)
  //   if (!found) {
  //     throw new NotFoundException(`Task with ${id} id not found`)
  //   }
  //   return found
  // }
  //
  // deleteItem(id: string): boolean {
  //   const found = this.items.find((item) => item.id === id)
  //   if (!found) {
  //     throw new NotFoundException(`Task with ${id} id not found`)
  //   }
  //   this.items = this.items.filter((item) => item.id !== id)
  //   return true
  // }
  //
  // updateItemStatus(id: string, status: ItemStatus) {
  //   const found = this.items.find((item) => item.id === id)
  //   if (!found) {
  //     throw new NotFoundException(`Task with ${id} id not found`)
  //   }
  //
  //   found.status = status
  //   return found
  // }
}
