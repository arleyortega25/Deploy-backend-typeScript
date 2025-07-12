import { getRepository, Repository } from "typeorm";
import { UserEntity } from "../../src/user/entities/user.entity";
import { UserService } from "../../src/user/services/user.service";
import bcrypt from "bcrypt";
import { RoleType } from "../../src/user/dto/user.dto";

jest.mock("bcrypt");
jest.mock("../../src/config/data.source", () => ({
  AppDatasource: {
    isInitialized: true,
    initialize: jest.fn(),
    getRepository: jest.fn(),
  },
}));

describe("createUser", () => {
  let userService: UserService;
  const mockTypeOrm = {
    create: jest.fn(),
    save: jest.fn(),
  };
  const repo = mockTypeOrm as unknown as Repository<UserEntity>;
  beforeEach(() => {
    userService = new UserService();
    userService.execRepository = Promise.resolve(repo);
  });
  test("should hash password and save user", async () => {
    const dto = {
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
    const createdUser = { ...dto };
    mockTypeOrm.create.mockReturnValue(createdUser);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashed_password");
    mockTypeOrm.save.mockResolvedValue({
      ...createdUser,
      password: "hashed_password",
    });
    const result = await userService.createUser(dto);
    expect(mockTypeOrm.create).toHaveBeenCalledWith(dto);
    expect(bcrypt.hash).toHaveBeenCalledWith("testpassword", 10);
    expect(mockTypeOrm.save).toHaveBeenCalledWith({
      ...createdUser,
      password: "hashed_password",
    });
    expect(result.password).toBe("hashed_password");
  });
});
