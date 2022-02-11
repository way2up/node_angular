const { Schema, model } = require('mongoose')

const schema = new Schema({
    tokenId: {type: String, required: false},
    userId: {type: String, required: false},
})

module.exports = model('Token', schema)