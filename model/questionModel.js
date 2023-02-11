const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question:{
        type: String
    },
    media:{
        type: String
    },
    option1:{
        type: String
    },
    option2:{
        type: String
    },
    option3:{
        type: String
    },
    option4:{
        type: String
    },
    mark:{
        type: String
    }

},{timestamps:true});
module.exports = mongoose.model("Question", questionSchema)