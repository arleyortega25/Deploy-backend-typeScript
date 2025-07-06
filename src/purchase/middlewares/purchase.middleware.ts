import { NextFunction, Request, Response } from "express";
import { PurchaseDTO } from "../dto/purchase.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";

export class PurchaseMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  PurchaseValidator(req: Request, res: Response, next: NextFunction) {
    const { status, paymentMethod, customer } = req.body;
    const valid = new PurchaseDTO();
    valid.status = status;
    valid.paymentMethod = paymentMethod;
    valid.customer = customer;
    validate(valid).then((error) => {
      if (error.length > 0) {
        return this.httpResponse.InternalServerError(res, error);
      } else {
        next();
      }
    });
  }
}
