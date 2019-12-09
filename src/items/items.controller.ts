import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common'
import { ItemsService } from './items.service'
import { ISItem, ItemStatus } from './item.model'
import { CreateItemDto } from './dto/create-item.dto'
import { GetItemsFilterDto } from './dto/get-items-filter.dto'

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  getAllItems(@Query() filterDto: GetItemsFilterDto): ISItem[] {
    if (Object.keys(filterDto).length) {
      return this.itemsService.getAllItemWithFilters(filterDto)
    } else {
      return this.itemsService.getAllItems()
    }
  }

  @Get('/:id')
  getItemById(@Param('id') id: string) {
    return this.itemsService.getItemById(id)
  }

  @Post()
  createItem(@Body() createItemDto: CreateItemDto) {
    console.log(createItemDto)
    return this.itemsService.createItem(createItemDto)
  }

  @Delete('/:id')
  deleteItem(@Param('id') id: string) {
    return this.itemsService.deleteItem(id)
  }

  @Patch('/:id/status')
  updateItemStatus(@Param('id') id: string, @Body('status') status: ItemStatus) {
    return this.itemsService.updateItemStatus(id, status)
  }
}
