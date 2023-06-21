const express = require("express");
const { model, modelNames } = require("mongoose");
const router = express.Router();
const post = require("../models/post");
const Path = require("path");

/* router.get('/new', (req, res) => {
    if(req.session.userId){
        return res.render('add-post');
    }
    res.redirect('/users/login');
}) */
router.get("/new", (req, res) => {
  if (req.session.userId) {
    return res.render("add-post");
  } else {
    res.redirect("/users/login");
  }
});

router.get("/:id", (req, res) => {
  post
    .findById(req.params.id)
    .lean()
    .then((post) => {
      res.render("shop-single", { post: post });
    });
});

router.post("/test", (req, res) => {
  let post_image = req.files.post_image;
  post_image.mv(
    Path.resolve(__dirname, `../public/assets/img/postimage`, post_image.name)
  );

  post.create({
    ...req.body,
    post_image: `/assets/img/postimage/${post_image.name}`,
  });
  req.session.sessionFlash = {
    type: "alert alert-success",
    message: "Poat ekleme başarılı",
  };

  res.redirect("/shop");
}); // end of post.create

// Toggle like for a post
router.post("/:id/like", (req, res) => {
  console.log("istek geldi");
  const postId = req.params.id;
  const userId = req.session.userId; // Assuming the user ID is stored in the session

  // Find the post by ID
  post
    .findById(postId)
    .then((foundPost) => {
      if (!foundPost) {
        // Post not found
        return res.status(404).json({ error: "Post not found" });
      }

      // Check if the user already liked the post
      const likedIndex = foundPost.likes.findIndex(
        (like) => like.user?.toString() === userId
      );

      if (likedIndex === -1) {
        // User hasn't liked the post, add a new like
        console.log(foundPost.likes);
        foundPost.likes.push({ user: userId });
        console.log(foundPost.likes);
      } else {
        // User already liked the post, remove the like
        foundPost.likes.splice(likedIndex, 1);
      }

      // Save the updated post

      return foundPost.save();
    })
    .then((updatedPost) => {
      res.redirect("/liked");
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
