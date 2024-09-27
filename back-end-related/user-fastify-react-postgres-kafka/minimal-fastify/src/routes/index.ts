import type { FastifyPluginAsync, RouteShorthandOptions } from "fastify";

const root: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get("/", async (_request, _reply) => ({ status: true }));

  fastify.get("/health/check", async (_request, _reply) => ({ status: true }));

  const opts: RouteShorthandOptions = {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            pong: {
              type: "string",
            },
          },
        },
      },
    },
  };

  fastify.get("/ping", opts, async (_request, _reply) => {
    return { pong: "it worked!" };
  });
};

export default root;
