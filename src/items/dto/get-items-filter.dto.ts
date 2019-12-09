import { ItemStatus } from '../item.model'
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator'

export class GetItemsFilterDto {
  @IsOptional()
  @IsIn([ItemStatus.InStock, ItemStatus.OutOfStock, ItemStatus.Sale])
  status: ItemStatus

  @IsOptional()
  @IsNotEmpty()
  search: string
}
