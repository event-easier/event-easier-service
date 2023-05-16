import { config } from "dotenv";
config();
import express from "express";
import fs from "fs";
import path from "path";
import connectDatabase from "./configs/connectMongoDB.config.js";
import eventRouter from "./routes/event.route.js";
import exampleRoutes from "./routes/example.route.js";
import userRouter from "./routes/user.route.js";

const app = express();
const PORT = process.env.PORT || 8081;

async function main() {
  await connectDatabase();

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
  app.use("/api/v1/user",userRouter);
  app.use("/api/v1/event",eventRouter);

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
