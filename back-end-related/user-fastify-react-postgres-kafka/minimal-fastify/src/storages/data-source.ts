import "reflect-metadata";

import { DataSource } from "typeorm";
import { Product } from "../models/product";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "user1",
  password: "pass1",
  database: "postgres",
  entities: [Product],
  synchronize: true,
  logging: true,
});
