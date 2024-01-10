import { CartItem } from './cart-item';

export interface ShoppingCartProtocol {
  addItem(item: CartItem): void

  removeItem(index: number): void

  get items(): readonly CartItem[]

  totalWithDiscount(): number

  total():number

  isEmpty(): boolean

  clear(): void
}
