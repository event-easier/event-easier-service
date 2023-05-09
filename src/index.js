import { config } from "dotenv";
config();
import express from "express";
import fs from "fs";
import path from "path";

import exampleRoutes from "./routes/example.route.js";

const app = express();
const PORT = process.env.PORT || 8080;

async function main() {
  // middlewares
  app.use(express.json());

  // routes
  app.get("/", (req, res) => {
    const indexHtml = fs.readFileSync(
      path.resolve("public", "index.html"),
      "utf-8"
    );
    res.send(indexHtml);
  });
  app.use("/api/v1/example", exampleRoutes);

  // start server
  app.listen(PORT);
}

main()
  .then(() => {
    console.log("Server is running on http://localhost:" + PORT);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
