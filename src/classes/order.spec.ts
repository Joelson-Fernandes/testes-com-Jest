import { MessagingProtocol } from '../services/interfaces/messaging-protocol';
import { PersistencyProtocol } from '../services/interfaces/persistency-protocol';
import { CustomerOrder } from './interfaces/customer-protocol';
import { Order } from './order';
import { CartItem } from './interfaces/cart-item';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';

class ShoppingCartMock implements ShoppingCartProtocol {
  constructor() {}

  addItem(): void {}

  removeItem(): void {}

  get items(): readonly CartItem[] { return []; }

  totalWithDiscount(): number { return 2; }

  total():number { return 5; }

  isEmpty(): boolean { return false; }

  clear(): void {}
}

class MessagingMock implements MessagingProtocol {
  sendMessaging(): void {}
}

class PersistencyMock implements PersistencyProtocol {
  saveOrder(): void {}
}

class CustomerOrderMock implements CustomerOrder {
  constructor() {}

  getName(): string {
    return '';
  }

  getIDM(): string {
    return '';
  }
}

const createSut = () => {
  const cartMock = new ShoppingCartMock();
  const messagingMock = new MessagingMock();
  const persistencyMock = new PersistencyMock();
  const customerOrderMock = new CustomerOrderMock();

  const sut = new Order(
    cartMock,
    messagingMock,
    persistencyMock,
    customerOrderMock,
  );

  return {
    sut, cartMock, messagingMock, persistencyMock,
  };
};

describe('Order', () => {
  it('should have items', () => {
    const { sut } = createSut();
    expect(sut).toHaveProperty('_orderStatus');
  });

  it('should not checkout if cart is empty', () => {
    const { sut, cartMock } = createSut();
    const cartMockSpy = jest.spyOn(cartMock, 'isEmpty').mockReturnValueOnce(true);
    sut.checkout();
    expect(cartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('open');
  });

  it('should not checkout if cart is not empty', () => {
    const { sut, cartMock } = createSut();
    const cartMockSpy = jest.spyOn(cartMock, 'isEmpty').mockReturnValueOnce(false);
    sut.checkout();
    expect(cartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('closed');
  });

  it('should send email to customer', () => {
    const { sut, messagingMock } = createSut();
    const messagingMockSpy = jest.spyOn(messagingMock, 'sendMessaging');
    sut.checkout();
    expect(messagingMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should save order', () => {
    const { sut, persistencyMock } = createSut();
    const persistencyMockSpy = jest.spyOn(persistencyMock, 'saveOrder');
    sut.checkout();
    expect(persistencyMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear cart', () => {
    const { sut, cartMock } = createSut();
    const cartMockSpy = jest.spyOn(cartMock, 'clear');
    sut.checkout();
    expect(cartMockSpy).toHaveBeenCalledTimes(1);
  });
});
