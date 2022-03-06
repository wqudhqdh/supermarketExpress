let shoppingCart = require('../shoppingCart')
let express = require("express")
let router = express.Router()
    // 添加商品到购物车
router.post('/addToShoppingCart', (req, res) => {
    let product = req.body.product
    let id = req.body.userid
    shoppingCart.find({
        "productParameterid": product._id,
        "userid": id
    }).then(data => {
        // 判断该商品是否存在
        if (data.length === 0) {
            let cart = new shoppingCart({
                "userid": id,
                "productParameterid": product._id,
                "num": 1
            })
            cart.save().then(data => {
                    res.send("success")
                    return;
                })
                // 存在则修改数量
        } else {
            let product = data[0]._doc
            product.num += 1;
            shoppingCart.findByIdAndUpdate(product._id, product, (err, da) => {
                res.send("success")
                return;
            })
        }

    })

})

// 获取购物车信息
router.get('/getShoppingCart', (req, res) => {
        shoppingCart.find({ "userid": req.query.id }, (err, data) => {
            res.send(data)
        })
    })
    // 从购物车中删除商品
router.get('/deleteCart', (req, res) => {
        shoppingCart.remove({ "_id": req.query.id }, (err, data) => {
            if (err) {
                res.send("err")
            } else {
                res.send("success");
            }
            return
        })
    })
    // 从购物车中修改商品数量
router.get('/modifyCartNum', (req, res) => {
    shoppingCart.findOneAndUpdate({ "_id": req.query.id }, {
        $set: {
            num: req.query.num
        }
    }, (err, data) => {
        if (err) {
            res.send("err")
        } else {
            res.send("success");
        }
        return
    })
})
module.exports = router