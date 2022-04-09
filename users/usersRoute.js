const router = require("express").Router();
const { listAll, listOne, register, login, removeOne, editOne} = require("./usersController")
const { validatorCreateUser } = require("../validators/users")
//get all users
router.get("/", listAll)

 //get user by id
 router.get("/:id", listOne)

//Register
router.post("/register", validatorCreateUser, register)

//Login
router.post("/login", login)

//edit user by id
router.patch("/:id", editOne)

//delete user by id
router.delete("/:id", removeOne)

//404
// router.use((req, res) => {
//     res.status(404).json({ message: "Resource not found"})   
// })

module.exports = router