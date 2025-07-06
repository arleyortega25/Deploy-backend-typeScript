import { NextFunction, Request, Response } from "express";
import { PurchaseProductDTO } from "../dto/purchase.product.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";

export class PurchaseProductMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  PurchaseProductValidator(req: Request, res: Response, next: NextFunction) {
    const { quantityProduct, totalPrice, purchase, product } = req.body;
    const valid = new PurchaseProductDTO();
    valid.quantityProduct = quantityProduct;
    valid.totalPrice = totalPrice;
    valid.purchase = purchase;
    valid.product = product;
    validate(valid).then((error) => {
      if (error.length > 0) {
        return this.httpResponse.InternalServerError(res, error);
      } else {
        next();
      }
    });
  }
}
