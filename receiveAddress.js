let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/market')
let Schema = mongoose.Schema
let receiveAddressSchema = new Schema({
    userid: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    province: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    area: {
        type: String,
        require: true
    },
    info: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("receiveAddress", receiveAddressSchema, "receiveAddress")