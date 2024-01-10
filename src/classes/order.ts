/* eslint-disable quotes */
/* eslint-disable no-empty-function */
import { orderStatus } from './interfaces/order-status';
import { CustomerOrder } from './interfaces/customer-protocol';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';
import { MessagingProtocol } from '../services/interfaces/messaging-protocol';
import { PersistencyProtocol } from '../services/interfaces/persistency-protocol';

export class Order {
  private _orderStatus:orderStatus = 'open';

  constructor(
    private readonly cart: ShoppingCartProtocol,
    private readonly message: MessagingProtocol,
    private readonly persistency: PersistencyProtocol,
    private readonly custumer: CustomerOrder,
  ) {}

  get orderStatus(): orderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.cart.isEmpty()) {
      console.log('seu carrinho está vazio');
      return;
    }

    this._orderStatus = 'closed';
    this.message.sendMessaging(`seu pedido com total de ${this.cart.totalWithDiscount()} esta sendo processado`);
    this.persistency.saveOrder();
    console.log('cliente: ', this.custumer.getName(), this.custumer.getIDM());
    this.cart.clear();
  }
}
