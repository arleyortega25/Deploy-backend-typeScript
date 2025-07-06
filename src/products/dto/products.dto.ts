import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class ProductDTO extends BaseDTO {
    @IsNotEmpty()
    productname!: string;
    @IsNotEmpty()
    price!: number;
    @IsNotEmpty()
    description!: string
  
}
