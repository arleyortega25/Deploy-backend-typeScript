import { Column, Entity, Exclusion, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { RoleType } from "../dto/user.dto";
@Entity({
  name: "user",
})
export class UserEntity extends BaseEntity {
  @Column()
  username!: string;
  @Column()
  name!: string;
  @Column()
  lastname!: string;
  @Column()
  city!: string;
  @Column()
  Department!: string;
  @Column()
  email!: string;
  
  @Column()
  password!: string;
  @Column({type:"enum", enum:RoleType,nullable:false})
  role!:RoleType
  @OneToOne(() => CustomerEntity, (customer) => customer.user)
  customer?: CustomerEntity;
}
