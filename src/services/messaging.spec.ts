import { Messaging } from './messaging';

const createSut = () => new Messaging();

describe('Messaging', () => {
  afterEach(() => jest.clearAllMocks());

  it('should messaging', () => {
    const sut = createSut();
    expect(sut.sendMessaging('teste')).toBeUndefined();
  });

  it('should call console.log once', () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMessaging('teste');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  it('should call console.log with "mensagem enviada:" and msg', () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMessaging('teste');
    expect(consoleSpy).toHaveBeenCalledWith('mensagem enviada:', 'teste');
  });
});
