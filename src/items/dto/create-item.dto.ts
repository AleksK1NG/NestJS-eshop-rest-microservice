import { IsNotEmpty } from 'class-validator'

export class CreateItemDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  description: string

  @IsNotEmpty()
  price: number
}
