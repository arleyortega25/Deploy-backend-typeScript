import { NextFunction, Request, Response } from "express";
import { CategoryDTO } from "../dto/category.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";

export class CategoryMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  CategoryValidator(req: Request, res: Response, next: NextFunction) {
    const { categoryName } = req.body;
    const valid = new CategoryDTO();
    valid.categoryName = categoryName;
    
    validate(valid).then((error) => {
      if (error.length > 0) {
        return this.httpResponse.InternalServerError(res, error);
      } else {
        next();
      }
    });
  }
}
