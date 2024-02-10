const mongoose = require('mongoose')

const modelSchema = mongoose.Schema({
    name:{type:String, default:''},
    emaiil:{type:String, default:''},
    password:{type:String, default:''},
    createdAt:{type:Date, default:Date.now}
})

module.exports = mongoose.model('user',modelSchema)