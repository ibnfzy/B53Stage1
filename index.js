import express from "express";
import hbs from "hbs";
import path from "path";
import { fileURLToPath } from "url";
import { Sequelize, QueryTypes } from "sequelize";
import connection from "./src/database/config/connection.json" assert { type: "json" };

// Config Express JS
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: false }));
const sequelize = new Sequelize(connection.development);

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

// Controller
const index = async (req, res) => {
  try {
    const data = await sequelize.query(
      "SELECT * FROM projects ORDER BY id DESC",
      {
        type: QueryTypes.SELECT,
      }
    );

    res.render("index", {
      currentUrl: req.path,
      data,
    });
  } catch (e) {
    console.log(e);
  }
};

const contact = (req, res) => {
  res.render("contact", {
    currentUrl: req.path,
  });
};

const sendMail = (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  let emailDestination = "hi.dandi9@gmail.com";
  let url = `mailto:${emailDestination}?subject=${subject}&body=Halo bang nama saya, ${name}, saya ingin ${message}. bisakah anda menghubungi saya ${phone}`;

  res.redirect(url);
};

const detailProject = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await sequelize.query(
      `SELECT * FROM projects WHERE id = ${id}`,
      {
        type: QueryTypes.SELECT,
      }
    );

    const formatDuration = new Intl.DateTimeFormat("id", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const newData = data.map((item) => {
      return {
        ...item,
        duration: formatDuration.formatRange(item.start_date, item.end_date),
      };
    });

    res.render("detail_projects", {
      currentUrl: req.path,
      data: newData[0],
    });
  } catch (e) {
    console.log(e);
  }
};

const projects = (req, res) => {
  res.render("projects", {
    currentUrl: req.path,
  });
};

const projectPost = async (req, res) => {
  try {
    const { name, date1, date2, node, react, next, type, desc } = req.body;

    const diff_date = getDiffDate(new Date(date1), new Date(date2));
    const start_date = new Date(date1).toISOString();
    const end_date = new Date(date2).toISOString();
    const is_node = node ? true : false;
    const is_react = react ? true : false;
    const is_next = next ? true : false;
    const is_type = type ? true : false;

    await sequelize.query(
      `INSERT INTO projects(name, start_date, end_date, node, react, next, type, description, diff_date, create_at, update_at) VALUES ('${name}', '${start_date}', '${end_date}', ${is_node}, ${is_react}, ${is_next}, ${is_type}, '${desc}', '${diff_date}', NOW(), NOW())`,
      {
        type: QueryTypes.INSERT,
      }
    );

    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};

const projectDelete = async (req, res) => {
  try {
    const { id } = req.params;

    await sequelize.query(`DELETE FROM projects WHERE id = ${id}`, {
      type: QueryTypes.DELETE,
    });

    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};

const projectEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await sequelize.query(
      `SELECT * FROM projects WHERE id = ${id}`,
      {
        type: QueryTypes.INSERT,
      }
    );

    const newData = data[0].map((item) => {
      return {
        ...item,
        input_start_date: new Date(item.start_date).toLocaleDateString("en-CA"),
        input_end_date: new Date(item.end_date).toLocaleDateString("en-CA"),
      };
    });

    res.render("project_edit", {
      data: newData[0],
      id,
      currentUrl: req.path,
    });
  } catch (e) {
    console.log(e);
  }
};

const projectUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date1, date2, node, react, next, type, desc } = req.body;

    const diff_date = getDiffDate(new Date(date1), new Date(date2));
    const start_date = new Date(date1).toISOString();
    const end_date = new Date(date2).toISOString();
    const is_node = node ? true : false;
    const is_react = react ? true : false;
    const is_next = next ? true : false;
    const is_type = type ? true : false;

    await sequelize.query(
      `UPDATE projects SET name='${name}', start_date='${start_date}', end_date='${end_date}', node=${is_node}, react=${is_react}, next=${is_next}, type=${is_type}, description='${desc}', diff_date='${diff_date}', update_at=NOW() WHERE id=${id}`,
      {
        type: QueryTypes.UPDATE,
      }
    );

    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};

const testimonials = (req, res) => {
  res.render("testimonials", {
    currentUrl: req.path,
  });
};

// Routes
app.get("/", index);

app.get("/contact", contact);

app.post("/contact", sendMail);

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
