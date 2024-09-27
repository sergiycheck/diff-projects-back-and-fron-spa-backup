import Fastify from "fastify";
import fp from "fastify-plugin";
import type * as tap from "tap";

import App from "../src/app";

export type Test = (typeof tap)["Test"]["prototype"];

async function config() {
  return {};
}

async function build(t: Test) {
  // eslint-disable-next-line new-cap
  const app = Fastify();

  void app.register(fp(App), await config());

  await app.ready();

  // Tear down our app after we are done
  t.teardown(async () => app.close());

  return app;
}

export { config, build };
