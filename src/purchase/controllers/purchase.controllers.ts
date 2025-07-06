import { Request, Response } from "express";
import { PurchaseService } from "../services/purchase.service";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";
export class PurchaseController {
  constructor(
    private readonly purchaseService: PurchaseService = new PurchaseService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  async getPurchases(req: Request, res: Response) {
    try {
      const data = await this.purchaseService.findPurchaseAll();
      if (data.length === 0) {
        return this.httpResponse.NotFound(res,'data not exist')
      }

      return this.httpResponse.Ok(res,data)
    } catch (error) {
      return this.httpResponse.InternalServerError(res,error)
    }
  }
  async getPurchaseById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseService.findPurchaseById(id);
      if (!data) {
        return this.httpResponse.NotFound(res,'data not exist')
      }
      return this.httpResponse.Ok(res,data)
    } catch (error) {
      return this.httpResponse.InternalServerError(res,error)
    }
  }
  async createPurchase(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.purchaseService.createPurchase(req.body);
      return this.httpResponse.Ok(res,data)
    } catch (error) {
      return this.httpResponse.InternalServerError(res,error)
    }
  }
  async updatePurchase(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data:UpdateResult = await this.purchaseService.updatePurchase(id, req.body);
      if (!data.affected) {
        return this.httpResponse.NotFound(res,'Error in update')
      }
      return this.httpResponse.Ok(res,data)
    } catch (error) {
      return this.httpResponse.InternalServerError(res,error)
    }
  }
  async deletePurchase(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data:DeleteResult = await this.purchaseService.deletePurchase(id);
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
