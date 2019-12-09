import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'
import { ItemStatus } from '../item-status.enum'

export class ItemStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses: ItemStatus[] = [ItemStatus.InStock, ItemStatus.OutOfStock, ItemStatus.Sale]

  transform(value: any, metadata: ArgumentMetadata): any {
    if (!this.isStatusValid(value.toUpperCase())) {
      throw new BadRequestException(`${value} is not valid status`)
    }

    return undefined
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status)
    return idx !== -1
  }
}
