import {
  Discount, FiftyPercentDiscount, TenPercentDiscount, NoDiscount,
} from './discount';

const createSut = (ClassName: new () => Discount): Discount => new ClassName();

describe('Discount', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have no descount', () => {
    const sut = createSut(NoDiscount);
    expect(sut.calculate(10.99)).toBeCloseTo(10.99);
  });

  it('should apply 50% discount on price', () => {
    const sut = createSut(FiftyPercentDiscount);
    expect(sut.calculate(150)).toBeCloseTo(75);
  });

  it('should apply 10% discount on price', () => {
    const sut = createSut(TenPercentDiscount);
    expect(sut.calculate(100)).toBeCloseTo(90);
  });
});
