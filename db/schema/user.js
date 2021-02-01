
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema({
    mail: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email.')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain password.')
            }
            /* add number in password
            if(value.includes()){
                throw new Error('Password need to contain a number.')
            } 
            add one Maj a t least in the password
            if(value.includes()){
                throw new Error('Password need to contain a number.')
            } 
            
            */
        }
    },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    tokenSession: { type: String, required: false },
    createIp: { type: String, required: true },
    isAdmin: { type: Number, required: false },
    resetPassword: { type: Object, required: false },
    mobile: { type: Number, required: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('user-data', userSchema);  