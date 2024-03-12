import express from "express";
import hbs from "hbs";
import path from "path";
import { fileURLToPath } from "url";
import { MainRouter } from "./src/app/routes/index.js";
import session from "express-session";
import flash from "express-flash";

// Config Express JS
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: false }));

// Setup Session
app.use(
  session({
    secret: "jultdev4life",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);

app.use(flash());

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

hbs.registerHelper("if_not", (value, opts) => {
  if (!value) {
    return opts.fn(this);
  }
});

hbs.registerHelper("if_equals", (dataThis, data, opts) => {
  if (dataThis === data) {
    return opts.fn(this);
  }
});

hbs.registerHelper("if_isset", (dataArr, data, opts) => {
  dataArr.find((item) => {
    if (item === data) {
      console.log(this);
      return opts.fn(this);
    }
  });
});

hbs.registerHelper("checkArray", function (array, value) {
  const check = array.includes(value);

  if (check) {
    return "checked";
  }
});

// Log for debugging routes and body
app.use((req, res, next) => {
  console.log("==========");
  console.log(`LOG: ${req.method} ${req.path}`);
  // req.session.isLogin = true;
  console.log("SESSION: ", req.session);
  console.log("CHECK EMAIL: ", req.session.email);
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
