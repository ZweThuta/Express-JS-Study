const Sequelize = require("sequelize");

const sequelize = new Sequelize("blog", "root", "3167", {
  host: "localhost",
  dialect: "mysql",
});
module.exports = sequelize;
