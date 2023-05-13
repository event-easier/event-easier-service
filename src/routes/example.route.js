import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  console.log("start main func version quang branch");
  res.send({
    message: "Hello World!",
    status: "success",
    access_date: new Date(),
  });
});

export default router;
