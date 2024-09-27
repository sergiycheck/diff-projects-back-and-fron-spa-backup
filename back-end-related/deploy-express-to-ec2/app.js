import express from "express";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "working!" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port port ${port}`);
});
