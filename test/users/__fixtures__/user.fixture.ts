import { Repository, UpdateResult } from "typeorm";
import { RoleType } from "../../../src/user/dto/user.dto";
import { UserEntity } from "../../../src/user/entities/user.entity";


export const dto = {
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
export const createdUser = { ...dto };
export const users: UserEntity[] = [
  {
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
  },
];
export const mockUpdateResult: UpdateResult = {
  generatedMaps: [],
  raw: [],
  affected: 1,
};
