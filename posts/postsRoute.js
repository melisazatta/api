const router = require("express").Router();
const isAuth = require("../util/isAuth")
const { addOne } = require("./postsController")

router.post("/", isAuth, addOne)

module.exports = router