import { BaseRouter } from '../../shared/router/index.router'
import { CategoryController } from '../controllers/category.controllers'
import { CategoryMiddleware } from '../middlewares/category.middleware';
export class CategoryRouter extends BaseRouter<CategoryController,CategoryMiddleware> {
  constructor() {
    super(CategoryController,CategoryMiddleware);
  }
  routes(): void{
    this.router.get('/category',(req,res) => {
      this.controller.getCategory(req, res)
    }
    )
    this.router.get('/category/:id',(req,res) => {
      this.controller.getCategoryById(req,res)
    }
    )
    this.router.post('/createCategory',(req,res,next)=> this.middleware.CategoryValidator(req,res,next),(req,res) => {
      this.controller.createCategory(req,res)
    }
    )
    this.router.put('/updateCategory/:id',(req,res) => {
      this.controller.updateCategory(req,res)
    }
    )
    this.router.delete('/deleteCategory/:id',(req,res) => {
      this.controller.deleteCategory(req,res)
    }
    )
  }
}