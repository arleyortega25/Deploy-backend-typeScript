import { createQueryBuilder, getRepository, Repository } from "typeorm";
import { UserEntity } from "../../src/user/entities/user.entity";
import { UserService } from "../../src/user/services/user.service";
import bcrypt from "bcrypt";
import { RoleType } from "../../src/user/dto/user.dto";
import {
  createdUser,
  dto,
  mockUpdateResult,
  users,
} from "./__fixtures__/user.fixture";
import { getMockRepository } from "../utils/mockRepository";

jest.mock("bcrypt");
jest.mock("../../src/config/data.source", () => ({
  AppDatasource: {
    isInitialized: true,
    initialize: jest.fn(),
    getRepository: jest.fn(),
  },
}));
const mockQueryBuilder = {
  leftJoinAndSelect: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  addSelect: jest.fn().mockReturnThis(),
  getOne: jest.fn(),
  getMany: jest.fn(),
};

describe("userService", () => {
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

  describe("findUserAll", () => {
    let userService: UserService;
    const mockRepo = getMockRepository<UserEntity>({
      find: jest.fn().mockResolvedValue(users),
    });
    beforeEach(() => {
      userService = new UserService();
      userService.execRepository = Promise.resolve(mockRepo);
    });
    test("should return all the users", async () => {
      const result = await userService.findUserAll();
      expect(mockRepo.find).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });
  describe("findUserById", () => {
    let userService: UserService;
    const mockRepo = getMockRepository<UserEntity>({
      findOne: jest.fn().mockResolvedValue(createdUser),
    });
    beforeEach(() => {
      userService = new UserService();
      userService.execRepository = Promise.resolve(mockRepo);
    });
    test("should return the user asigned with an id", async () => {
      const id = "any";
      const result = await userService.findUserById(id);
      expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result?.id).toEqual(id);
    });
  });
  describe("updateUser", () => {
    let userService: UserService;
    const mockRepo = getMockRepository<UserEntity>({
      update: jest.fn().mockResolvedValue(mockUpdateResult),
    });
    beforeEach(() => {
      userService = new UserService();
      userService.execRepository = Promise.resolve(mockRepo);
    });
    test("should update the user selected ", async () => {
      const id = "any";
      const result = await userService.updateUser(id, createdUser);
      expect(result.affected).toBe(1);
      expect(mockRepo.update).toHaveBeenCalledWith(id, createdUser);
    });
  });
  describe("deleteUser", () => {
    let userService: UserService;
    const mockRepo = getMockRepository<UserEntity>({
      delete: jest.fn().mockResolvedValue(mockUpdateResult),
    });
    beforeEach(() => {
      userService = new UserService();
      userService.execRepository = Promise.resolve(mockRepo);
    });
    test("should delete the user selected ", async () => {
      const id = "any";
      const result = await userService.deleteUser(id);
      expect(result.affected).toBe(1);
      expect(mockRepo.delete).toHaveBeenCalledWith({ id });
    });
  });
});
describe("query builders", () => {
  describe("findUserWithRelation", () => {
    let userService: UserService;
    const mockTypeOrm = {
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    };
    const repo = mockTypeOrm as unknown as Repository<UserEntity>;
    beforeEach(() => {
      userService = new UserService();
      userService.execRepository = Promise.resolve(repo);
    });
    test("should return user with relation", async () => {
      const id = "any";
      mockQueryBuilder.getOne.mockResolvedValue(createdUser);
      const result = await userService.findUserWithRelation(id);
      expect(mockTypeOrm.createQueryBuilder).toHaveBeenCalledWith("user");
      expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        "user.customer",
        "customer"
      );
      expect(mockQueryBuilder.where).toHaveBeenCalledWith({ id });
      expect(result).toEqual(createdUser);
    });
  });
  describe("findUserWithEmail", () => {
    let userService: UserService;
    const mockTypeOrm = {
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    };
    const repo = mockTypeOrm as unknown as Repository<UserEntity>;
    beforeEach(() => {
      userService = new UserService();
      userService.execRepository = Promise.resolve(repo);
    });
    test("should return the respective relation with the email", async () => {
      const email = "test@example.com";
      mockQueryBuilder.getOne.mockResolvedValue(createdUser);
      const result = await userService.findUserWithEmail(email);
      expect(mockTypeOrm.createQueryBuilder).toHaveBeenCalledWith("user");
      expect(mockQueryBuilder.addSelect).toHaveBeenCalledWith("user.password");
      expect(mockQueryBuilder.where).toHaveBeenCalledWith({
        email: "test@example.com",
      });
      expect(result).toEqual(createdUser);
    });
  });
  describe("findUserByUsername", () => {
    let userService: UserService;
    const mockTypeOrm = {
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    };
    const repo = mockTypeOrm as unknown as Repository<UserEntity>;
    beforeEach(() => {
      userService = new UserService();
      userService.execRepository = Promise.resolve(repo);
    });
    test("should return the respective relation with the username", async () => {
      const username = "test";
      mockQueryBuilder.getOne.mockResolvedValue(createdUser);
      const result = await userService.findUserByUsername(username);
      expect(mockTypeOrm.createQueryBuilder).toHaveBeenLastCalledWith("user");
      expect(mockQueryBuilder.addSelect).toHaveBeenCalledWith("user.password");
      expect(mockQueryBuilder.where).toHaveBeenCalledWith({ username });
      expect(result).toEqual(createdUser);
    });
  });
  describe("findUserByRole", () => {
    let userService: UserService;
    const mockTypeOrm = {
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    };
    const repo = mockTypeOrm as unknown as Repository<UserEntity>;
    beforeEach(() => {
      userService = new UserService();
      userService.execRepository = Promise.resolve(repo);
    });
    test("should return an user according to respective id and role ", async () => {
      let id = "any";
      let role = RoleType.USER;
      mockQueryBuilder.getOne.mockResolvedValue(createdUser);
      const result = await userService.findUserWithROle(id, role);
      expect(mockTypeOrm.createQueryBuilder).toHaveBeenCalledWith("user");
      expect(mockQueryBuilder.where).toHaveBeenCalledWith({ id });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith({
        role,
      });
      expect(result).toEqual(createdUser);
    });
  });
});
