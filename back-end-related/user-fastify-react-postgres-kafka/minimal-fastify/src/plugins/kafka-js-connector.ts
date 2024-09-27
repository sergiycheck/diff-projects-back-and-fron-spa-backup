import fp from "fastify-plugin";
import { Consumer, Kafka, Producer, logLevel } from "kafkajs";
const ip = require("ip");

const host = process.env.HOST_IP || ip.address();

const errorTypes = ["unhandledRejection", "uncaughtException"];

const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

function handleErrorsForProducerAndConsumer(producerOrConsumer: Producer | Consumer) {
  errorTypes.map((type) => {
    process.on(type, async () => {
      try {
        console.log(`process.on ${type}`);
        await producerOrConsumer.disconnect();
        process.exit(0);
      } catch (_) {
        process.exit(1);
      }
    });
  });

  signalTraps.map((type) => {
    process.once(type, async () => {
      try {
        await producerOrConsumer.disconnect();
      } finally {
        process.kill(process.pid, type);
      }
    });
  });
}

const kafka = new Kafka({
  logLevel: logLevel.DEBUG,
  clientId: "example-producer",
  brokers: [`${host}:9092`],
});

const producer = kafka.producer();

const consumer = kafka.consumer({ groupId: "test-group" });

handleErrorsForProducerAndConsumer(producer);

handleErrorsForProducerAndConsumer(consumer);

export default fp<any>(async (fastify, opts, done) => {
  await producer.connect();

  await consumer.connect();

  fastify.decorate("kafkajs", () => {
    return {
      kafka,
      producer,
      consumer,
    };
  });

  fastify.addHook("onClose", async (_instance) => {
    await producer.disconnect();
    await consumer.disconnect();
  });

  done();
});

declare module "fastify" {
  interface FastifyInstance {
    kafkajs: () => {
      kafka: Kafka;
      producer: Producer;
      consumer: Consumer;
    };
  }
}
