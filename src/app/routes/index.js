import { Router } from "express";
import { WebRouter } from "./web.js";

const MainRouter = Router();

MainRouter.use(WebRouter);

export { MainRouter };
