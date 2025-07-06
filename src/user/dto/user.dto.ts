import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class UserDTO extends BaseDTO {
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  lastname!: string;

  @IsNotEmpty()
  city!: string;

  @IsNotEmpty()
  Department!: string;

  @IsNotEmpty()
  email!: string;

  
  @IsNotEmpty()
  password!: string;
  @IsNotEmpty()
  role!:RoleType
}
export enum RoleType{
  USER="USER",
  CUSTOMER="CUSTOMER",
  ADMIN="ADMIN" 
}
