let express = require("express")
let router = express.Router()
let category = require('../categorySchema')
    //返回导航栏的分类类别信息
router.get('/home/category', function(req, res) {
    category.find(function(err, data) {
        if (err) {
            return;
        } else {
            res.send(data)
            return;
        }
    })
})
module.exports = router