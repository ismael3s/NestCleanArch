import { User } from "../entities/User";

export interface IUserRepository {
  find(): Promise<User[]>;
  create(customer: User): Promise<void>;
}
