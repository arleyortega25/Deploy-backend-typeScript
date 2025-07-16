import { UpdateResult } from "typeorm";
import { CategoryDTO } from "../../../src/category/dto/category.dto";

export const mockCategory: CategoryDTO = {
  id: "any",
  createdAt: new Date(),
  updatedAt: new Date(),
  categoryName: "categoryExample",
};

export const mockCategories: CategoryDTO[] = [
  {
    id: "any",
    createdAt: new Date(),
    updatedAt: new Date(),
    categoryName: "categoryExample",
  },
];
export const mockUpdateResult: UpdateResult = {
  generatedMaps: [],
  raw: [],
  affected: 1,
};
