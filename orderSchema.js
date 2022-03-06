let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/market')
let Schema = mongoose.Schema
let OrderSchema = new Schema({
    "orderid": {
        type: String,
        require: true

    },
    "userid": {
        type: String,
        required: true
    },
    "addressid": {
        type: String,
        required: true
    },
    "product": [{
        "paramerid": {
            type: String,
            required: true
        },

        "num": {
            type: Number,
            required: true
        },
    }],
    // "paramerid": {
    //     type: String,
    //     required: true
    // },
    // "addressid": {
    //     type: String,
    //     required: true
    // },
    // "num": {
    //     type: Number,
    //     required: true
    // },
    "date": {
        type: Date,
        default: Date.now
    },
    "state": {
        type: Number,
        required: true
    }

})
module.exports = mongoose.model('order', OrderSchema, "order");