const {
    Schema,
    model
} = require('mongoose')

const schema = new Schema({
    metaTitle: {
        type: String,
        required: false
    },
    metaDescription: {
        type: String,
        required: false
    },
    ogType: {
        type: String,
        required: false
    },
    ogTitle: {
        type: String,
        required: false
    },
    ogDescription: {
        type: String,
        required: false
    },
    ogImage: {
        type: String,
        required: false
    },
    vacancyTitle: {
        type: String,
        required: false
    },
    startDate: {
        type: String,
        required: false
    },
    endDate: {
        type: String,
        required: false
    },
    smallImage: {
        type: String,
        required: false
    },
    bigImage: {
        type: String,
        required: false
    },
    shortDescription: {
        type: String,
        required: false
    },
    longDescription: {
        type: String,
        required: false
    },
    show: {
        type: Boolean,
        default: false
    },
    url: {
        type: String,
        unique: true,
        required: true
    },
})

module.exports = model('vacancie', schema)