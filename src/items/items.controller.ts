import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { ItemsService } from './items.service'
import { ISItem } from './item.model'
import { CreateItemDto } from './dto/create-item.dto'

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  getAllItems(@Req() req): ISItem[] {
    console.log(req.url)
    return this.itemsService.getAllItems()
  }

  @Post()
  createItem(@Body() createItemDto: CreateItemDto) {
    console.log(createItemDto)
    return this.itemsService.createItem(createItemDto)
  }
}
