let mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/market")
let Schema = mongoose.Schema
let shoppingCartSchema = new Schema({
    "userid": {
        type: String,
        require: true
    },
    "productParameterid": {
        type: String,
        required: true
    },
    "num": {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model("shoppingCart", shoppingCartSchema, "shoppingCart");