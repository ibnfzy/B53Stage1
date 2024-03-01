import express from "express";
import hbs from "hbs";
import path from "path";
import { fileURLToPath } from "url";

// Config Express JS
const app = express();
const port = 3000;

// Get Directory Root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config hbs
app.set("view engine", "hbs");
app.set("views", "src/views");
app.use("/assets", express.static("src/assets"));
hbs.registerPartials(__dirname + "/src/views/partials", (err) => {
  return console.log(err);
});
hbs.registerHelper("if_equal", (value1, value2, opts) => {
  if (value1 === value2) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/detail_project", (req, res) => {
  res.render("detail_projects");
});

app.get("/projects", (req, res) => {
  res.render("projects");
});

app.get("/testimonials", (req, res) => {
  res.render("testimonials");
});

// Express JS listener
app.listen(port, () => {
  console.log(`Express Server run at : http://localhost:${port}`);
});
