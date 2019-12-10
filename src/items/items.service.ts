import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateItemDto } from './dto/create-item.dto'
import { ItemRepository } from './item.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Item } from './item.entity'
import { ItemStatus } from './item-status.enum'
import { GetItemsFilterDto } from './dto/get-items-filter.dto'
import { User } from '../auth/user.entity'

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemRepository)
    private itemRepository: ItemRepository,
  ) {}

  async getAllItems(filterDto: GetItemsFilterDto, user: User): Promise<Item[]> {
    return this.itemRepository.getAllItems(filterDto, user)
  }

  async getItemById(id: number, user: User): Promise<Item> {
    const found = await this.itemRepository.findOne({ where: { id, userId: user.id } })
    if (!found) {
      throw new NotFoundException(`Item with id ${id} not found`)
    }

    return found
  }

  async createItem(createItemDto: CreateItemDto, user: User): Promise<Item> {
    return this.itemRepository.createItem(createItemDto, user)
  }

  async deleteItem(id: number, user: User): Promise<void> {
    const result = await this.itemRepository.delete({ id, userId: user.id })

    if (result.affected === 0) {
      throw new NotFoundException(`Item with id ${id} not found`)
    }
  }

  async updateItemStatus(id: number, status: ItemStatus, user: User): Promise<Item> {
    const item = await this.getItemById(id, user)

    item.status = status
    await item.save()

    return item
  }
}
