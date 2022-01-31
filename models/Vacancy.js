const { Schema, model } = require('mongoose')

const schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    position: {type: String, required: true},
    skills: {type: Array, required: true},
    statusId: {type: String, required: false},
    languages: {type: Array, required: true},
    education: {type: Array, required: true},
    socialLinks: {type: Array, required: true},
    workExperience: {type: Array, required: true},
    city: {type: String, required: false},
    address: {type: String, required: false},
    telephone: {type: String, required: false},
    fileName: {type: String, required: false},
    photoName: {type: String, required: false},
    date: {type: String, required: false},
    motivation_letter: {type: String, required: false},
    interests_hobby: {type: String, required: false},
    dateOfBirth: {type: String, required: false},
    user_id: {type: String, required: false},
})

module.exports = model('Vacancy', schema)