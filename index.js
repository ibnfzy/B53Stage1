import express from "express";
import hbs from "hbs";
import path from "path";
import { fileURLToPath } from "url";
import { MainRouter } from "./src/app/routes/index.js";

// Config Express JS
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: false }));

// Get Directory Root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config hbs
app.set("view engine", "hbs");

app.set("views", "src/views");

app.use("/assets", express.static("src/assets"));

hbs.registerPartials(__dirname + "/src/views/partials");

hbs.registerHelper("if_active", (currentUrl, value, opts) => {
  if (currentUrl === value) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

// Log for debugging routes and body
app.use((req, res, next) => {
  console.log(`LOG: ${req.method} ${req.path}`);
  if (req.method === "POST") {
    console.log(" body:", req.body);
  } else {
    console.log(" params:", req.params);
  }
  next();
});

// Routes
app.use(MainRouter);

// Express JS listener
app.listen(port, () => {
  console.log(`Express Server run at : http://localhost:${port}`);
});
