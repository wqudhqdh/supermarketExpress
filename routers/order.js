let order = require('../orderSchema')
let productParameter = require('../productParameter')
let receiveAddress = require('../receiveAddress')
let express = require("express")
let router = express.Router()
    // 生成订单并保存
router.post('/order', (req, res) => {
    console.log("进来了")
    let cartlist = JSON.parse(req.body.cart)
    console.log(cartlist)
        // 获取所有要购买的商品的id
    let carts = []
    cartlist.forEach((item, index, arr) => {
        let cart = {}
        cart.paramerid = item._id
        cart.num = item.num
        carts.push(cart);
    })
    let address = req.body.address
    let dates = new Date();
    let oid = "" + dates.getFullYear() + (dates.getMonth() + 1) + (dates.getDay() + 1) + dates.getHours() + dates.getMinutes() + dates.getMilliseconds()
    let length = cartlist.length;
    let state = req.body.state
    let orderlist = new order({
        "orderid": oid,
        "userid": address.userid,
        "addressid": address,
        "product": carts,
        "date": dates,
        "state": state
    })
    orderlist.save((err, data) => {
        if (err) {
            console.log(err)
            res.send("error")
            retrun

        } else {
            res.send(data)
            return
        }
    })
})

// 显示订单详细
router.post('/showOrder', (req, res) => {
        order.find({ "orderid": req.body.orderid }, (err, data) => {
            res.send(data);
        })
    })
    //查询用户所有订单
router.post('/findOrderByState', (req, res) => {
        console.log(11111)
        let p = new Promise((resolve, reject) => {
            order.find({ "userid": req.body.id }).sort({ date: -1 }).exec((err, data) => {
                if (err) reject(exec)
                resolve(data)
            })
        }).then((value) => {
            console.log(value)
            if (value.length === 0) {
                res.send(value)
                return;
            } else {
                let orderlist = value
                let len0 = 0
                let len1 = 0
                let len2 = 0
                let len3 = 0
                orderlist.forEach((element, index, arr) => {
                    console.log(element)
                    len0++
                    element._doc.product.forEach((item, ind, arr) => {
                        console.log(item)
                        len1++
                        productParameter.find({ "_id": item._doc.paramerid }, (err, data) => {
                            len2++
                            console.log(data[0]._doc)
                            orderlist[index]._doc.product[ind]._doc.color = data[0]._doc.color;
                            orderlist[index]._doc.product[ind]._doc.showInfoImg = data[0]._doc.showInfoImg;
                            orderlist[index]._doc.product[ind]._doc.version = data[0]._doc.version;
                            orderlist[index]._doc.product[ind]._doc.price = data[0]._doc.price;
                            orderlist[index]._doc.product[ind]._doc.inventory = data[0]._doc.inventory;

                            orderlist[index]._doc.product[ind]._doc.name = data[0]._doc.name;
                            orderlist[index]._doc.product[ind]._doc.sales = data[0]._doc.sales;
                            if (len2 === len1 && len3 === len0) {
                                res.send(orderlist)
                                return;

                            }
                        })

                    })
                    receiveAddress.find({ "_id": element._doc.addressid }, (err, data) => {
                        len3++
                        orderlist[index]._doc.address = data
                        if (len2 === len1 && len3 === len0) {
                            res.send(orderlist)
                            return;
                        }
                    })
                })
            }
        })
    })
    // 修改订单的状态
router.post('/modifyOrderByState', (req, res) => {
        order.findOneAndUpdate({ 'orderid': req.body.id }, { $set: { state: req.body.state } }, (err, data) => {
            if (err) {
                res.send('error')
            } else {
                res.send('success')
            }
        })
    })
    // 删除订单
router.post('/deleteOrder', (req, res) => {
    order.deleteOne({ "orderid": req.body.id }, (err, data) => {
        if (err) {
            res.send('error')
            return;
        } else {
            res.send("success");
            return;
        }
    })
})
module.exports = router