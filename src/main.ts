import { Order } from './classes/order';
import { ShoppingCart } from './classes/shopping';
import { Messaging } from './services/messaging';
import { Persistency } from './services/persistency';
import { Product } from './classes/product';
import { TenPercentDiscount } from './classes/discount';
import { IndividualCustomer } from './classes/customer';

// const fiftyPercentDiscount = new FiftyPercentDiscount();
const tenPercentDiscount = new TenPercentDiscount();
// const noDiscount = new NoDiscount();
const individualCustomer = new IndividualCustomer('joelson', 'Fernandes', '3768287547');
const cart = new ShoppingCart(tenPercentDiscount);
const message = new Messaging();
const persistency = new Persistency();
const order = new Order(cart, message, persistency, individualCustomer);
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
