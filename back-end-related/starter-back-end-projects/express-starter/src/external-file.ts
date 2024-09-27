import express from "express";

const externalRouter = express.Router();

externalRouter.get("/", (req, res) => {
  res.json({ message: "Hello external" });
});

export { externalRouter };
