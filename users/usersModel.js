const connection = require("../db/config")

const fetchAllUsers = async() => {
    try {
        const query = "SELECT * FROM users"
        const users = await connection.query(query)
        return users
    }catch (error) {
        console.log(error)
    }
}
const fetchUserById = async (id) => {
    try {
        const query = `SELECT * FROM users WHERE id = ${id}`
        const user = await connection.query(query)
        return user
    } catch (error) {
        console.log(error)
    }
} 

module.exports = { fetchAllUsers, fetchUserById }