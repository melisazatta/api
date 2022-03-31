const mysql = require("mysql")
const util = require("util")

const connection =mysql.createConnection({
    host: process.env.db_host,
    database: process.env.db_name,
    user: process.env.db_user,
    pass: process.env.db_pass //check
});

connection.connect((err)=> {
    err ? console.warn("No conectado", { "error": err.message }) : console.log("Conexión establecida...")
})

connection.query = util.promisify(connection.query)

module.exports = connection