export interface ISItem {
  id: string
  title: string
  price: number
  description: string
  status: ItemStatus
}

export enum ItemStatus {
  InStock = 'IN_STOCK',
  OutOfStock = 'OUT_OF_STOCK',
  Sale = 'SALE',
}
