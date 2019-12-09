import { IsIn, IsNotEmpty, IsOptional } from 'class-validator'
import { ItemStatus } from '../item-status.enum'

export class GetItemsFilterDto {
  @IsOptional()
  @IsIn([ItemStatus.InStock, ItemStatus.OutOfStock, ItemStatus.Sale])
  status: ItemStatus

  @IsOptional()
  @IsNotEmpty()
  search: string
}
