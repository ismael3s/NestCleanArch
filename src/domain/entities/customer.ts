export class Customer {
  id: number;
  email: string;

  constructor(email: string, id?: number) {
    this.id = id;
    this.email = email;
  }
}
