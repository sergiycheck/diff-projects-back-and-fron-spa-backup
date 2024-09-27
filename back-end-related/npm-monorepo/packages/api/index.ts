// create basic node server

import http from "http";
import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const server = http.createServer(app);

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
