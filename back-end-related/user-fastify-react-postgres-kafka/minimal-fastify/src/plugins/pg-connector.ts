import fp from "fastify-plugin";
import type { FastifyCorsOptions } from "@fastify/cors";
import { AppDataSource } from "../storages/data-source";

export default fp<FastifyCorsOptions>(async (fastify, opts) => {
  // to initialize the initial connection with the database, register all entities
  // and "synchronize" database schema, call "initialize()" method of a newly created database
  // once in your application bootstrap

  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.log(error);
  }

  fastify.decorate("postgresDataSource", AppDataSource);
});

declare module "fastify" {
  export interface FastifyInstance {
    postgresDataSource: typeof AppDataSource;
  }
}
