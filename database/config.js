const mongoose = require('mongoose');

const dbConnect = async () => {

    try {
        
        await mongoose.connect( process.env.MONGO_CNN )
        console.log('La base de datos se a conectado exitosamente!')
        
    } catch (error) {

        console.log(error)
        throw new Error('Ops!, ocurrio un error con la base de datos...');
        
    }

}

module.exports = {
    dbConnect
}