import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../../config/base.service' 
import { ProductEntity } from '../entities/products.entity';
import { ProductDTO } from '../dto/products.dto';
export class ProductService extends BaseService<ProductEntity>{
    constructor(){
        super(ProductEntity)

    }
    async findProductAll():Promise<ProductEntity[]>{
        return (await this.execRepository).find()
    }
    async findProductById(id: string):Promise<ProductEntity | null>{
        return (await this.execRepository).findOne({where:{id}})

    }
    async createProduct(body:ProductDTO): Promise<ProductEntity>{
        return (await this.execRepository).save(body)
    }
    async deleteProduct(id: string):Promise<DeleteResult>{
        return (await this.execRepository).delete({id})
    }
    async updateProduct(id: string,infoUpdate:ProductDTO):Promise<UpdateResult>{
        return (await this.execRepository).update(id,infoUpdate)
    }

}