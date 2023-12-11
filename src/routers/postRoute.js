const express = require("express");
const {
  createPost,
  getPostHome,
  getPostAdmin,
  getDetailPost,
  deletePost,
  UpdatePost,
  getNineImage,
  searchGlobal,
  uploadImage,
  uploadOneImage,
  requestUseful,
  getListPostUseful,
  AiGeneratePost,
} = require("../controllers/PostController");

const { isAuthentication, isAdmin } = require("../Middeware/AuthMiddleware");

let router = express.Router();
router.post("/", [isAuthentication], createPost);
router.post("/ai-generate-post", [isAuthentication], AiGeneratePost);

router.post("/upload_images", uploadImage);
router.post("/upload_one_image", uploadOneImage);
router.patch("/request-useful/:id", [isAuthentication], requestUseful);


router.get("/home", getPostHome);
// router.get("/searchGlobal", [isAuthentication], searchGlobal);

router.get("/getNineImage", [isAuthentication], getNineImage);
router.get("/getListPostUseful", [isAuthentication,isAdmin], getListPostUseful);

router.get("/detail/:id", getDetailPost);
router.get("/", [isAuthentication, isAdmin], getPostAdmin);
router.delete("/:id", [isAuthentication], deletePost);
router.patch("/:id", [isAuthentication], UpdatePost);

module.exports = router;
