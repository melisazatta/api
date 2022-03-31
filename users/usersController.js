let users = require("../db/data")
const { fetchAllUsers, fetchUserById } = require("./usersModel")
const findById = require("../util/findById")

//get all users
const getAllUsers = async(req, res, next) => {
    const users = await fetchAllUsers()
    users.length ? res.status(200).json(users) : next()
}
//get user by id
 const getUserById = async(req, res, next) => {
    if (isNaN(+req.params.id)) {
        res.status(400).json({ message: "Must put a number"})
    }
    const user = await fetchUserById(+req.params.id)
    user.length ? res.status(200).json(user) : next()
}
//add new user
const addUser = (req, res) => {
    const { name, username, email } = req.body;
    if (!name || !username || !email && (name === "" || username === "" || email === "")) {
        res.status(400).json({ message: "all fields required" })
    } else {
        users.push(req.body)
        res.status(201).json(req.body)
    }
}
//delete user by id
const deleteUser = (req, res, next) => {
    if (isNaN(+req.params.id)) {
        res.status(400).json({ message: "Must put a number"}) //Cannot set headers after they are sent to the client????
    }
    const userFound = findById(+req.params.id, users)
    if (userFound) {
        users = users.filter((user => user.id !== +req.params.id))
        res.status(200).json(userFound)
    } else {
        next()
    }
}

module.exports = {getAllUsers, getUserById, addUser, deleteUser}