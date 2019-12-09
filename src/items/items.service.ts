import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateItemDto } from './dto/create-item.dto'
import { ItemRepository } from './item.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Item } from './item.entity'
import { ItemStatus } from './item-status.enum'

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

  async deleteItem(id: number): Promise<void> {
    const result = await this.itemRepository.delete(id)

    if (result.affected === 0) {
      throw new NotFoundException(`Item with id ${id} not found`)
    }
  }

  async updateItemStatus(id: number, status: ItemStatus): Promise<Item> {
    const item = await this.getItemById(id)
    item.status = status
    await item.save()
    // console.log('updateItemStatus', status)
    return item
  }
}
