const { Schema, model } = require('mongoose');

const categorySchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

//? Editing the function to not show the password  
categorySchema.methods.toJSON = function() {
    const { __v, state, ...data } = this.toObject();
    return data;
}


module.exports = model( 'Category', categorySchema )