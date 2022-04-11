const { getAllUsers, getUserById, registerNewUser, loginUser, deleteUserById, editUserById } = require("./usersModel")
const notNumber = require("../util/notNumber")
const { hashPassword, checkPassword } = require("../util/handlePassword")
const { tokenSign } = require("../util/handleJWT")

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
//Register new user
const register = async(req, res, next) => {
    const image = `${process.env.public_url}/${req.file.filename}`
    const password = await hashPassword(req.body.password)
    const dbResponse = await registerNewUser({...req.body, password, image })
    if (dbResponse instanceof Error) return next(dbResponse)
    
    const user = {
        name: req.body.name,
    }
    const tokenData = {
    token: await tokenSign(user),
    user: user
    }
    res.status(201).json({message: `User ${req.body.name} created`, JWT: tokenData})
}
//Login
const login = async (req, res, next) => {
    const dbResponse = await loginUser(req.body.email);
    if (!dbResponse.length) return next();
    const passwordMatch = await checkPassword(req.body.password, dbResponse[0].password)
    if (passwordMatch) {
        const user = {
            id: dbResponse[0].id,
            name: dbResponse[0].name,
            email: dbResponse[0].email,
            image: dbResponse[0].image
        }
        const tokenData = {
            token: await tokenSign(user),
            user: user
            }
        res.status(200).json({ message: `User ${user.name} authorized`, JWT: tokenData})
    }
    else {
        const error = {
        message: "Unauthorized",
        status: 401
        }
        next(error)
    }
}

//delete user by id
const removeOne = async(req, res, next) => {
    if (notNumber(+req.params.id, next)) return;
    const dbResponse = await deleteUserById(+req.params.id) 
    if (dbResponse instanceof Error) return next(dbResponse);
    dbResponse.affectedRows ? res.status(204).end() : next() 
}
//Edit user by id
const editOne = async(req, res, next) => {
    if (notNumber(+req.params.id, next)) return;
    const image = `${process.env.public_url}/${req.file.filename}`
    const dbResponse = await editUserById(+req.params.id, { ...req.body, image})
    if (dbResponse instanceof Error) return next(dbResponse);
    dbResponse.affectedRows ? res.status(200).json({message: `User ${req.body.name} updated`}) : next()

}

module.exports = {listAll, listOne, register, login, removeOne, editOne}