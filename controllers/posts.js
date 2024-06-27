const { where } = require("sequelize");
const Post = require("../models/posts");
exports.createPost = (req, res) => {
  const { title, description, foto } = req.body;
  Post.create({
    title,
    description,
    imgUrl: foto,
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
//DESC from last to first (z - a)
//ASC from first to last (a - z)
exports.getPosts = (req, res) => {
  Post.findAll({ order: [["createdAt", "ASC"]] })
    .then((posts) => {
      res.render("home", { title: "Home Page", postsArr: posts });
    })
    .catch((err) => console.log(err));
};

exports.getPost = (req, res) => {
  const postId = req.params.postId;

  // Post.findByPk(postId)
  Post.findOne({ where: { id: postId } })
    .then((post) => {
      res.render("details", { title: "Post Details Page", post });
    })
    .catch((err) => console.log(err));
};
exports.deletePost = (req, res) => {
  const postId = req.params.postId;
  // console.log("Delete Function" + postId);
  Post.findByPk(postId)
    .then((post) => {
      if (!post) {
        res.redirect("/");
      }
      return post.destroy();
    })
    .then((result) => {
      console.log("Post is deleted.");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getOldPost = (req, res) => {
  const postId = req.params.postId;
  Post.findByPk(postId)
    .then((post) => {
      res.render("edit", { title: `${post.title}`, post });
    })
    .catch((err) => console.log(err));
};

exports.updatePost = (req, res) => {
  const { title, description, foto, postId } = req.body;
  Post.findByPk(postId)
    .then((post) => {
      (post.title = title),
        (post.description = description),
        (post.imgUrl = foto);

      return post.save();
    })
    .then(result =>{
      console.log(`Post id => ${postId} is updated successfully`)
      res.redirect("/")
    })
    .catch((err) => console.log(err));
};
