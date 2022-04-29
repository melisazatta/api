const { matchedData } = require("express-validator");
const { addNewPost, getAllPosts, getPostsWith } = require("./postsModel")

const addOne = async (req, res, next) => {
    const cleanBody = matchedData(req);
    const dbResponse = await addNewPost({ userid: req.user.id, ...cleanBody})
    dbResponse instanceof Error ? next(dbResponse) : res.status(201).json({
        message: `Post created! by ${req.user.name}`
    })    
}

const listAll = async(req, res, next) => {
    let dbResponse = null
    if (req.query.title) {
        dbResponse = await getPostsWith(req.query.title)
    } else {
        dbResponse = await getAllPosts()
    }
    
    if (dbResponse instanceof Error) return next(dbResponse)
    dbResponse.length ? res.status(200).json(dbResponse) : next()

}

module.exports = { addOne, listAll }