import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { ItemsService } from './items.service'
import { CreateItemDto } from './dto/create-item.dto'
import { GetItemsFilterDto } from './dto/get-items-filter.dto'
import { ItemStatusValidationPipe } from './pipes/item-status-validation.pipe'
import { Item } from './item.entity'
import { ItemStatus } from './item-status.enum'
import { AuthGuard } from '@nestjs/passport'
import { User } from '../auth/user.entity'
import { GetUser } from '../auth/get-user.decorator'

@Controller('items')
// @UseGuards(AuthGuard())
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  @UseGuards(AuthGuard())
  getAllItems(@Query() filterDto: GetItemsFilterDto, @GetUser() user: User): Promise<Item[]> {
    return this.itemsService.getAllItems(filterDto, user)
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  getItemById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Item> {
    return this.itemsService.getItemById(id, user)
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  createItem(@Body() createItemDto: CreateItemDto, @GetUser() user: User): Promise<Item> {
    return this.itemsService.createItem(createItemDto, user)
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteItem(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
    return this.itemsService.deleteItem(id, user)
  }

  @Patch('/:id/status')
  @UseGuards(AuthGuard())
  updateItemStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: ItemStatus, @Body() body, @GetUser() user: User): Promise<Item> {
    return this.itemsService.updateItemStatus(id, status, user)
  }
}
