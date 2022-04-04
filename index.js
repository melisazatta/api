const express = require("express")
require("dotenv").config()
const port = process.env.port || 3030
require("./db/config")

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

//Users router
server.use("/users", require("./users/usersRoute"))

//404
server.use((req, res, next) =>{
    let error = new Error ( "Resource not found" );
    error.status = 404
    next(error)
})

//Error Handler
server.use((error, req, res, next)=>{
    if (!error.status) {
        error.status = 500
    }
    res.status(error.status).json({status: error.status, message: error.message})
})


//-------6--------
//     "status": 500,
//     "message": "ER_DUP_ENTRY"
//