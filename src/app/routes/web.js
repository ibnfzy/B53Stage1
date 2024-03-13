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
import multer from "multer";

const multerConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});

const upload = multer({ storage: multerConfig });

const WebRouter = Router();

/**
 * Routes for web app
 *
 * - GET /: Home page
 * - GET /contact: Contact page
 * - POST /contact: Send contact form email
 * - GET /detail_project/:id: Project detail page
 * - GET /projects: All projects page
 * - POST /project: Create new project
 * - GET /project/:id: Edit project page
 * - POST /project/:id/update: Update project
 * - GET /project/:id/delete: Delete project
 * - GET /testimonials: Testimonials page
 *
 * - GET /login: Login page
 * - POST /login: Handle login form
 * - GET /register: Registration page
 * - POST /register: Handle registration
 * - GET /logout: Logout user
 */
WebRouter.get("/", index);

WebRouter.get("/contact", contact);

WebRouter.post("/contact", sendMail);

WebRouter.get("/detail_project/:id", detailProject);

WebRouter.get("/projects", projects);

WebRouter.post("/project", upload.single("file"), projectPost);

WebRouter.get("/project/:id", projectEdit);

WebRouter.post("/project/:id/update", upload.single("file"), projectUpdate);

WebRouter.get("/project/:id/delete", projectDelete);

WebRouter.get("/testimonials", testimonials);

WebRouter.get("/login", login);

WebRouter.post("/login", loginAuth);

WebRouter.get("/register", register);

WebRouter.post("/register", registerSave);

WebRouter.get("/logout", logout);

export { WebRouter };
