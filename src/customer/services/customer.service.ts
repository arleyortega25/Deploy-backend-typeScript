import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service' 
import {CustomerDTO } from '../dto/customer.dto';
import { CustomerEntity } from '../entities/customer.entity';
export class CustomerService extends BaseService<CustomerEntity>{
    constructor(){
        super(CustomerEntity)

    }
    async findCustomerAll():Promise<CustomerEntity[]>{
        return (await this.execRepository).find()
    }
    async findCustomerById(id: string):Promise<CustomerEntity | null>{
        return (await this.execRepository).findOne({where:{id}})

    }
    async createCustomer(body:CustomerDTO): Promise<CustomerEntity>{
        const newUser = (await this.execRepository).create(body);
        return (await this.execRepository).save(newUser)
        
    }
    async deleteCustomer(id: string):Promise<DeleteResult>{
        return (await this.execRepository).delete({id})
    }
    async updateCustomer(id: string,infoUpdate:CustomerDTO):Promise<UpdateResult>{
        return (await this.execRepository).update(id,infoUpdate)
    }

}