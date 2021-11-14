const express = require('express');
const cors = require('cors');

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/usuarios';

        // Middlewares
        this.middlewares();

        // Rutas 
        this.routes()
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