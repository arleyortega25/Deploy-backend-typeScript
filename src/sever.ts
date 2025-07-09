import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { UserRouter } from "./user/user.router";
import { ConfigServer } from "./config/config";
import { CategoryRouter } from "./category/routes/category.routes";
import { PurchaseRouter } from "./purchase/router/purchase.router";
import { ProductRouter } from "./products/routes/products.router";
import { PurchaseProductRouter } from "./purchase/router/purchase.products";
import { CustomerRouter } from "./customer/routes/customer.routes";
import { LoginStrategy } from "./auth/strategies/login.strategy";
import { JwtStrategy } from "./auth/strategies/jwt.strategy";
import { AuthRouter } from "./auth/routers/auth.router";

class ServerBoostrap extends ConfigServer {
  public app: express.Application = express();
  private port: number = this.getNumber("PORT");
  constructor() {
    super();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.passportUse();
    this.dbConnect();
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use("/api", this.routers());
    this.listen();
  }
  passportUse() {
    return [new LoginStrategy().use, new JwtStrategy().use];
  }
  routers(): Array<express.Router> {
    return [
      new UserRouter().router,
      new CategoryRouter().router,
      new PurchaseRouter().router,
      new ProductRouter().router,
      new PurchaseProductRouter().router,
      new CustomerRouter().router,
      new AuthRouter().router,
    ];
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`servidor escuchando en el puerto ${this.port}`);
    });
  }
}

new ServerBoostrap();
