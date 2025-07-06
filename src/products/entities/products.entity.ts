import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { CategoryEntity } from "../../category/entities/category.entity";
import { PurchaseProductEntity } from "../../purchase/entities/purchases.products.entity";
@Entity({
  name: "products",
})
export class ProductEntity extends BaseEntity {
  @Column()
  productname!: string;
  @Column()
  price!: number;
  @Column()
  description!: string
  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: "category_id" })
  category!: CategoryEntity;
  @OneToMany(()=>PurchaseProductEntity,(purchaseProduct)=>purchaseProduct.product)
  purchaseProduct!:PurchaseProductEntity[]
  
}
