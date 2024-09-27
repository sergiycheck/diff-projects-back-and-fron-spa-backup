import express from "express";
import { externalRouter } from "./external-file";

const app = express();

app.use(express.json());

const router = express.Router();

router.get("/default", (req, res) => {
  res.json({ message: "Hello World!" });
});

router.get("/hello", (req, res) => {
  const { name } = req.query;

  const resultingName = name ?? "World";

  res.json({ message: "Hello " + resultingName });
});

app.use("/external", externalRouter);
app.use("/", router);

app.listen(3300, () => {
  console.log("Example app listening on port 3000!");
});
