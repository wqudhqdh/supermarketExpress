var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/market')

var Schema = mongoose.Schema

var productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
})
module.exports = mongoose.model("product", productSchema, "product");