import express from "express";
import hbs from "hbs";
import path from "path";
import { fileURLToPath } from "url";

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

const getDiffDate = (start_date, end_date) => {
  const diffInMs = Math.abs(end_date - start_date);
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (days < 1) {
    return "1 day";
  }

  if (days < 30) {
    return days + " days";
  }

  if (months === 1) {
    return "1 month";
  }

  if (months < 12) {
    return months + " months";
  }

  if (years === 1) {
    return "1 year";
  }

  return years + " years";
};

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

// Data for debug
let dataProject = [
  {
    name: "TEST",
    date1: "2024-03-06",
    date2: "2024-03-19",
    node: true,
    react: true,
    next: true,
    type: true,
    desc: "TEST",
    diff: getDiffDate(new Date("02/04/2024"), new Date("03/04/2024")),
  },
];

// Controller
const index = (req, res) => {
  res.render("index", {
    currentUrl: req.path,
    data: dataProject,
  });
};

const contact = (req, res) => {
  res.render("contact", {
    currentUrl: req.path,
  });
};

const detailProject = (req, res) => {
  res.render("detail_projects", {
    currentUrl: req.path,
  });
};

const projects = (req, res) => {
  res.render("projects", {
    currentUrl: req.path,
  });
};

const projectPost = (req, res) => {
  const { name, date1, date2, node, react, next, type, desc } = req.body;

  dataProject.push({
    name,
    date1,
    date2,
    node,
    react,
    next,
    type,
    desc,
    diff: getDiffDate(new Date(date1), new Date(date2)),
  });

  res.redirect("/");
};

const projectDelete = (req, res) => {
  const { id } = req.params;
  dataProject.splice(index, 1);
  res.redirect("/");
};

const projectEdit = (req, res) => {
  const { id } = req.params;
  console.log(dataProject[id]);

  res.render("project_edit", {
    data: dataProject[id],
    id,
    currentUrl: req.path,
  });
};

const projectUpdate = (req, res) => {
  const { id } = req.params;
  const { name, date1, date2, node, react, next, type, desc } = req.body;

  dataProject.splice(id, 1, {
    name,
    date1,
    date2,
    node,
    react,
    next,
    type,
    desc,
    diff: getDiffDate(new Date(date1), new Date(date2)),
  });

  res.redirect("/");
};

const testimonials = (req, res) => {
  res.render("testimonials", {
    currentUrl: req.path,
  });
};

// Routes
app.get("/", index);

app.get("/contact", contact);

app.get("/detail_project/:id", detailProject);

app.get("/projects", projects);

app.post("/project", projectPost);

app.get("/project/:id", projectEdit);

app.post("/project/:id/update", projectUpdate);

app.get("/project/:id/delete", projectDelete);

app.get("/testimonials", testimonials);

// Express JS listener
app.listen(port, () => {
  console.log(`Express Server run at : http://localhost:${port}`);
});
