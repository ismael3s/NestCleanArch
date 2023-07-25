export class User {
  id: number;
  email: string;
  name: string;
  passwordHash?: string;

  constructor({
    id,
    email,
    name,
    password,
  }: {
    id?: number;
    email: string;
    name: string;
    password: string;
  }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.passwordHash = password;
  }
}
