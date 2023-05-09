import { config } from "dotenv";
config();
import express from "express";

const app = express();
const PORT = process.env.PORT || 8080;

async function main() {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(PORT);
}

main()
  .then(() => {
    console.log("Server is running on http://localhost:" + PORT);
  })
  .catch((err) => {
    process.exit(1);
  });
