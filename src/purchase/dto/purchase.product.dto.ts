import { IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { PurchaseEntity } from "../entities/purchase.entity";
import { ProductEntity } from "../../products/entities/products.entity";

export class PurchaseProductDTO extends BaseDTO {
    @IsNotEmpty()
    quantityProduct!: number;
    @IsOptional()
    totalPrice?: number;
    @IsOptional()
    purchase?:PurchaseEntity
    @IsOptional()
    product?:ProductEntity
}
