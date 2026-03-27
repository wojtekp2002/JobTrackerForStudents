import express from "express";
import cors from "cors";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API działa 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server działa na porcie ${PORT}`);
});