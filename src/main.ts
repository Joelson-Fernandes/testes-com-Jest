import { Order } from './classes/order';
import { ShoppingCart } from './classes/shopping';
// import { Messaging } from './services/messaging';
import { Persistency } from './services/persistency';
import { Product } from './classes/product';
import { TenPercentDiscount } from './classes/discount';
import { IndividualCustomer } from './classes/customer';
import { MessagingProtocol } from './services/interfaces/messaging-protocol';

class MessagingMock implements MessagingProtocol {
  sendMessaging(): void {
    console.log('A mensagem foi enviada pelo MOCK');
  }
}

const messagingMock = new MessagingMock();

// const fiftyPercentDiscount = new FiftyPercentDiscount();
const tenPercentDiscount = new TenPercentDiscount();
// const noDiscount = new NoDiscount();
const individualCustomer = new IndividualCustomer('joelson', 'Fernandes', '3768287547');
const cart = new ShoppingCart(tenPercentDiscount);
// const message = new Messaging();
const persistency = new Persistency();
const order = new Order(cart, messagingMock, persistency, individualCustomer);
cart.addItem(new Product('Iphone', 1.999));
cart.addItem(new Product('XboxS', 2.589));
cart.addItem(new Product('G29', 2.705));
cart.removeItem(2);
// cart.clear();
console.log(cart.total());
console.log(cart.totalWithDiscount());
console.log(cart.items);
order.checkout();
console.log(order.orderStatus);
