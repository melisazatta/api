const connection = require("../db/config")

//get all users
const getAllUsers = async() => {
    const query = "SELECT * FROM users"
    try {        
        return await connection.query(query)
    }catch (error) {
        return { "error": error.code }
    }
}
//get user by id
const getUserById = async(id) => {
    const query = `SELECT * FROM users WHERE id = ${id}`
    try {        
        return await connection.query(query)        
    } catch (error) {
        return { "error": error.code }
    }
} 
//add new user
const addNewUser = async(user) => {
    const query = `INSERT INTO users SET ?`
    try {        
        return await connection.query(query, user)        
    } catch (error) {
        return { "error": error.code }
    }
}
//delete user
const deleteUserById = async(id) => {
    const query = `DELETE FROM users WHERE id = ${id}`
    try {
        return await connection.query(query)
    } catch (error) {
        return {"error": error.code}
    }
}
//edit user
const editUserById = async(id, user) => {
    const query = `UPDATE users SET ? WHERE id = ${id}`
    try {
        return await connection.query(query, user)
    } catch (error) {
        return {"error": error.code}
    }
}

module.exports = { getAllUsers, getUserById, addNewUser, deleteUserById, editUserById }