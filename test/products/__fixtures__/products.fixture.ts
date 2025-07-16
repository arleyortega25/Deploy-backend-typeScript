import { UpdateResult } from "typeorm";

export const product = {
  id: "any",
  createdAt: new Date(),
  updatedAt: new Date(),
  productname: "productExample",
  price: 2000,
  description: "descriptionExample",
};
export const products = [
  {
    id: "any",
    createdAt: new Date(),
    updatedAt: new Date(),
    productname: "productExample",
    price: 2000,
    description: "descriptionExample",
  },
];
export const mockUpdateResult: UpdateResult = {
  generatedMaps: [],
  raw: [],
  affected: 1,
};
