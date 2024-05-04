const { request } = require("express")
const mongoose = require("mongoose")

const Schema = mongoose.Schema


const personSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true
    },
    profession:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps:true})


module.exports = mongoose.model('Person',personSchema) 