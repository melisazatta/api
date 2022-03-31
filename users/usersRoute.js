const router = require("express").Router();
const {getAllUsers, getUserById, addUser, deleteUser} = require("./usersController")
// let users = require("../db/data")
// const findById = require("../util/findById")

//get all users
router.get("/", getAllUsers)
 //get user by id
 router.get("/:id", getUserById)
//post new users
router.post("/", addUser)
//delete user by id
router.delete("/:id", deleteUser)

//404
router.use((req, res) => {
    res.status(404).json({ message: "Resource not found"})   
})

module.exports = router