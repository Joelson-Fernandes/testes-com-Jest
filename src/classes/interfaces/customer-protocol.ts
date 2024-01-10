export interface CustomerOrder {
  getName(): string,
  getIDM(): string,
}

export interface IndividualCustomerProtocol {
  name: string,
  lastName: string,
  cpf: string,
}

export interface EnterpriseCustomerProtocol {
  name: string,
  cnpj: string,
}
