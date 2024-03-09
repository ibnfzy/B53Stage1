import { Sequelize, QueryTypes } from "sequelize";
import connection from "../../database/config/connection.json" assert { type: "json" };

const sequelize = new Sequelize(connection.development);

/**
 * Fetches all projects from the database and renders the index page.
 *
 * The index page shows a list of all projects.
 * Data is fetched from the projects table using a raw sequelize query.
 * The results are passed to the index view.
 */
export const index = async (req, res) => {
  try {
    const data = await sequelize.query(
      "SELECT * FROM projects ORDER BY id DESC",
      {
        type: QueryTypes.SELECT,
      }
    );

    res.render("index", {
      currentUrl: req.path,
      sessionLogin: req.session.isLogin,
      data,
    });
  } catch (e) {
    console.log(e);
  }
};

/**
 * Renders the contact page.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * Renders the contact page template, passing the current URL and login session status.
 */
export const contact = (req, res) => {
  res.render("contact", {
    currentUrl: req.path,
    sessionLogin: req.session.isLogin,
  });
};

/**
 * Sends an email using the mailto url.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 *
 * Constructs a mailto url with the user's input and redirects to that url.
 */
export const sendMail = (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  let emailDestination = "hi.dandi9@gmail.com";
  let url = `mailto:${emailDestination}?subject=${subject}&body=Halo bang nama saya, ${name}, saya ingin ${message}. bisakah anda menghubungi saya ${phone}`;

  res.redirect(url);
};

/**
 * Renders the testimonials page.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * Renders the testimonials page template, passing the current URL and login session status.
 */
export const testimonials = (req, res) => {
  res.render("testimonials", {
    currentUrl: req.path,
    sessionLogin: req.session.isLogin,
  });
};
