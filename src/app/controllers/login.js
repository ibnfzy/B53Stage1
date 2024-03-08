import { Sequelize, QueryTypes } from "sequelize";
import bcrypt from "bcrypt";
import connection from "../../database/config/connection.json" assert { type: "json" };

const sequelize = new Sequelize(connection.development);

export const login = (req, res) => {
  res.render("login", {
    currentUrl: req.path,
    sessionLogin: req.session.isLogin,
  });
};

export const register = (req, res) => {
  res.render("register", {
    currentUrl: req.path,
    sessionLogin: req.session.isLogin,
  });
};

export const loginAuth = async (req, res) => {
  try {
    const { email, password } = req.body;

    let data = await sequelize.query(
      `SELECT * FROM users WHERE email = '${email}'`,
      { type: QueryTypes.SELECT }
    );

    if (!data.length) {
      res.redirect("/register");
    }

    bcrypt.compare(password, data[0].password, (e, result) => {
      if (e) throw e;

      if (result) {
        req.flash("success", "Login Success");
        req.session.isLogin = true;
        req.session.email = email;
        res.redirect("/");
      } else {
        res.redirect("/register");
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export const registerSave = (req, res) => {
  try {
    let { name, email, password } = req.body;

    bcrypt.hash(password, 10, async (e, hash) => {
      if (e) {
        return res.redirect("/register");
      }

      await sequelize.query(
        `INSERT INTO users(name, email, password, create_at, update_at) VALUES ('${name}', '${email}', '${hash}', NOW(), NOW())`,
        {
          type: QueryTypes.INSERT,
        }
      );

      res.redirect("/login");
    });
  } catch (e) {
    console.log(e);
  }
};

export const logout = (req, res) => {
  try {
    req.session.destroy((e) => {
      res.redirect("/");
    });
  } catch (e) {
    console.log(e);
  }
};
