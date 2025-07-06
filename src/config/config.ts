import dotenv from "dotenv";
import { DataSourceOptions, DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
const {AppDatasource} = require("./data.source") ;

export abstract class ConfigServer {
  constructor() {
    const nodeNameEnv = this.createPathEnv(this.nodeEnv);
    dotenv.config({
      path: nodeNameEnv,
    });
  }
  public getEnvironment(k: string): string | undefined {
    return process.env[k];
  }
  public getNumber(k: string): number {
    return Number(this.getEnvironment(k));
  }
  public get nodeEnv(): string {
    //leer la variable de entorno global para saber en que entorno de trabajo estoy
    return this.getEnvironment("NODE_ENV")?.trim() || "";
  }
  public createPathEnv(path: string): string {
    //creacion de rutas dependiendo del entorno de desarrollo o de produccion
    const arrEnv: Array<string> = ["env"];
    if (path.length > 0) {
      const stringToArray = path.split(".");
      arrEnv.unshift(...stringToArray);
    }
    return "." + arrEnv.join(".");
  }

  async dbConnect(): Promise<DataSource> {
    if (!AppDatasource.isInitialized) {
      await AppDatasource.initialize();
      console.log("base de datos conectada");
    }
    return AppDatasource;
  }
}
