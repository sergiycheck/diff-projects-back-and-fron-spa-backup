import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import type { FastifyPluginAsync } from "fastify";
import { Product } from "../../models/product";
import { CompressionTypes } from "kafkajs";

const ProductBodySchema = Type.Object({
  name: Type.String(),
  description: Type.String(),
});

type ProductBodySchemaType = Static<typeof ProductBodySchema>;

const ProductToken = Type.Object({
  id: Type.String(),
  name: Type.String(),
  description: Type.String(),
});
type ProductTokenType = Static<typeof ProductToken>;

const product: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.post<{
    Body: ProductBodySchemaType;
    Reply: ProductTokenType;
  }>("/create", async (request, reply) => {
    const photoRepository = fastify.postgresDataSource.getRepository(Product);

    const res = await photoRepository.save(request.body);

    const topic = "topic-test";
    const producer = fastify.kafkajs().producer;

    const message = {
      key: `user-created-${res.id}`,
      value: JSON.stringify(res),
    };

    try {
      const recordMetadata = await producer.send({
        topic,
        compression: CompressionTypes.GZIP,
        messages: [message],
      });

      console.log(`Record sent successfully, metadata is ${JSON.stringify(recordMetadata)}`);
    } catch (error) {
      console.error(`[example/producer] ${(error as any).message}`, error);
    }

    void reply.send({
      ...res,
    });
  });

  fastify.get("/", async (_request, _reply) => {
    const photoRepository = fastify.postgresDataSource.getRepository(Product);

    const res = await photoRepository.find();

    void _reply.send(res);
  });

  fastify.delete<{
    Params: {
      id: string;
    };
  }>("/:id", async (request, reply) => {
    const photoRepository = fastify.postgresDataSource.getRepository(Product);

    const res = await photoRepository.delete(request.params.id);

    void reply.send(res);
  });

  fastify.get<{
    Params: {
      id: string;
    };
  }>("/:id", async (request, reply) => {
    const photoRepository = fastify.postgresDataSource.getRepository(Product);

    const res = await photoRepository.findBy({ id: request.params.id });

    void reply.send(res);
  });

  fastify.put<{
    Params: {
      id: string;
    };
    Body: ProductBodySchemaType;
  }>("/:id", async (request, reply) => {
    const photoRepository = fastify.postgresDataSource.getRepository(Product);

    const res = await photoRepository.update(request.params.id, request.body);

    void reply.send(res);
  });
};

export default product;
