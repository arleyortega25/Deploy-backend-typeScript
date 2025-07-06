import { BaseRouter } from "../../shared/router/index.router";
import { PurchaseProductController } from "../controllers/purchase.products.controllers";
import { PurchaseProductMiddleware } from "../middlewares/purchase.products.middleware";
export class PurchaseProductRouter extends BaseRouter<PurchaseProductController,PurchaseProductMiddleware> {
  constructor() {
    super(PurchaseProductController,PurchaseProductMiddleware);
  }
  routes(): void{
    this.router.get('/purchaseProducts',(req,res) => {
      this.controller.getPurchaseProduct(req, res)
    }
    )
    this.router.get('/purchaseProducts/:id',(req,res) => {
      this.controller.getPurchaseProductById(req,res)
    }
    )
    this.router.post('/createPurchaseProduct',(req,res,next)=>this.middleware.PurchaseProductValidator(req,res,next),(req,res) => {
      this.controller.createPurchaseProduct(req,res)
    }
    )
    this.router.put('/updatePurchaseProduct/:id',(req,res) => {
      this.controller.updatePurchaseProduct(req,res)
    }
    )
    this.router.delete('/deletePurchaseProduct/:id',(req,res) => {
      this.controller.deletePurchaseProduct(req,res)
    }
    )
  }
}