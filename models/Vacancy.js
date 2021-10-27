const { Schema, model } = require('mongoose')

const schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    position: {type: String, required: true},
    skills: {type: Array, required: true},
    city: {type: String, required: false},
    address: {type: String, required: false},
    telephone: {type: String, required: false},
    fileName: {type: String | null | undefined, required: false},
    date: {type: String, required: false},
})

module.exports = model('Vacancy', schema)