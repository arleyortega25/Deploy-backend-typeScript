import { Request, Response } from "express";
import {CategoryService} from '../services/category.service'
import { HttpResponse } from "../../shared/response/http.response";
export class CategoryController {
  constructor(private readonly categoryService: CategoryService = new CategoryService(),private readonly httResponse: HttpResponse = new HttpResponse()) {}
  async getCategory(req: Request, res: Response) {
    try {
      const data = await this.categoryService.findCategoryAll();
      if (data.length === 0) {
        return  this.httResponse.NotFound(res,'data not exist')
      }

      return this.httResponse.Ok(res,data)
    } catch (error) {
      return this.httResponse.InternalServerError(res,error)
      console.error(error);
    }
  }
  async getCategoryById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.findCategoryById(id);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }
  async createCategory(req: Request, res: Response) {
    
    try {
      const data = await this.categoryService.createCategory(req.body);
      return this.httResponse.Ok(res,data)
      
    } catch (error) {
      console.error(error);
      return this.httResponse.InternalServerError(res,error)
    }
  }
  async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.updateCategory(id,req.body)
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }
  async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.deleteCategory(id)
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }
}
