const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    notes: [{
        title: {
            type: String,
            default: ''
        },
        note: {
            type: String,
            required: true
        },
        createdAt: {
            type: String,
            required: true
        },
        updatedAt: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        color: {
            type: Number,
            default: 0
        }
    }],
    categories:[{
        name:{
            type:String,
            required: true
        }
    }]
});

module.exports = mongoose.model('users', userSchema);
