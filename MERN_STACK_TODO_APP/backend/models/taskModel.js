const { request } = require("express")
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const taskSchema = new Schema({
    value:{
        type: String,
        required: true
    }
},{timestamps:true})

module.exports = mongoose.model('Task',taskSchema)