import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { ItemsService } from './items.service'
import { CreateItemDto } from './dto/create-item.dto'
import { GetItemsFilterDto } from './dto/get-items-filter.dto'
import { ItemStatusValidationPipe } from './pipes/item-status-validation.pipe'
import { Item } from './item.entity'
import { ItemStatus } from './item-status.enum'
import { AuthGuard } from '@nestjs/passport'

@Controller('items')
// @UseGuards(AuthGuard())
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  getAllItems(@Query() filterDto: GetItemsFilterDto): Promise<Item[]> {
    return this.itemsService.getAllItems(filterDto)
  }

  @Get('/:id')
  getItemById(@Param('id', ParseIntPipe) id: number): Promise<Item> {
    return this.itemsService.getItemById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  createItem(@Body() createItemDto: CreateItemDto): Promise<Item> {
    console.log(createItemDto)
    return this.itemsService.createItem(createItemDto)
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteItem(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.itemsService.deleteItem(id)
  }

  @Patch('/:id/status')
  @UseGuards(AuthGuard())
  updateItemStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: ItemStatus, @Body() body): Promise<Item> {
    console.log('updateItemStatus controller', status)
    return this.itemsService.updateItemStatus(id, status)
  }
}
