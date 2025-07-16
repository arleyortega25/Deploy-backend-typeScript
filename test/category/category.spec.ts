import { ObjectLiteral, Repository } from "typeorm";
import { CategoryService } from "../../src/category/services/category.service";
import { CategoryEntity } from "../../src/category/entities/category.entity";
import {
  mockCategories,
  mockCategory,
  mockUpdateResult,
} from "./__fixtures__/category.fixtures";

import { getMockRepository } from "../utils/mockRepository";

jest.mock("../../src/config/data.source", () => ({
  AppDatasource: {
    isInitialized: true,
    initialize: jest.fn(),
    getRepository: jest.fn(),
  },
}));
describe("categoryService", () => {
  describe("createCategory", () => {
    let categoryService: CategoryService;
    const mockRepo = getMockRepository<CategoryEntity>({
      create: jest.fn().mockReturnValue(mockCategory),
      save: jest.fn().mockResolvedValue(mockCategory),
    });

    beforeEach(() => {
      categoryService = new CategoryService();
      categoryService.execRepository = Promise.resolve(mockRepo);
    });
    test("should create a category", async () => {
      const result = await categoryService.createCategory(mockCategory);
      expect(mockRepo.save).toHaveBeenCalledWith(mockCategory);
      expect(result).toEqual(mockCategory);
    });
  });
  describe("findCategoryAll", () => {
    let categoryService: CategoryService;
    const mockRepo = getMockRepository<CategoryEntity>({
      find: jest.fn().mockReturnValue(mockCategories),
    });

    beforeEach(() => {
      categoryService = new CategoryService();
      categoryService.execRepository = Promise.resolve(mockRepo);
    });
    test("should return all the categories", async () => {
      const result = await categoryService.findCategoryAll();
      expect(mockRepo.find).toHaveBeenCalled();
      expect(result).toEqual(mockCategories);
    });
  });
  describe("findCategoryById", () => {
    let categoryService: CategoryService;
    const mockRepo = getMockRepository<CategoryEntity>({
      findOne: jest.fn().mockResolvedValue(mockCategory),
    });

    beforeEach(() => {
      categoryService = new CategoryService();
      categoryService.execRepository = Promise.resolve(mockRepo);
    });
    test("should return the category asigned with an id", async () => {
      const id = "any";
      const result = await categoryService.findCategoryById(id);
      expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result?.id).toBe(id);
    });
  });
  describe("updateCategory", () => {
    let categoryService: CategoryService;
    const mockRepo = getMockRepository<CategoryEntity>({
      update: jest.fn().mockResolvedValue(mockUpdateResult),
    });
    beforeEach(() => {
      categoryService = new CategoryService();
      categoryService.execRepository = Promise.resolve(mockRepo);
    });
    test("should update the category selected ", async () => {
      const id = "any";
      const result = await categoryService.updateCategory(id, mockCategory);
      expect(result.affected).toBe(1);
      expect(mockRepo.update).toHaveBeenCalledWith(id, mockCategory);
    });
  });
  describe("deleteCategory", () => {
    let categoryService: CategoryService;
    const mockRepo = getMockRepository<CategoryEntity>({
      delete: jest.fn().mockResolvedValue(mockUpdateResult),
    });

    beforeEach(() => {
      categoryService = new CategoryService();
      categoryService.execRepository = Promise.resolve(mockRepo);
    });
    test("should delete the category selected ", async () => {
      const id = "any";
      const result = await categoryService.deleteCategory(id);
      expect(result.affected).toBe(1);
      expect(mockRepo.delete).toHaveBeenCalledWith({ id });
    });
  });
});
