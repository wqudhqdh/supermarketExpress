let products = require('../products')
let express = require("express")
let router = express.Router()
    //返回商品表的所有信息
router.get('/', function(req, res) {
    products.find(function(err, data) {
        if (err) return;
        else {
            res.send(data);
            return;
        }
    })
})
module.exports = router