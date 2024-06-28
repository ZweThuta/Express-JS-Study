const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");

//sequlize import
const sequelize = require("./utils/database");

const Post = require("./models/post");
const User = require("./models/user");

const app = express();
const userRoutes = require("./routes/user");
const { adminRoutes } = require("./routes/admin");
const { constants } = require("buffer");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      console.log(user);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/post", (req, res, next) => {
  // console.log("Post Middleware");
  next();
});
app.use((req, res, next) => {
  // console.log("Parent Middleware");
  next();
});
app.use("/admin", (req, res, next) => {
  // console.log("Admin Middleware approved");
  next();
});
app.use(userRoutes);
app.use("/admin", adminRoutes);

//Connecting User and Post
Post.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Post);

sequelize
  // .sync({force: true}) only onetime use
  .sync()
  .then((result) => {
    return User.findByPk(1); 
  })
  .then((user)=>{
    if(!user){
      return User.create({name:"John Doe", email:"JohnDoe@gmail.com"})
    }
    return user;
  })
  .then((user)=>{
    console.log(user);
    app.listen(8080);
  })
  .catch((err) => console.log(err));
