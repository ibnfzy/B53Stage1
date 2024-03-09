import { Sequelize, QueryTypes } from "sequelize";
import bcrypt from "bcrypt";
import connection from "../../database/config/connection.json" assert { type: "json" };

const sequelize = new Sequelize(connection.development);

/**
 * Renders the login page.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const login = (req, res) => {
  res.render("login", {
    currentUrl: req.path,
    sessionLogin: req.session.isLogin,
  });
};

/**
 * Renders the register page.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const register = (req, res) => {
  res.render("register", {
    currentUrl: req.path,
    sessionLogin: req.session.isLogin,
  });
};

/**
 * Authenticates a user's login credentials.
 * Checks if the provided email exists in the database, and compares
 * the provided password with the hashed password in the database.
 * Sets session variables if login succeeds.
 * Redirects to the login page with error flash message if login fails.
 */
export const loginAuth = async (req, res) => {
  try {
    const { email, password } = req.body;

    let data = await sequelize.query(
      `SELECT * FROM users WHERE email = '${email}'`,
      { type: QueryTypes.SELECT }
    );

    if (!data.length) {
      req.flash("error", "Username nya tidak cocok nih!");
      res.redirect("/login");
    }

    bcrypt.compare(password, data[0].password, (e, result) => {
      if (e) throw e;

      if (result) {
        req.flash("success", "Selamat datang kembali tuan");
        req.session.isLogin = true;
        req.session.email = email;
        res.redirect("/");
      } else {
        req.flash("error", "Password ini salah, ingat-ingat dulu!");
        res.redirect("/login");
      }
    });
  } catch (e) {
    console.log(e);
  }
};

/**
 * Saves a new user registration to the database.
 *
 * Hashes the password, validates required fields,
 * inserts the user record into the database.
 * Handles any errors and redirects back to the register page.
 * Sets flash messages for the user.
 */
export const registerSave = (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      req.flash("error", "Formnya gak boleh kosong dong!");
      return res.redirect("/register");
    }

    bcrypt.hash(password, 10, async (e, hash) => {
      if (e) {
        req.flash("error", `Yah ada yang error nih, errornya: ${e}`);
        return res.redirect("/register");
      }

      await sequelize.query(
        `INSERT INTO users(name, email, password, create_at, update_at) VALUES ('${name}', '${email}', '${hash}', NOW(), NOW())`,
        {
          type: QueryTypes.INSERT,
        }
      );

      req.flash(
        "success",
        "Kamu berhasil daftar nih, silahkan langsung login!"
      );
      res.redirect("/login");
    });
  } catch (e) {
    console.log(e);
  }
};

/**
 * Logs the user out by destroying the session.
 *
 * Destroys the current session and redirects to the homepage.
 * Handles any errors.
 */
export const logout = (req, res) => {
  try {
    req.session.destroy((e) => {
      res.redirect("/");
    });
  } catch (e) {
    console.log(e);
  }
};
