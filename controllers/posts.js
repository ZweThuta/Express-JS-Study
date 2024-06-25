// const posts = [];
const Post = require("../models/posts");
exports.createPost = (req, res) => {
  const { title, description, foto } = req.body;
  // console.log(`Title value is ${title} & Description is ${description} `);
  // posts.push({
  //   id: Math.random(),
  //   title,
  //   description,
  //   foto,
  // });
  const post = new Post(title, description, foto);
  post
    .setPost()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
exports.renderCreatePage = (req, res) => {
  // res.sendFile(path.join(__dirname, "..", "views", "createpage.html"));
  res.render("createpost", { title: "Post" }); //ejs
};
exports.getPosts = (req, res) => {
  // console.log(posts);
  // res.sendFile(path.join(__dirname,"..", "views", "homepage.html"));
  Post.getAllPost()
    .then(([rows]) => {
      console.log(rows);
      res.render("home", { title: "Hola", postsArr: rows });
    })
    .catch((err) => console.log(err));
  //ejs
};

exports.getPost = (req, res) => {
  const postId = Number(req.params.postId);
  console.log(postId);
  // const post = posts.find((post) => post.id === postId);
  // console.log(post);
  Post.getSinglePost(postId)
    .then(([row]) => {
      console.log(row);
      res.render("details", { title: "Post Details Page", post: row[0] });
    })
    .catch((err) => console.log(err));
};
