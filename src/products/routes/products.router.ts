import { BaseRouter } from '../../shared/router/index.router'
import { ProductController } from '../controllers/products.controllers'
export class ProductRouter extends BaseRouter<ProductController> {
  constructor() {
    super(ProductController);
  }
  routes(): void{
    this.router.get('/products',(req,res) => {
      this.controller.getProduct(req, res)
    }
    )
    this.router.get('/product/:id',(req,res) => {
      this.controller.getProductById(req,res)
    }
    )
    this.router.post('/createProduct',(req,res) => {
      this.controller.createProduct(req,res)
    }
    )
    this.router.put('/updateProduct/:id',(req,res) => {
      this.controller.updateProduct(req,res)
    }
    )
    this.router.delete('/deleteProduct/:id',(req,res) => {
      this.controller.deleteProduct(req,res)
    }
    )
  }
}
