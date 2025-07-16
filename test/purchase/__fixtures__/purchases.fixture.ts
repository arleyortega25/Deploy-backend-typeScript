import { UpdateResult } from "typeorm";
import { UserEntity } from "../../../src/user/entities/user.entity";
import { RoleType } from "../../../src/user/dto/user.dto";
import { CustomerDTO } from "../../../src/customer/dto/customer.dto";
import { CustomerEntity } from "../../../src/customer/entities/customer.entity";

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
const mockCustomer: CustomerEntity = {
  id: "customer123",
  createdAt: new Date(),
  updatedAt: new Date(),
  address: "street123",
  dni: 123456789,
  user: mockUser,
  purchases: [],
};

export const purchase = {
  id: "any",
  createdAt: new Date(),
  updatedAt: new Date(),
  status: "statusExample",
  paymentMethod: "paymentExample",
  customer: mockCustomer,
};
export const purchases = [
  {
    id: "any",
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "statusExample",
    paymentMethod: "paymentExample",
    customer: mockCustomer,
  },
];
export const mockUpdateResult: UpdateResult = {
  generatedMaps: [],
  raw: [],
  affected: 1,
};
