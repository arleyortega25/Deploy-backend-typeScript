import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import "reflect-metadata";


dotenv.config();



const Config: DataSourceOptions = {
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.USER_DB || "root",
  password: process.env.PASSWORD_DB || "",
  database: process.env.DATABASE || "",
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/../migrations/*{.ts,.js}"],
  synchronize: false,
  migrationsRun: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

const AppDatasource = new DataSource(Config);
export { AppDatasource };