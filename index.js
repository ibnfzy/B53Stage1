import express from "express";
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", "src/views");

app.use("/assets", express.static("src/assets"));

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

app.listen(port, () => {
  console.log(`Express Server run at : http://localhost:${port}`);
});
