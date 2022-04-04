const { getAllUsers, getUserById, addNewUser, deleteUserById, editUserById } = require("./usersModel")
const notNumber = require("../util/notNumber")
const { hashPassword, checkPassword } = require("../util/handlePassword")

//get all users
const listAll = async(req, res, next) => {
    const dbResponse = await getAllUsers()
    if (dbResponse instanceof Error) return next(dbResponse);
    dbResponse.length ? res.status(200).json(dbResponse) : next()
};
//get user by id
 const listOne = async(req, res, next) => {
    if (notNumber(+req.params.id, next)) return;
    const dbResponse = await getUserById(+req.params.id)
    if (dbResponse instanceof Error) return next(dbResponse);
    dbResponse.length ? res.status(200).json(dbResponse) : next()
};
//add new user
const addOne = async(req, res, next) => {
    const password = await hashPassword(req.body.password)
        const dbResponse = await addNewUser({...req.body, password })
        dbResponse instanceof Error ? next(dbResponse) : res.status(201).json({message: `User ${req.body.name} created`})
}
//delete user by id
const removeOne = async(req, res, next) => {
    if (notNumber(+req.params.id, next)) return;
    const dbResponse = await deleteUserById(+req.params.id) 
    if (dbResponse instanceof Error) return next(dbResponse);
    dbResponse.affectedRows ? res.status(204).end() : next() 
}
//Edit user by id
const editOne = async(req, res) => {
    if (notNumber(+req.params.id, next)) return;
    const dbResponse = await editUserById(+req.params.id, req.body)
    if (dbResponse instanceof Error) return next(dbResponse);
    dbResponse.affectedRows ? res.status(200).json(req.body) : next()

}

module.exports = {listAll, listOne, addOne, removeOne, editOne}