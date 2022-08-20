const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload')
const { dbConnect } = require('../database/config')

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        
        this.paths = {
            authPath:       '/api/auth',
            searchPath:     '/api/search',
            categoriesPath: '/api/categories',
            uploadsPath:    '/api/uploads',
            userPath:       '/api/usuarios',
            productsPath:   '/api/products'
        }

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

        // FILE UPLOAD
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }
    // Endpoints:
    routes() {

        this.app.use(this.paths.authPath , require('../routes/auth'))
        this.app.use(this.paths.searchPath , require('../routes/search'))
        this.app.use(this.paths.productsPath , require('../routes/products'))
        this.app.use(this.paths.categoriesPath , require('../routes/categories'))
        this.app.use(this.paths.userPath , require('../routes/user'))
        this.app.use(this.paths.uploadsPath , require('../routes/uploads'))


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        })
    }

}

module.exports = Server