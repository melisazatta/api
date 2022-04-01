let users = require("../db/data")
const { getAllUsers, getUserById, addNewUser, deleteUserById, editUserById } = require("./usersModel")

//get all users
const listAll = async(req, res,) => {
    const dbResponse = await getAllUsers()
    dbResponse.hasOwnProperty("error") ? res.status(500).json(dbResponse) : res.status(200).json(dbResponse)
};
//get user by id
 const listOne = async(req, res, next) => {
    if (isNaN(+req.params.id)) {
        return res.status(400).json({ message: "Must put a number"})
    }
    const dbResponse = await getUserById(+req.params.id)
    if (dbResponse.hasOwnProperty("error")) {
        return res.status(500).json(dbResponse)
    }
    dbResponse.length ? res.status(200).json(dbResponse) : next()
};
//add new user
const addOne = async(req, res) => {
    const { name, username, email } = req.body;
    if (!name || !username || !email && (name === "" || username === "" || email === "")) {
        res.status(400).json({ message: "all fields required" })
    } else {
        const dbResponse = await addNewUser(req.body)
        dbResponse.hasOwnProperty("error") ? res.status(500).json(dbResponse) : res.status(201).json(req.body)
    }
}
//delete user by id
const removeOne = async(req, res, next) => {
    if (isNaN(+req.params.id)) {
        res.status(400).json({ message: "Must put a number"}) //Cannot set headers after they are sent to the client????
    }
    const dbResponse = await deleteUserById(+req.params.id) 
    if (dbResponse.hasOwnProperty("error")) {
        return res.status(500).json(dbResponse)
    }
    dbResponse.affectedRows ? res.status(204).end() : next() 
}
//Edit user by id
const editOne = async(req, res) => {
    if (isNaN(+req.params.id)) {
        res.status(400).json({ message: "Must put a number"})
    }
    const dbResponse = await editUserById(+req.params.id, req.body)
    if (dbResponse.hasOwnProperty("error")) return res.status(500).json(dbResponse);
    dbResponse.affectedRows ? res.status(200).json(req.body) : next()

}

module.exports = {listAll, listOne, addOne, removeOne, editOne}