import { ObjectLiteral, Repository } from "typeorm";

export function getMockRepository<T extends ObjectLiteral>(mock: any): Repository<T> {
  return mock as Repository<T>;
}