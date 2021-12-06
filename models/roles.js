const { Schema, model } = require('mongoose');

const modelSchema = Schema({
    role: {
        type: String,
        required: [true, 'The role is required']
    }
})


module.exports = model( 'Rol', modelSchema )