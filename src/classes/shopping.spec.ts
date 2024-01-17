/* eslint-disable no-empty-function */
import { ShoppingCart } from './shopping';
import { Discount } from './discount';
import { CartItem } from './interfaces/cart-item';

const createDescountMock = () => {
  class DescountMock extends Discount {}
  return new DescountMock();
};

const createSut = () => {
  const discountMock = createDescountMock();
  const sut = new ShoppingCart(discountMock);
  return { sut, discountMock };
};

const createCartItemMock = (name: string, price: number) => {
  class CartItemMock implements CartItem {
    constructor(public name: string, public price: number) {}
  }

  return new CartItemMock(name, price);
};

const createSutWithProduct = () => {
  const { sut, discountMock } = createSut();
  const cartItem1 = createCartItemMock('Xbox S', 3300);
  const cartItem2 = createCartItemMock('Iphone 15', 10000);
  sut.addItem(cartItem1);
  sut.addItem(cartItem2);
  return { sut, discountMock };
};

describe('Shopping Cart', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have items', () => {
    const { sut } = createSut();
    expect(sut).toHaveProperty('_items');
  });

  it('should be a empty cart when no product is added', () => {
    const { sut } = createSut();
    expect(sut.isEmpty()).toBeTruthy();
  });

  it('should have two cart items', () => {
    const { sut } = createSutWithProduct();
    expect(sut.items.length).toBe(2);
  });

  it('should test total and totalWithDiscount', () => {
    const { sut } = createSutWithProduct();
    expect(sut.total()).toBe(13300);
    expect(sut.totalWithDiscount()).toBe(13300);
  });

  it('should add product and clear cart', () => {
    const { sut } = createSutWithProduct();
    expect(sut.items.length).toBe(2);
    sut.clear();
    expect(sut.items.length).toBe(0);
  });

  it('should call discount.calculate() when once totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithProduct();
    const discountMockSpy = jest.spyOn(discountMock, 'calculate');
    sut.totalWithDiscount();
    expect(discountMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should call discount.calculate with total price when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithProduct();
    const discountMockSpy = jest.spyOn(discountMock, 'calculate');
    sut.totalWithDiscount();
    expect(discountMockSpy).toHaveBeenCalledWith(sut.total());
  });
});
