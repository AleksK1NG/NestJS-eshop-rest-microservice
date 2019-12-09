import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { ItemsService } from './items.service'
import { ISItem } from './item.model'

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  getAllItems(@Req() req): ISItem[] {
    console.log(req.url)
    return this.itemsService.getAllItems()
  }

  @Post()
  createItem(@Body() body: ISItem) {
    console.log(body)
    const { description, title, price } = body
    return this.itemsService.createItem(title, description, price)
  }
}
