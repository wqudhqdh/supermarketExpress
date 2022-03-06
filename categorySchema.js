var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/market')

var Schema = mongoose.Schema

var categorySchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }

})
module.exports = mongoose.model("category", categorySchema, "category");