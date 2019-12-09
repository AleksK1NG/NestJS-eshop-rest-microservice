import { ItemStatus } from '../item.model'

export class GetItemsFilterDto {
  status: ItemStatus
  search: string
}
