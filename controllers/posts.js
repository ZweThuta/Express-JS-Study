const posts = [];
exports.createPost = (req, res) => {
  const { title, description, foto } = req.body;
  console.log(`Title value is ${title} & Description is ${description} `);
  posts.push({
    id: Math.random(),
    title,
    description,
    foto,
  });
  res.redirect("/");
};
exports.renderCreatePage = (req, res) => {
  // res.sendFile(path.join(__dirname, "..", "views", "createpage.html"));
  res.render("createpost", { title: "Post" }); //ejs
};
exports.renderHomePage = (req, res) => {
  console.log(posts);
  // res.sendFile(path.join(__dirname,"..", "views", "homepage.html"));
  res.render("home", { title: "Hola", postsArr: posts }); //ejs
};

exports.getPost = (req, res) => {
  const postId = Number(req.params.postId);
  console.log(postId);
  const post = posts.find((post) => post.id === postId);
  console.log(post);
  res.render("details", { title: "Post Details Page" , post });
};
