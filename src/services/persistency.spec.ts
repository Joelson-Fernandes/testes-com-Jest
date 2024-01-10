describe('Testando alguma coisa', () => {
  it('Descrição do teste (it)', () => {
    const number = 1;
    expect(number).toBe(1);
  });
});

describe('Testando outra coisa', () => {
  test('Descrição do teste (test)', () => {
    const number = 2;
    expect(number).not.toBe(1);
  });
});
