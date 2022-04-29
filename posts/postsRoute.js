const router = require("express").Router();
const isAuth = require("../util/isAuth");
const { validatorCreatePost } = require("../validators/posts");
const { addOne, listAll } = require("./postsController")

router.post("/", isAuth, validatorCreatePost, addOne)
router.get("/", listAll)

module.exports = router