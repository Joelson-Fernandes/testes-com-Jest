/* eslint-disable no-empty-function */
import { Discount } from './discount';
import { CartItem } from './interfaces/cart-item';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';

export class ShoppingCart implements ShoppingCartProtocol {
  private readonly _items: CartItem[] = [];

  constructor(private readonly discount: Discount) {}

  addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.splice(index, 1);
  }

  get items(): readonly CartItem[] {
    return this._items;
  }

  totalWithDiscount(): number {
    // quebra do principiu de substituição de Liskov
    const result = this.discount.calculate(this.total());
    if (typeof result === 'number') return result;
    return this.total();
  }

  total():number {
    return parseFloat(this._items.reduce((total, next) => total + next.price, 0)
      .toFixed(3));
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  clear(): void {
    this._items.length = 0;
  }
}
