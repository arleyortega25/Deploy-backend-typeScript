import { RoleType } from "../../../src/user/dto/user.dto";

export const mockUser = {
  id: "any",
  email: "test@example.com",
  password: "hashed_password",
  role: RoleType.USER,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastname: "nobody",
  city: "new york",
  Department: "none",
  name: "jhon",
  username: "test",
};
