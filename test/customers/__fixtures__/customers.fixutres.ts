import { UpdateResult } from "typeorm";
import { CustomerDTO } from "../../../src/customer/dto/customer.dto";
import { CustomerEntity } from "../../../src/customer/entities/customer.entity";
import { RoleType } from "../../../src/user/dto/user.dto";
import { UserEntity } from "../../../src/user/entities/user.entity";

const mockUser: UserEntity = {
  id: "any",
  createdAt: new Date(),
  updatedAt: new Date(),
  email: "test@example.com",
  username: "test",
  password: "testpassword",
  role: RoleType.USER,
  name: "jhon",
  lastname: "nobody",
  city: "new york",
  Department: "none",
};
export const mockCustomer: CustomerEntity = {
  id: "any",
  createdAt: new Date(),
  updatedAt: new Date(),
  address: "street123",
  dni: 123456789,
  user: mockUser,
  purchases: [],
};
export const customerDto: CustomerDTO = {
  id: "any",
  createdAt: new Date(),
  updatedAt: new Date(),
  address: "street123",
  dni: 123456789,
  user: mockUser,
};
export const customers: CustomerEntity[] = [{
  id: "customer123",
  createdAt: new Date(),
  updatedAt: new Date(),
  address: "street123",
  dni: 123456789,
  user: mockUser,
  purchases: [],
}];
export const mockUpdateResult: UpdateResult = {
  generatedMaps: [],
  raw: [],
  affected: 1,
};
