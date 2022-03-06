let productParameter = require('../productParameter')
let express = require("express")
let router = express.Router()
let products = require('../products')
const { ObjectId } = require('mongoose/lib/schema/index')
const cleanPositionalOperators = require('mongoose/lib/helpers/schema/cleanPositionalOperators')
    // 检验商品是否有货
router.post('/checkproduct', function(req, res) {
        console.log(req.body.id)
        console.log(req.body.color)
        console.log(req.body.version)
        productParameter.find({ "pid": req.body.id, "color": req.body.color, "version": req.body.version }, (err, data) => {
            console.log(data)
            if (data.length === 0) {
                res.send('error')
                return
            } else {
                res.send('success')
                return
            }
        })
    })
    //返回商品的详细信息
router.post('/detail', function(req, res) {
    // db.col.find({"by":"菜鸟教程"}).pretty()
    productParameter.find({ "pid": req.query.id }, function(err, data) {
            console.log(data)
            return res.send(data)
        })
        // let data=products.find({"_id":req.query.id}).pretty();
        // console.log(data)
})

// 获取购物车商品的详细信息
router.get('/cartDetails', (req, res) => {
        var productslist = JSON.parse(req.query.res);
        let result = []
        let length = productslist.length
        productslist.forEach((item, index, arr) => {
            productParameter.find({ "_id": item.productParameterid }, (err, data) => {
                let carts = data[0]._doc
                carts.num = item.num
                carts.flag = "" //设置商品是否被选中
                carts.cartid = item._id
                result.push(carts)
                if (index === length - 1) {
                    res.send(result)
                }
            })

        })
    })
    // 根据商品详情id获取具体的商品信息
router.get('/productDetails', (req, res) => {
    productParameter.find({ "_id": req.query.id }, (err, data) => {
        res.send(data);
    })
})

// 修改库存
router.post('/modifyinventory', (req, res) => {
        let cartlist = req.body.cart
        let length = cartlist.length
        cartlist.forEach((item, index, arr) => {
            productParameter.findOneAndUpdate({ "_id": item._id }, {
                $set: {
                    inventory: item.inventory,
                    sales: item.sales
                }
            }, (err, data) => {
                if (err) {
                    res.send("fail")
                    return
                } else if (index === length - 1) {
                    res.send("success")
                    return
                }
            })
        })
    })
    //返回所有商品信息
router.get('/getAllProductPramarter', (req, res) => {
        productParameter.find((err, data) => {
            res.send(data)
            return;
        })
    })
    //删除商品信息
router.post('/deleteproduct', (req, res) => {
        console.log(req.body.pid)
        let p = new Promise((resolve, reject) => {
                productParameter.find({ "pid": req.body.pid }, (err, data) => {
                    let length = data.length
                    console.log(data.length)
                    resolve(length);
                })
            })
            // 查询商品参数是否小于1
        p.then((value) => {
            console.log(value)
            console.log(22222)
            if (value <= 1) {
                console.log(value)
                    //  删除总表
                return new Promise((resolve, reject) => {
                    products.remove({ '_id': req.body.pid }, (err, data) => {
                        if (err) reject(err)
                        resolve(data);
                    })
                })
            } else {
                return "ok";
            }
        }).then((value) => {
            console.log(444)
            return new Promise((resolve, reject) => {
                productParameter.remove({ "_id": req.body.id }, (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                })
            })
        }).then((value) => {
            res.send('success')
        }, (reason) => {
            res.send('error')
        })
    }, (reason) => {

    })
    //添加商品信息
router.post('/addproduct', (req, res) => {
    let product = JSON.parse(req.body.product)
        // 先查找该商品是否存在
    new Promise((resolve, reject) => {
        console.log(1111)
        products.find({ "name": product.name, "category": product.category }, (err, data) => {
            resolve(data)
        })
    }).then((value) => {
        console.log(2222)
        console.log(value)
        if (value.length === 0) {
            // 如果不存在添加到商品表
            return new Promise((resolve, reject) => {
                console.log(3222)
                let prod = new products({
                    "name": product.name,
                    "category": product.category,
                    "img": product.imageUrl,
                    "info": product.info,
                    "price": product.price
                })
                prod.save((err, data) => {
                    console.log(data)
                    resolve(data);
                })
            })
        } else {
            console.log(3333)
            return value
                // resolve(value)
        }

    }, (reason) => {
        res.send(reason);
        return;
    }).then((value) => {
        console.log(value)
        console.log(4444)
        let pid
        if (value.id == undefined) {
            pid = value[0].id
        } else {
            pid = value.id
        }
        console.log(pid)
            // 保存到详情表
            // 判断该参数是否存在
        return new Promise((resolve, reject) => {
            productParameter.find({ "version": product.version, "color": product.color, "name": product.name }, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    let result = {
                        "productlist": data,
                        "id": pid
                    }
                    resolve(result)
                }
            })
        })

    }, (reason) => {}).then((value, pid) => {
        console.log(value);
        // 如果不存在则加入一条数据
        return new Promise((resolve, reject) => {
            if (value.productlist.length == 0) {
                let s = new productParameter({
                    "name": product.name,
                    "pid": value.id,
                    "version": product.version,
                    "price": product.price,
                    "inventory": product.num,
                    "showInfoImg": product.imageUrl,
                    "category": product.category,
                    "info": product.info,
                    "color": product.color
                });
                s.save((err, data) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(data)
                })
            } else {
                let nums = parseInt(value.productlist[0].inventory) + parseInt(product.num);
                let showInfoImg = product.imageUrl;
                //添加原有的数据则修改
                productParameter.findOneAndUpdate({ "_id": value.productlist[0]._id }, { $set: { "inventory": nums, "showInfoImg": showInfoImg } }, (err, data) => {
                    resolve(data);
                })
            }
        })

    }, (reason) => {}).then((value) => {
        res.send(value)
    }, (reason) => {
        res.send(reason)

    })
})
module.exports = router