import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common'
import { ItemsService } from './items.service'
import { CreateItemDto } from './dto/create-item.dto'
import { GetItemsFilterDto } from './dto/get-items-filter.dto'
import { ItemStatusValidationPipe } from './pipes/item-status-validation.pipe'
import { Item } from './item.entity'

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  // @Get()
  // getAllItems(@Query() filterDto: GetItemsFilterDto): ISItem[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.itemsService.getAllItemWithFilters(filterDto)
  //   } else {
  //     return this.itemsService.getAllItems()
  //   }
  // }
  //
  @Get('/:id')
  getItemById(@Param('id', ParseIntPipe) id: number): Promise<Item> {
    return this.itemsService.getItemById(id)
  }
  //
  // @Post()
  // @UsePipes(ValidationPipe)
  // createItem(@Body() createItemDto: CreateItemDto) {
  //   console.log(createItemDto)
  //   return this.itemsService.createItem(createItemDto)
  // }
  //
  // @Delete('/:id')
  // deleteItem(@Param('id') id: string) {
  //   return this.itemsService.deleteItem(id)
  // }
  //
  // @Patch('/:id/status')
  // updateItemStatus(@Param('id') id: string, @Body('status', ItemStatusValidationPipe) status: ItemStatus) {
  //   return this.itemsService.updateItemStatus(id, status)
  // }
}
