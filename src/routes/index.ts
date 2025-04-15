import { Router, Request, Response } from "express";

const router = Router();

router.get("/",  (_, res: Response) => {
  res.send("Working");
});

export default router;
