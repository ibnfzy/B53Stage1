import { Sequelize, QueryTypes } from "sequelize";
import connection from "../../database/config/connection.json" assert { type: "json" };

const sequelize = new Sequelize(connection.development);

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
      data,
    });
  } catch (e) {
    console.log(e);
  }
};

export const contact = (req, res) => {
  res.render("contact", {
    currentUrl: req.path,
  });
};

export const sendMail = (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  let emailDestination = "hi.dandi9@gmail.com";
  let url = `mailto:${emailDestination}?subject=${subject}&body=Halo bang nama saya, ${name}, saya ingin ${message}. bisakah anda menghubungi saya ${phone}`;

  res.redirect(url);
};

export const testimonials = (req, res) => {
  res.render("testimonials", {
    currentUrl: req.path,
  });
};
