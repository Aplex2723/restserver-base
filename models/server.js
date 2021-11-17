const express = require('express');
const cors = require('cors');
const { dbConnect } = require('../database/config')

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/usuarios';

        // Database connection
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes()
    }

    async connectDB() {
        await dbConnect();
    }
    
    middlewares() {

        // CORS
        this.app.use( cors() );

        // POST
        this.app.use( express.json() )

        this.app.use( express.static('public') );
    }
    // Endpoints:
    routes() {

        this.app.use(this.usersPath , require('../routes/user'))


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }

}

module.exports = Server