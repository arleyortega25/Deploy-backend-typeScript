import { Request, Response } from "express";
import { CustomerService} from '../services/customer.service'
import { HttpResponse } from "../../shared/response/http.response";
export class CustomerController {
  constructor(private readonly customerService: CustomerService = new CustomerService(),private readonly httResponse: HttpResponse = new HttpResponse()) {}
  async getCustomer(req: Request, res: Response) {
    try {
      const data = await this.customerService.findCustomerAll;
      if (data.length === 0) {
        return  this.httResponse.NotFound(res,'data not exist')
      }

      return this.httResponse.Ok(res,data)
    } catch (error) {
      return this.httResponse.InternalServerError(res,error)
      console.error(error);
    }
  }
  async getCustomerById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.customerService.findCustomerById(id);
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }
  async createCustomer(req: Request, res: Response) {
    
    try {
      const data = await this.customerService.createCustomer(req.body);
      return this.httResponse.Ok(res,data)
      
    } catch (error) {
      console.error(error);
      return this.httResponse.InternalServerError(res,error)
    }
  }
  async updateCustomer(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.customerService.updateCustomer(id,req.body)
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }
  async deleteCustomer(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.customerService.deleteCustomer(id)
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
    }
  }
}
