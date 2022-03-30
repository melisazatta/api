const express = require("express")
require("dotenv").config()
const port = process.env.port || 3030

const server = express()
server.use(express.json())

server.listen(port, (err) => {
    err? console.log(`Error: ${err}`) : console.log(`Servidor en http://localhost:${port}`)
})

server.get("/", (req, res) => {
    const content = `<h1>Server con Express</h1>
    <p>Hola ke asé</p>`

    res.send(content)
});

//get all users
server.use("/users", require("./users/usersRoute"))

//404
server.use((req, res) => {
    res.status(404).json({ message: "Resource not found"})   
})



//hasta clase 4 min 02:01 comienza con base de datos mysql