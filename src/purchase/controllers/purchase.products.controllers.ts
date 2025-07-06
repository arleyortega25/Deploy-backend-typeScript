import { Request, Response } from "express";
import { PurchaseProductService } from "../services/purchase.products.service";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";
export class PurchaseProductController {
  constructor(
    private readonly purchaseProductService: PurchaseProductService = new PurchaseProductService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  async getPurchaseProduct(req: Request, res: Response) {
    try {
      const data = await this.purchaseProductService.findPurchaseProductAll();
      if (data.length === 0) {
        return this.httpResponse.NotFound(res,'data not exist')
      }

      return this.httpResponse.Ok(res,data)
    } catch (error) {
      return this.httpResponse.InternalServerError(res,error)
    }
  }
  async getPurchaseProductById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseProductService.findPurchaseProductById(id);
      if (!data) {
        return this.httpResponse.NotFound(res,'data not exist')
      }
      return this.httpResponse.Ok(res,data)
    } catch (error) {
      return this.httpResponse.InternalServerError(res,error)
    }
  }
  async createPurchaseProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseProductService.createPurchaseProduct(req.body);
      return this.httpResponse.Ok(res,data)
    } catch (error) {
      return this.httpResponse.InternalServerError(res,error)
    }
  }
  async updatePurchaseProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data:UpdateResult = await this.purchaseProductService.updatePurchaseProduct(id, req.body);
      if (!data.affected) {
        return this.httpResponse.NotFound(res,'Error in update')
      }
      return this.httpResponse.Ok(res,data)
    } catch (error) {
      return this.httpResponse.InternalServerError(res,error)
    }
  }
  async deletePurchaseProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data:DeleteResult = await this.purchaseProductService.deletePurchaseProduct(id);
      if (!data.affected) {
        return this.httpResponse.NotFound(res,'Error in delete')
      }
      return this.httpResponse.Ok(res,data)
    } catch (error) {
      console.error(error);
      return this.httpResponse.InternalServerError(res,error)
    }
  }
}
