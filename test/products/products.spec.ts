import { Repository } from "typeorm";
import { ProductService } from "../../src/products/services/products.service";
import { ProductEntity } from "../../src/products/entities/products.entity";
import {
  mockUpdateResult,
  product,
  products,
} from "./__fixtures__/products.fixture";
import { getMockRepository } from "../utils/mockRepository";

jest.mock("../../src/config/data.source", () => ({
  AppDatasource: {
    isInitialized: true,
    initialize: jest.fn(),
    getRepository: jest.fn(),
  },
}));
describe("ProductService", () => {
  describe("createProduct", () => {
    let productService: ProductService;
    const mockRepo = getMockRepository<ProductEntity>({
      save: jest.fn().mockResolvedValue(product),
    });
    beforeEach(() => {
      productService = new ProductService();
      productService.execRepository = Promise.resolve(mockRepo);
    });
    test("should create a product", async () => {
      const result = await productService.createProduct(product);
      expect(mockRepo.save).toHaveBeenCalledWith(product);
      expect(result).toEqual(product);
    });
  });
  describe("findProductAll", () => {
    let productService: ProductService;
    const mockRepo = getMockRepository<ProductEntity>({
      find: jest.fn().mockResolvedValue(products),
    });

    beforeEach(() => {
      productService = new ProductService();
      productService.execRepository = Promise.resolve(mockRepo);
    });
    test("should return all the products", async () => {
      const result = await productService.findProductAll();
      expect(mockRepo.find).toHaveBeenCalled();
      expect(result).toEqual(products);
    });
  });
  describe("findProductById", () => {
    let productService: ProductService;
    const mockRepo = getMockRepository<ProductEntity>({
      findOne: jest.fn().mockResolvedValue(product),
    });
    beforeEach(() => {
      productService = new ProductService();
      productService.execRepository = Promise.resolve(mockRepo);
    });
    test("should return the product asigned with an id", async () => {
      const id = "any";
      const result = await productService.findProductById(id);
      expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result?.id).toBe(id);
    });
  });
  describe("updateProduct", () => {
    let productService: ProductService;
    const mockRepo = getMockRepository<ProductEntity>({
      update: jest.fn().mockResolvedValue(mockUpdateResult),
    });
    beforeEach(() => {
      productService = new ProductService();
      productService.execRepository = Promise.resolve(mockRepo);
    });
    test("should update the product selected ", async () => {
      const id = "any";
      const result = await productService.updateProduct(id, product);
      expect(result.affected).toBe(1);
      expect(mockRepo.update).toHaveBeenCalledWith(id, product);
    });
  });
  describe("deleteProduct", () => {
    let productService: ProductService;
    const mockRepo = getMockRepository<ProductEntity>({
      delete: jest.fn().mockResolvedValue(mockUpdateResult),
    });
    beforeEach(() => {
      productService = new ProductService();
      productService.execRepository = Promise.resolve(mockRepo);
    });
    test("should delete the product selected ", async () => {
      const id = "any";
      const result = await productService.deleteProduct(id);
      expect(result.affected).toBe(1);
      expect(mockRepo.delete).toHaveBeenCalledWith({ id });
    });
  });
});
