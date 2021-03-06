const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: true
  },

  backgroundColor: {
    type: String,
    required: true
  },
  colorWhite: {
    type: Boolean,
    required: true
  },
})

module.exports = model('Status', schema)