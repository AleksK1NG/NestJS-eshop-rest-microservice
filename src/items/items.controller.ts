import { Body, Controller, Get, Req } from '@nestjs/common'
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
}
