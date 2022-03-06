var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/market')

var Schema = mongoose.Schema

var productParameterSchema = new Schema({
    pid: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    showInfoImg: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    // 库存
    inventory: {
        type: Number,
        required: true
    },
    //销量
    sales: {
        type: Number,
        default: 0
    },
    //类别：
    category: {
        type: String,
        required: true
    },
    //描述内容：
    info: {
        type: String,
        required: true
    }


})
module.exports = mongoose.model("productParameter", productParameterSchema, "productParameter");