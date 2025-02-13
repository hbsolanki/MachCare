const mongoose = require('mongoose');

const mechanicSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
        length: 10,
    },
    email: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    rating:{
        type: Number,
        min:0,
        max:5
    },
    address:{
        type: String,
        required:true
    },
    isAvailable:{
        type: Boolean,
        default: false
    }
})

const Mechanic = mongoose.model("Mechanic",mechanicSchema);

module.exports = Mechanic;