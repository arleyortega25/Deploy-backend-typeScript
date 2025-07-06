import { NextFunction, Request, Response } from "express";
import { ProductDTO } from "../dto/products.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";

export class ProductMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  ProductValidator(req: Request, res: Response, next: NextFunction) {
    const { productname, price, description } = req.body;
    const valid = new ProductDTO();
    valid.productname = productname;
    valid.price = price;
    valid.description = description;

    validate(valid).then((error) => {
      if (error.length > 0) {
        return this.httpResponse.InternalServerError(res, error);
      } else {
        next();
      }
    });
  }
}
