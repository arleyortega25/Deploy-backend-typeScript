import { Repository } from "typeorm";
import { CustomerService } from "../../src/customer/services/customer.service";
import { CustomerEntity } from "../../src/customer/entities/customer.entity";
import {
  customerDto,
  customers,
  mockCustomer,
  mockUpdateResult,
} from "./__fixtures__/customers.fixutres";
import { getMockRepository } from "../utils/mockRepository";

jest.mock("../../src/config/data.source", () => ({
  AppDatasource: {
    isInitialized: true,
    initialize: jest.fn(),
    getRepository: jest.fn(),
  },
}));
describe("customerService", () => {
  describe("createCustomer", () => {
    let customerService: CustomerService;
    const mockRepo = getMockRepository<CustomerEntity>({
      save: jest.fn().mockResolvedValue(mockCustomer),
      create: jest.fn().mockReturnValue(mockCustomer),
    });

    beforeEach(() => {
      customerService = new CustomerService();
      customerService.execRepository = Promise.resolve(mockRepo);
    });
    test("should create a customer", async () => {
      const result = await customerService.createCustomer(customerDto);
      expect(mockRepo.save).toHaveBeenCalledWith(mockCustomer);
      expect(result).toEqual(mockCustomer);
    });
  });
  describe("findCustomersAll", () => {
    let customerService: CustomerService;
    const mockRepo = getMockRepository<CustomerEntity>({
      find: jest.fn().mockResolvedValue(customers),
    });

    beforeEach(() => {
      customerService = new CustomerService();
      customerService.execRepository = Promise.resolve(mockRepo);
    });
    test("should return all the customers", async () => {
      const result = await customerService.findCustomerAll();
      expect(mockRepo.find).toHaveBeenCalled();
      expect(result).toEqual(customers);
    });
  });
  describe("findCustomerById", () => {
    let customerService: CustomerService;
    const mockRepo = getMockRepository<CustomerEntity>({
      findOne: jest.fn().mockResolvedValue(mockCustomer),
    });

    beforeEach(() => {
      customerService = new CustomerService();
      customerService.execRepository = Promise.resolve(mockRepo);
    });
    test("should return the Customer asigned with an id", async () => {
      const id = "any";

      const result = await customerService.findCustomerById(id);
      expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result?.id).toBe(id);
    });
  });
  describe("updateCustomer", () => {
    let customerService: CustomerService;
    const mockRepo = getMockRepository<CustomerEntity>({
      update: jest.fn().mockResolvedValue(mockUpdateResult),
    });

    beforeEach(() => {
      customerService = new CustomerService();
      customerService.execRepository = Promise.resolve(mockRepo);
    });
    test("should update the Customer selected ", async () => {
      const id = "any";
      const result = await customerService.updateCustomer(id, customerDto);
      expect(result.affected).toBe(1);
      expect(mockRepo.update).toHaveBeenCalledWith(id, customerDto);
    });
  });
  describe("deleteCustomer", () => {
    let customerService: CustomerService;
    const mockRepo = getMockRepository<CustomerEntity>({
      delete: jest.fn().mockResolvedValue(mockUpdateResult),
    });
    beforeEach(() => {
      customerService = new CustomerService();
      customerService.execRepository = Promise.resolve(mockRepo);
    });
    test("should delete the Customer selected ", async () => {
      const id = "any";
      const result = await customerService.deleteCustomer(id);
      expect(result.affected).toBe(1);
      expect(mockRepo.delete).toHaveBeenCalledWith({ id });
    });
  });
});
