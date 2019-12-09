import { Injectable } from '@nestjs/common'
import { ISItem } from './item.model'

@Injectable()
export class ItemsService {
  private items: ISItem[] = []

  getAllItems(): ISItem[] {
    return this.items
  }
}
