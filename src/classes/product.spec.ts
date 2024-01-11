import { Product } from './product';

const createSut = (name: string, price: number): Product => new Product(name, price);

describe('Product', () => {
  afterEach(() => jest.clearAllMocks());

  it('product', () => {
    const sut = createSut('camiseta', 89.90);
    expect(sut).toHaveProperty('name', 'camiseta');
    expect(sut.price).toBeCloseTo(89.90);
  });
});
