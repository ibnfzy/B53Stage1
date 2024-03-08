import { Router } from "express";
import {
  index,
  contact,
  sendMail,
  testimonials,
} from "../controllers/index.js";
import {
  projectDelete,
  projectEdit,
  projectPost,
  projectUpdate,
  projects,
  detailProject,
} from "../controllers/projects.js";
import {
  login,
  register,
  loginAuth,
  registerSave,
  logout,
} from "../controllers/login.js";

const WebRouter = Router();

WebRouter.get("/", index);

WebRouter.get("/contact", contact);

WebRouter.post("/contact", sendMail);

WebRouter.get("/detail_project/:id", detailProject);

WebRouter.get("/projects", projects);

WebRouter.post("/project", projectPost);

WebRouter.get("/project/:id", projectEdit);

WebRouter.post("/project/:id/update", projectUpdate);

WebRouter.get("/project/:id/delete", projectDelete);

WebRouter.get("/testimonials", testimonials);

WebRouter.get("/login", login);

WebRouter.post("/login", loginAuth);

WebRouter.get("/register", register);

WebRouter.post("/register", registerSave);

WebRouter.get("/logout", logout);

export { WebRouter };
