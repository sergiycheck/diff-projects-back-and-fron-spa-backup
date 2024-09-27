import express from "express";

const app = express();

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

router.get("/ping", async (req, res) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "x-api-key": "0zk4reylbjiudip5txlvpr0d",
    },
  };

  const response = await fetch("https://api.etsy.com/v3/application/openapi-ping", requestOptions);

  const data = await response.json();

  console.log(data);

  if (response.ok) {
    const data = await response.json();
    res.send(data);
  } else {
    res.send("oops");
  }
});

app.use(router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
