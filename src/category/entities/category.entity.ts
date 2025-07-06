import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ProductEntity } from "../../products/entities/products.entity";
@Entity({
  name: "category",
})
export class CategoryEntity extends BaseEntity {
  @Column()
  categoryName!: string;
  
  @OneToMany(()=> ProductEntity,(products)=>products.category)
  products!:ProductEntity[]
}
