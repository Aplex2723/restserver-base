const { model, Schema } = require('mongoose');

const modelSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

})

//? Editing the function to not show the password  
modelSchema.methods.toJSON = function() {
    const { __v, _id, password, ...user } = this.toObject();

    user.uid = _id;
    
    return user
}



module.exports = model('User', modelSchema)