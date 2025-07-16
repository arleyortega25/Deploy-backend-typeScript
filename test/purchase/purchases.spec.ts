import { Repository } from "typeorm";
import { PurchaseService } from "../../src/purchase/services/purchase.service";
import { PurchaseEntity } from "../../src/purchase/entities/purchase.entity";
import {
  mockUpdateResult,
  purchase,
  purchases,
} from "./__fixtures__/purchases.fixture";
import { getMockRepository } from "../utils/mockRepository";

jest.mock("../../src/config/data.source", () => ({
  AppDatasource: {
    isInitialized: true,
    initialize: jest.fn(),
    getRepository: jest.fn(),
  },
}));
describe("purchaseService", () => {
  describe("createPurchase", () => {
    let purchaseService: PurchaseService;
    const mockRepo = getMockRepository<PurchaseEntity>({
      save: jest.fn().mockResolvedValue(purchase),
    });
    beforeEach(() => {
      purchaseService = new PurchaseService();
      purchaseService.execRepository = Promise.resolve(mockRepo);
    });
    test("should create a purchase", async () => {
      const result = await purchaseService.createPurchase(purchase);
      expect(mockRepo.save).toHaveBeenCalledWith(purchase);
      expect(result).toEqual(purchase);
    });
  });
  describe("findPurchaseAll", () => {
    let purchaseService: PurchaseService;
    const mockRepo = getMockRepository<PurchaseEntity>({
      find: jest.fn().mockResolvedValue(purchases),
    });
    beforeEach(() => {
      purchaseService = new PurchaseService();
      purchaseService.execRepository = Promise.resolve(mockRepo);
    });
    test("should return all the purchases", async () => {
      const result = await purchaseService.findPurchaseAll();
      expect(mockRepo.find).toHaveBeenCalled();
      expect(result).toEqual(purchases);
    });
  });
  describe("findPurchasesById", () => {
    let purchaseService: PurchaseService;
    const mockRepo = getMockRepository<PurchaseEntity>({
      findOne: jest.fn().mockResolvedValue(purchase),
    });
    beforeEach(() => {
      purchaseService = new PurchaseService();
      purchaseService.execRepository = Promise.resolve(mockRepo);
    });
    test("should return the purchase asigned with an id", async () => {
      const id = "any";
      const result = await purchaseService.findPurchaseById(id);
      expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result?.id).toBe(id);
    });
  });
  describe("updatePurchase", () => {
    let purchaseService: PurchaseService;
    const mockRepo = getMockRepository<PurchaseEntity>({
      update: jest.fn().mockResolvedValue(mockUpdateResult),
    });
    beforeEach(() => {
      purchaseService = new PurchaseService();
      purchaseService.execRepository = Promise.resolve(mockRepo);
    });
    test("should update the purchase selected ", async () => {
      const id = "any";
      const result = await purchaseService.updatePurchase(id, purchase);
      expect(result.affected).toBe(1);
      expect(mockRepo.update).toHaveBeenCalledWith(id, purchase);
    });
  });
  describe("deletePurchase", () => {
    let purchaseService: PurchaseService;
    const mockRepo = getMockRepository<PurchaseEntity>({
      delete: jest.fn().mockResolvedValue(mockUpdateResult),
    });
    beforeEach(() => {
      purchaseService = new PurchaseService();
      purchaseService.execRepository = Promise.resolve(mockRepo);
    });
    test("should delete the purchase selected ", async () => {
      const id = "any";
      const result = await purchaseService.deletePurchase(id);
      expect(result.affected).toBe(1);
      expect(mockRepo.delete).toHaveBeenCalledWith({ id });
    });
  });
});
