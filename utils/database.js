const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "blog",
  password: "3167",
});
module.exports = pool.promise();
