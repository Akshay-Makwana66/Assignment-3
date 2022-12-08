const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    }
},{timestamps:true});
module.exports = mongoose.model("Student", studentSchema)