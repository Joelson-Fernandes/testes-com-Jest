import { EnterpriseCustomer, IndividualCustomer } from './customer';

describe('Enterprise Customer', () => {
  const sut = new EnterpriseCustomer('empresa', '2136547895');

  it('should have name, CNPJ', () => {
    expect(sut).toHaveProperty('name', 'empresa');
    expect(sut).toHaveProperty('cnpj', '2136547895');
  });

  it('should return enterprise name', () => {
    expect(sut.getName()).toBe('empresa');
  });

  it('should return enterprise CNPJ', () => {
    expect(sut.getIDM()).toBe('2136547895');
  });
});

describe('IndividualCustomer', () => {
  const sut = new IndividualCustomer('joelson', 'fernandes', '2136547895');

  it('should have name, lastname, cpf', () => {
    expect(sut).toHaveProperty('name', 'joelson');
    expect(sut).toHaveProperty('lastName', 'fernandes');
    expect(sut).toHaveProperty('cpf', '2136547895');
  });

  it('should return person name', () => {
    expect(sut.getName()).toBe('joelson');
  });

  it('should return person cpf', () => {
    expect(sut.getIDM()).toBe('2136547895');
  });
});
