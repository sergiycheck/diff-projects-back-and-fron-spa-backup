import { test } from "tap";

import { build } from "../helper";

void test("example is loaded", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: "/health/check",
  });

  t.equal(res.payload, '{"status":true}');
});
