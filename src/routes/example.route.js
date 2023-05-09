import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send({
    message: "Hello World!",
    status: "success",
    access_date: new Date(),
  });
});

export default router;
