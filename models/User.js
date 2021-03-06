const { Schema, model } = require('mongoose')

const schema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
    fullName: {type: String, required: true},
})

module.exports = model('User', schema)