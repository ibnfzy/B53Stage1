import { Sequelize, QueryTypes } from "sequelize";
import connection from "../../database/config/connection.json" assert { type: "json" };

const sequelize = new Sequelize(connection.development);

/**
 * Calculates the difference between two dates as a friendly string.
 *
 * @param {Date} start_date - The start date
 * @param {Date} end_date - The end date
 * @returns {string} - The difference between the dates as a friendly string, e.g. "5 days"
 */
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

/**
 * Renders the projects page.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const projects = (req, res) => {
  if (!req.session.isLogin) {
    req.flash("error", "Login dulu sebelum post project!");
    res.redirect("/login");
  }

  res.render("projects", {
    currentUrl: req.path,
    sessionLogin: req.session.isLogin,
  });
};

/**
 * Renders the detail project page.
 *
 * Fetches the project data for the given ID from the database,
 * formats the duration field, and renders the detail_projects template.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
export const detailProject = async (req, res) => {
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
      sessionLogin: req.session.isLogin,
      data: newData[0],
    });
  } catch (e) {
    console.log(e);
  }
};

/**
 * Handles posting a new project.
 *
 * Takes the project data from the request body, formats the dates,
 * sets the boolean flags, inserts the new project into the DB,
 * then redirects to the homepage.
 */
export const projectPost = async (req, res) => {
  try {
    if (!req.session.isLogin) {
      req.flash("error", "Login dulu sebelum post project!");
      res.redirect("/login");
    }

    const { name, date1, date2, node, react, next, type, desc } = req.body;

    const image = req.file.filename;
    const id = req.session.idUser;
    const diff_date = getDiffDate(new Date(date1), new Date(date2));
    const start_date = new Date(date1).toISOString();
    const end_date = new Date(date2).toISOString();
    const technologies = [];
    if (node) {
      technologies.push(node);
    }

    if (react) {
      technologies.push(react);
    }

    if (next) {
      technologies.push(next);
    }

    if (type) {
      technologies.push(type);
    }

    const dataTechnology = technologies.map((item) => `'${item}'`);

    await sequelize.query(
      `INSERT INTO projects(name, image, start_date, end_date, technologies, description, diff_date, create_at, update_at, user_id) VALUES ('${name}', '${image}', '${start_date}', '${end_date}', ARRAY[${dataTechnology}], '${desc}', '${diff_date}', NOW(), NOW(), ${id})`,
      {
        type: QueryTypes.INSERT,
      }
    );

    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};

/**
 * Deletes a project by ID.
 *
 * Takes the project ID from the request params.
 * Executes a DELETE query to remove the project from the DB.
 * Redirects to the homepage after deleting.
 */
export const projectDelete = async (req, res) => {
  try {
    if (!req.session.isLogin) {
      req.flash("error", "Login dulu sebelum delete project!");
      res.redirect("/login");
    }

    const { id } = req.params;

    await sequelize.query(`DELETE FROM projects WHERE id = ${id}`, {
      type: QueryTypes.DELETE,
    });

    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};

/**
 * Gets a project by ID, formats the date fields,
 * and renders the project edit page.
 *
 * Takes the project ID from the request params.
 * Queries the DB to get the project data.
 * Formats the start and end dates for the template.
 * Renders the project edit page, passing the project data, ID and session info.
 */
export const projectEdit = async (req, res) => {
  try {
    if (!req.session.isLogin) {
      req.flash("error", "Login dulu sebelum edit project!");
      res.redirect("/login");
    }

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

    const dataTechnology = data[0].map((item, idx) => {
      return item.technologies.map((data) => {
        let returnData = "";

        switch (data) {
          case "node":
            returnData = "node";
            break;

          case "react":
            returnData = "react";
            break;

          case "next":
            returnData = "next";
            break;

          case "type":
            returnData = "type";
            break;

          default:
            returnData = "node";
            break;
        }

        return returnData;
      });
    });

    res.render("project_edit", {
      data: newData[0],
      id,
      currentUrl: req.path,
      sessionLogin: req.session.isLogin,
      dataTechnology: dataTechnology[0],
    });
  } catch (e) {
    console.log(e);
  }
};

/**
 * Updates a project in the database.
 *
 * Takes the project ID, name, start/end dates, tech stack flags,
 * project type, and description from the request body.
 * Calculates the difference between the start and end dates.
 * Converts the dates to ISO format.
 * Updates the project row in the database with the new values.
 * Redirects to the homepage after updating.
 */
export const projectUpdate = async (req, res) => {
  try {
    if (!req.session.isLogin) {
      req.flash("error", "Login dulu sebelum post project!");
      res.redirect("/login");
    }

    const image = req.file.filename;
    let idUser = req.session.idUser;
    const { id } = req.params;
    const { name, date1, date2, node, react, next, type, desc } = req.body;

    const diff_date = getDiffDate(new Date(date1), new Date(date2));
    const start_date = new Date(date1).toISOString();
    const end_date = new Date(date2).toISOString();

    let query = `UPDATE projects SET name='${name}', start_date='${start_date}', end_date='${end_date}', technologies=ARRAY[${dataTechnology}], description='${desc}', diff_date='${diff_date}', update_at=NOW(), user_id=${idUser} WHERE id=${id}`;

    if (image) {
      query = `UPDATE projects SET name='${name}', image='${image}', start_date='${start_date}', end_date='${end_date}', technologies=ARRAY[${dataTechnology}], description='${desc}', diff_date='${diff_date}', update_at=NOW(), user_id=${idUser} WHERE id=${id}`;
    }

    const technologies = [];
    if (node) {
      technologies.push(node);
    }

    if (react) {
      technologies.push(react);
    }

    if (next) {
      technologies.push(next);
    }

    if (type) {
      technologies.push(type);
    }

    const dataTechnology = technologies.map((item) => `'${item}'`);

    await sequelize.query(query, {
      type: QueryTypes.UPDATE,
    });

    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};
