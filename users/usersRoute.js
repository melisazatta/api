const router = require("express").Router();
const { listAll, listOne, register, login, removeOne, editOne} = require("./usersController")
const { validatorCreateUser } = require("../validators/users")
const fileUpload = require ("../util/handlerStorage")
//get all users
router.get("/", listAll)

 //get user by id
 router.get("/:id", listOne)

//Register
router.post("/register", fileUpload.single("file"), validatorCreateUser, register)

//Login
router.post("/login", login)

//patch user by id
router.patch("/:id", fileUpload.single("file"), editOne)

//delete user by id
router.delete("/:id", removeOne)

//404
// router.use((req, res) => {
//     res.status(404).json({ message: "Resource not found"})   
// })

module.exports = router