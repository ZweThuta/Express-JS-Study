const { where } = require("sequelize");
const Post = require("../models/posts");
exports.createPost = (req, res) => {
  const { title, description, foto } = req.body;
  Post.create({
    title,
    description,
    imgUrl: foto
  })
  .then((result) => {
    console.log(result);
    res.redirect("/");
  })
  .catch((err) => console.log(err));
 
};
exports.renderCreatePage = (req, res) => {
  res.render("createpost", { title: "Post" }); //ejs
};

exports.getPosts = (req, res) => {
  Post.findAll()
  .then(posts =>{
    res.render("home", { title: "Home Page", postsArr: posts });
  })
  .catch((err) => console.log(err));
};

exports.getPost = (req, res) => {
  const postId = (req.params.postId);
  
  // Post.findByPk(postId)
  Post.findOne({where: {id: postId}})
  .then(post => {
    res.render("details", { title: "Post Details Page", post });
  })
  .catch((err) => console.log(err));

};
