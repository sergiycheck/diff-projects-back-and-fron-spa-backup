import Fastify from "fastify";
import userRoute from "./user-route";

const fastify = Fastify({
  logger: true,
});

fastify.register(userRoute, { prefix: "/user" });

fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

fastify.listen({ port: 4000, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.log(`Example app listening on ${address}`);
});
