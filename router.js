let products = require('./products')
let category = require('./categorySchema')
let categoryProduct = require('./categoryProductsSchema')
let productParameter = require('./productParameter')
let receiveAddress = require('./receiveAddress')
let shoppingCart = require('./shoppingCart')
let order = require('./orderSchema')

// let user = require('./user')
let alipaySdk = require('./pay')
const AlipaySdk = require('alipay-sdk').default
const AlipayFormData = require('alipay-sdk/lib/form').default

// const jwt = require('jsonwebtoken'); //token
// const Mail = require('./mail.js')
let express = require("express")
let router = express.Router()

//返回导航栏的分类类别信息
// router.get('/home/category', function(req, res) {
//         category.find(function(err, data) {
//             if (err) {
//                 return;
//             } else {
//                 res.send(data)
//                 return;
//             }
//         })
//     })
//     //返回导航栏的分类的商品
// router.get('/home/category/products', function(req, res) {
//     categoryProduct.find(function(err, data) {
//         if (err) {
//             return;
//         } else {
//             res.send(data)
//             return;
//         }
//     })
// })

// //返回商品表的所有信息
// router.get('/', function(req, res) {
//         products.find(function(err, data) {
//             if (err) return;
//             else {
//                 res.send(data);
//                 return;
//             }
//         })
//     })
//     //返回商品的详细信息
// router.post('/detail', function(req, res) {
//         // db.col.find({"by":"菜鸟教程"}).pretty()
//         productParameter.find({ "pid": req.query.id }, function(err, data) {
//                 return res.send(data)
//             })
//             // let data=products.find({"_id":req.query.id}).pretty();
//             // console.log(data)
//     })
//     //查询用户名是否注册过 
// router.get('/checkUsername', (req, res) => {
//         user.find({ "username": req.query.username }, (err, data) => {
//             if (data.length === 0) {
//                 res.send("1");
//                 return
//             } else {
//                 res.send("0")
//                 return
//             }

//         })
//     })
//     //查询手机号是否注册过 
// router.get('/checkPhone', (req, res) => {
//         user.find({ "phone": req.query.phone }, (err, data) => {
//             if (data.length === 0) {
//                 res.send("1")
//                 return
//             } else {
//                 res.send("0")
//                 return
//             }

//         })
//     })
//     //查询邮箱是否注册过 
// router.get('/checkEmail', (req, res) => {
//         user.find({ "email": req.query.email }, (err, data) => {
//             if (data.length === 0) {
//                 res.send("1")
//                 return
//             } else {

//                 res.send("0")
//                 return
//             }

//         })
//     })
//     // 发送邮件
// let codeObj = {}
// router.get('/getCode', (req, res) => {
//         let mail = req.query.email; //获取数据
//         console.log(mail)
//         let code = Math.floor(Math.random() * 11000 + 1001);
//         codeObj[mail] = code;
//         Mail.send(mail, code, (state) => {
//             console.log(state)
//             res.send("" + state);
//         })
//     })
//     // 注册
// router.post("/register", (req, res) => {
//         // 新建表单
//         const multiparty = require('multiparty');
//         // 设置编辑
//         const form = new multiparty.Form();
//         form.encoding = 'utf-8';
//         // 表单解析
//         form.parse(req, function(err, fields, files) {
//             if (err) {
//                 console.log("err")
//             } else {
//                 let s = new user({
//                     "username": fields.username[0],
//                     "phone": fields.phone[0],
//                     "email": fields.email[0],
//                     "password": fields.password[0],
//                     "paypassword": fields.paypassword[0],
//                     "account": 0,
//                     "imgSrc": " ",
//                     "level": 0

//                 });
//                 s.save((err, data) => {
//                         if (err) {
//                             res.send("faile")
//                         } else {
//                             res.send("success")
//                         }
//                     })
//                     // console.log(files);
//             }
//         })
//     })
//     // 账号登录(手机号/用户名)
// router.post('/loginAccount', (req, res) => {
//         user.find({
//             $or: [{
//                 "username": req.body.account,
//                 "password": req.body.password
//             }, {
//                 "phone": req.body.account,
//                 "password": req.body.password
//             }]
//         }, (err, data) => {
//             if (data.length === 0) {
//                 res.send(data)
//             } else {
//                 let content = {
//                     username: data.username
//                 };
//                 // 生成token主体
//                 let token = jwt.sign(content, "supermarett", { expiresIn: 3600 });
//                 res.json({ data, token: token });
//                 console.log(data.username)
//             }

//         })
//     })
//     // 邮箱登录
// router.post('/loginEmail', (req, res) => {
//     user.find({ "email": req.body.account }, (err, data) => {
//         if (data.length === 0) {
//             res.send(data)
//         } else {
//             let content = {
//                 username: data.username
//             };
//             // 生成token主体
//             let token = jwt.sign(content, "supermarett", { expiresIn: 3600 });
//             res.json({ data, token: token });
//             console.log(data.username)
//         }

//     })
// })


// // 读取收货地址
// router.get('/address', (req, res) => {
//         receiveAddress.find({ "userid": req.query.id }, (err, data) => {
//             if (err) {
//                 return
//             } else {
//                 res.send(data);
//                 return
//             }

//         })
//     })
//     // 保存收货地址
// router.post('/saveAddress', (req, res) => {
//         let value = req.body.address;
//         let address = new receiveAddress({
//             "userid": req.body.id,
//             "name": value.name,
//             "phone": value.phone,
//             "province": value.province,
//             "city": value.city,
//             "area": value.area,
//             "info": value.info
//         })
//         address.save((err, data) => {
//             if (err) {
//                 res.send("faile")
//                 return
//             } else {
//                 res.send(data)
//                 return
//             }
//         })

//     })
//     // 删除收货地址
// router.post('/deleteAddress', (req, res) => {
//         let id = req.body.id
//         receiveAddress.remove({ "_id": id }, (err, data) => {
//             if (err) return res.send('fail')
//             else {
//                 res.send('success')
//             }
//         })
//     })
//     // 修改收货地址
// router.post('/modifyAddress', (req, res) => {
//         let address = req.body.address
//         receiveAddress.findByIdAndUpdate(address._id, address, (err, data) => {
//             console.log(data)
//             if (err) return res.send('fail')
//             else {
//                 res.send('success')
//             }
//         })
//     })
//     // 获取收货地址
// router.post('/getAddress', (req, res) => {
//         let address = req.body.id
//         receiveAddress.findById({ '_id': address }, (err, data) => {
//             res.send(data)
//         })
//     })
//     // 添加商品到购物车
// router.post('/addToShoppingCart', (req, res) => {
//         let product = req.body.product
//         let id = req.body.userid
//         shoppingCart.find({
//             "productParameterid": product._id,
//             "userid": id
//         }).then(data => {
//             // 判断该商品是否存在
//             if (data.length === 0) {
//                 let cart = new shoppingCart({
//                     "userid": id,
//                     "productParameterid": product._id,
//                     "num": 1
//                 })
//                 cart.save().then(data => {
//                         res.send("success")
//                         return;
//                     })
//                     // 存在则修改数量
//             } else {
//                 let product = data[0]._doc
//                 product.num += 1;
//                 shoppingCart.findByIdAndUpdate(product._id, product, (err, da) => {
//                     res.send("success")
//                     return;
//                 })
//             }

//         })

//     })
//     //账户充值
// router.post('/changeAccount', (req, res) => {
//         user.findOneAndUpdate({ "_id": req.body.id }, { $set: { "account": req.body.account } }, (err, data) => {
//             if (err) {
//                 res.send("error")
//             } else {
//                 res.send("success");
//             }
//         })
//     })
//     // 修改头像
// router.post('/saveImgsrc', (req, res) => {
//         user.findOneAndUpdate({ "_id": req.body.id }, { $set: { "imgSrc": req.body.img } }, (err, data) => {
//             if (err) {
//                 res.send("error")
//             } else {
//                 res.send("success")
//             }
//         })
//     })
//     // 修改用户名
// router.post('/modifyUsername', (req, res) => {
//         user.findOneAndUpdate({ "_id": req.body.id }, { $set: { 'username': req.body.value } }, (err, data) => {
//             if (err) {
//                 res.send("error")
//             } else {
//                 res.send("success");
//             }
//         })
//     })
//     // 修改登录密码
// router.post('/modifyPassword', (req, res) => {
//         user.findOneAndUpdate({ "_id": req.body.id }, { $set: { 'password': req.body.value } }, (err, data) => {
//             if (err) {
//                 res.send("error")
//             } else {
//                 res.send("success");
//             }
//         })
//     })
//     // 修改支付密码
// router.post('/modifyPayPassword', (req, res) => {
//         user.findOneAndUpdate({ "_id": req.body.id }, { $set: { 'paypassword': req.body.value } }, (err, data) => {
//             if (err) {
//                 res.send("error")
//             } else {
//                 res.send("success");
//             }
//         })
//     })
// 获取购物车信息
// router.get('/getShoppingCart', (req, res) => {
//         shoppingCart.find({ "userid": req.query.id }, (err, data) => {
//             res.send(data)
//         })
//     })
//     // 获取购物车商品的详细信息
// router.get('/cartDetails', (req, res) => {
//         var productslist = JSON.parse(req.query.res);
//         let result = []
//         let length = productslist.length
//         productslist.forEach((item, index, arr) => {
//             productParameter.find({ "_id": item.productParameterid }, (err, data) => {
//                 let carts = data[0]._doc
//                 carts.num = item.num
//                 carts.flag = "" //设置商品是否被选中
//                 carts.cartid = item._id
//                 result.push(carts)
//                 if (index === length - 1) {
//                     res.send(result)
//                 }
//             })

//         })
//     })
//     // 根据商品详情id获取具体的商品信息
// router.get('/productDetails', (req, res) => {
//         productParameter.find({ "_id": req.query.id }, (err, data) => {
//             res.send(data);
//         })
//     })
//     // 从购物车中删除商品
// router.get('/deleteCart', (req, res) => {
//         shoppingCart.remove({ "_id": req.query.id }, (err, data) => {
//             if (err) {
//                 res.send("err")
//             } else {
//                 res.send("success");
//             }
//             return
//         })
//     })
//     // 从购物车中修改商品数量
// router.get('/modifyCartNum', (req, res) => {
//         shoppingCart.findOneAndUpdate({ "_id": req.query.id }, {
//             $set: {
//                 num: req.query.num
//             }
//         }, (err, data) => {
//             if (err) {
//                 res.send("err")
//             } else {
//                 res.send("success");
//             }
//             return
//         })
//     })
//     // 生成订单并保存
// router.post('/order', (req, res) => {
//         console.log("进来了")
//         let cartlist = JSON.parse(req.body.cart)
//         console.log(cartlist)
//             // 获取所有要购买的商品的id
//         let carts = []
//         cartlist.forEach((item, index, arr) => {
//             let cart = {}
//             cart.paramerid = item._id
//             cart.num = item.num
//             carts.push(cart);
//         })
//         let address = req.body.address
//         let dates = new Date();
//         let oid = "" + dates.getFullYear() + (dates.getMonth() + 1) + (dates.getDay() + 1) + dates.getHours() + dates.getMinutes() + dates.getMilliseconds()
//         let length = cartlist.length;
//         let state = req.body.state
//         let orderlist = new order({
//             "orderid": oid,
//             "userid": address.userid,
//             "addressid": address,
//             "product": carts,
//             "date": dates,
//             "state": state
//         })
//         orderlist.save((err, data) => {
//             if (err) {
//                 console.log(err)
//             }
//             res.send(data)
//         })
//     })
//     // 修改库存
// router.post('/modifyinventory', (req, res) => {
//         let cartlist = req.body.cart
//         let length = cartlist.length
//         cartlist.forEach((item, index, arr) => {
//             productParameter.findOneAndUpdate({ "_id": item._id }, {
//                 $set: {
//                     inventory: item.inventory,
//                     sales: item.sales
//                 }
//             }, (err, data) => {
//                 if (err) {
//                     res.send("fail")
//                     return
//                 } else if (index === length - 1) {
//                     res.send("success")
//                     return
//                 }
//             })
//         })
//     })
//     // 显示订单详细
// router.post('/showOrder', (req, res) => {
//         order.find({ "orderid": req.body.orderid }, (err, data) => {
//             res.send(data);
//         })
//     })
//     //查询所有订单
// router.post('/findOrderByState', (req, res) => {
//     let p = new Promise((resolve, reject) => {
//             order.find({ "userid": req.body.id }).sort({ date: -1 }).exec((err, data) => {
//                 if (err) reject(exec)
//                 resolve(data)
//             })
//         }).then((value) => {
//             if (value.length === 0) {
//                 res.send(value)
//                 return;
//             } else {
//                 let orderlist = value
//                 let len0 = 0
//                 let len1 = 0
//                 let len2 = 0
//                 let len3 = 0
//                     // let length2 = orderlist.length
//                 orderlist.forEach((element, index, arr) => {
//                     len0++
//                     // let length = element._doc.product.length;
//                     element._doc.product.forEach((item, ind, arr) => {
//                         len1++
//                         productParameter.find({ "_id": item._doc.paramerid }, (err, data) => {
//                             len2++
//                             console.log(data[0]._doc)
//                             orderlist[index]._doc.product[ind]._doc.color = data[0]._doc.color;
//                             orderlist[index]._doc.product[ind]._doc.showInfoImg = data[0]._doc.showInfoImg;
//                             orderlist[index]._doc.product[ind]._doc.version = data[0]._doc.version;
//                             orderlist[index]._doc.product[ind]._doc.price = data[0]._doc.price;
//                             orderlist[index]._doc.product[ind]._doc.inventory = data[0]._doc.inventory;

//                             orderlist[index]._doc.product[ind]._doc.name = data[0]._doc.name;
//                             orderlist[index]._doc.product[ind]._doc.sales = data[0]._doc.sales;
//                             if (len2 === len1 && len3 === len0) {
//                                 res.send(orderlist)
//                                 return;

//                             }
//                         })

//                     })
//                     receiveAddress.find({ "_id": element._doc.addressid }, (err, data) => {
//                         len3++
//                         orderlist[index]._doc.address = data
//                         if (len2 === len1 && len3 === len0) {
//                             res.send(orderlist)
//                             return;
//                         }
//                     })
//                 })
//             }
//         })
// order.find({ "userid": req.body.id }).sort({ date: -1 }).exec((err, data) => {
//     let orderlist = data
//     let len0 = 0
//     let len1 = 0
//     let len2 = 0
//     let len3 = 0
//         // let length2 = orderlist.length
//     orderlist.forEach((element, index, arr) => {
//             len0++
//             // let length = element._doc.product.length;
//             element._doc.product.forEach((item, ind, arr) => {
//                 len1++
//                 productParameter.find({ "_id": item._doc.paramerid }, (err, data) => {
//                     len2++
//                     console.log(data[0]._doc)
//                     orderlist[index]._doc.product[ind]._doc.color = data[0]._doc.color;
//                     orderlist[index]._doc.product[ind]._doc.showInfoImg = data[0]._doc.showInfoImg;
//                     orderlist[index]._doc.product[ind]._doc.showInfoImg = data[0]._doc.showInfoImg;
//                     orderlist[index]._doc.product[ind]._doc.version = data[0]._doc.version;
//                     orderlist[index]._doc.product[ind]._doc.price = data[0]._doc.price;
//                     orderlist[index]._doc.product[ind]._doc.name = data[0]._doc.name;
//                     if (len2 === len1 && len3 === len0) {
//                         res.send(orderlist)
//                         return;

//                     }
//                 })

//             })
//             receiveAddress.find({ "_id": element._doc.addressid }, (err, data) => {
//                 len3++
//                 orderlist[index]._doc.address = data
//                 if (len2 === len1 && len3 === len0) {
//                     res.send(orderlist)
//                     return;
//                 }
//             })
//         })
// res.send(orderlist)
// return;
// })
// })

// // 修改订单的状态
// router.post('/modifyOrderByState', (req, res) => {
//         order.findOneAndUpdate({ 'orderid': req.body.id }, { $set: { state: req.body.state } }, (err, data) => {
//             if (err) {
//                 res.send('error')
//             } else {
//                 res.send('success')
//             }
//         })
//     })
// router.get('/pays', (req, res) => {

//     // 初始化插件
//     const alipaySdk = new AlipaySdk({
//         appId: '2016100100639372',
//         // appId: "2016110100784467",
//         gateway: 'https://openapi.alipaydev.com/gateway.do',
//         signType: 'RSA2', // 注意这里默认是RSA2, 但是我自己只能用RSA, 所以是RSA, 正常不要配置
//         // alipayPublicKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgxJ7zfe9FLnAoVvamBHWXjCkQmPY+u59MZGQ/aasq5UXUqvp99eBKyNq8NIg9Rq+BRxwsYXR4CUgyNbon4s8RDPm0OMt+yLOUblUgqpJ0BCHCnljHCAPoLnH153tpr144NgD/e30Rz2LLofsn8RQsrrNx4MDYktiVeIVtuUaem/CI0z3+I05qlWPsUMzLagato/eUO0wrh7zyjDTw7grGfvgWvU3JCzWmmAJJaELj+mcxjDPJDhGnTmT+saq2kxYHTLem5lSTSHtH6urBLrq4Cc7yYvAsmMnesuwYKy1P+Qp0J/R/D/5t0k3QgNqF0eDYLXuH9uiWqp7f691U8WSNQIDAQAB",
//         // privateKey: "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC+u9fJ7gQtlU761V5USwWpQl7CVdMKwxH3DhFyMHPeEFZQC4ciFkULY12XA0tyCFQna7xm1rI7VYuugmM/TVdv6ud5/i2SkKQc86c7YRcykaNHWqXuSzmj+Ox2RgToxzEcHMTv2kF1bv/Rn6OwuDfWPmogSmPDuwFOjLUf0dEjZFp/6xKcxygyO5JoGL/QqIQCICB4w1habeb2aXP8aOjqwmVCuNQ2R7LD0phrt7PRcPBRPj9dLhgOTNESMHugXJ/IzLfDFLtK3k8FuTxZOai14QVUnlHOKaCQddoouOwltuRpKF1A6spMW7EjiEsEVkAWsZhvh86qo5mklZ5i0WfrAgMBAAECggEALBCv0Qo5UuKs5YyIB4dxnmIkDFfRsynQK7jHVQ9WpZY2qrWPGdP1TaU+SRZMxuKftp/QXh35/XVNGRssnMJckhG+OtP7aWIbWEj+eNx8hIVbKLALp9sfTP/EearBlZn3gZwv744IE356gc6U/c4BsHCpCh7Fn8HDkoc1jU1nOPqfCX1RMudtaP0wriv+4uKpNzHPR2dV3iWTm++zGRzyzJdu1NTWnhJs1MlVtha/8Mp18npxE8Ygjj2O4gabqaMyIoqegcwkvOl5BX77pPeW5fNHeW9iPWlzb21QYXJttYDjm9cErjHmne6rHcwUuMSui6KlH3L9PxgmAS/HGHVn8QKBgQDsvBk2xPO2g79jXHv4Ie8xSeg8b/3ztWyGWL8sQJkLBFyzyHc2kKCf1/zonS16+beDbawP2+mZf8o7A0cdF6ltYK8BG/QZGXIJ0f1joDqLCVKunqNXxFesQ6EG1gugJZ5gAUn23Lq6M/N6ABoyXBST7aEAPISsjWUe1yYxigpTGQKBgQDOQWeIAsLRhkSyu8vmoCyMMQG6Lxt/6JhRHqYndb7b7ffNgZDnzlCkqY24EUirlhk+86B2lNffniXYXEo9K75gc252yQiMQ0Ygqj1xJY6hi5U62gwGc7xDpnJTA6LyW1HdyNuZ9NLWORW9FysqrvZK4oXE6ytcpbvH/14StSlXowKBgBShI5VZPl+mRXRUJ91sn5ps9Vbm73tgUO+4JhimHHAQVj+4dWME4WpsePaQU9lGj45dbUQIhufAchAIbhcD69jDNxziobfaNszSRsF6wf9BtbnPyy4nxvgVAKBG4MZ44L8+/YIMpBz7z/jOr3m5+nUVnRUXMPyUab5xQzvH6rRpAoGAH458M6AQhJQhcKMw+DErf6uD0yOf9nr0yvyAeWsXb3jCQCwBqqWzSu4yI6ZpUu9dH3eQ5nOxb6I3shm0thU6RHGExiHN7//e++JwEh6n6ul7RIzV6CrO9B7EQRU+WgxEw0UW7EA7/dCwFcU0sowgXKa5xr4gXUVyLJBSqVQUZjcCgYB5Uu9/3L/hr0VI5IwA/567wP7+WK1tudZs6nsjpxcC4g0gDLWpG3JlGROQweIMMTr9Qwu8lKhYEYlELNRMfXn7P+Wm5r4mCpanhpTN+DsfebwQ939X3UuLdVymdn7FOwi/IEFxd9eTBzOZxIeWwHUlXLmxLszD9jyrY0fslpI3Ww=="
//         alipayPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAljVfHixlR8U1sRJ99XTc1723hXmNLqGW7Esk/UhVcrktlnVwUmCSCI9Rmg9yrEOACHViG80Lhu7Zs9nc9MRzG2xhxF++rA6d0ilUoYq3c5KwcFzdU/nLTmtyfuDq5aOdkvGAcBuZyeLqfwUWdkCfBhFYP2H/J0RG9HbR/9IxOgd47cCC3yffco24v/W8/Y3RPwdbKpMzcCKnAciQJahvOBGJlBDL1fhQWxktsdLPwB2SJ0N6uYfXZ68MmyodCJwP+jg/EjSFi6JO0VPP9wj1s3W6WOVkbWgD2LB9YdRg4U3kpGlQNQYHi63FGtBw63uJp2TiGspxe9lQ1Y1inI49aQIDAQAB', // 支付宝公钥，需要对结果验签时候必填
//         privateKey: 'MIIEogIBAAKCAQEAgmTjAvtLfb3HUXOFzs7bUqkzLoOeLDjra9RMG6iIWLhZEHtP/PEEQ66hhPLc4DY8zM3H3S8Z32GK30RK58fmBGuU1Try68k/f6f77hm/HovQSuUAXJk0vnn2yevZ+QF9GYzX4jIuC0xkTKW+GomrxgOLqful4fRUm2jKr+po8YqLC0zoZaZjvBToawPvZ3CzX2xbbsB1vYkCdjRW4fD9BHnUGiM2vetaBuqyiOxvfw/8TZYkYhJogwBAMRLNf8+bwaiRe7tUvWi+TbduZTs84T58/E4fQRY1FcHTlrHa94Z/zYpwBZY9HZpNswSxVrjnFyhfKh7d9aFzAsa+gtOMYQIDAQABAoIBABIY/okDZ87j8C4V4pR5kWc/pKLoEaQBomss5ANSuNnXfEUVWFy69uSN8E0LiCx2WqnyRbMlPmoKl8O1LtBMplgmtlmB/QVMwUtufUDmwefzb811Sz+O5Asr0lzkJzSwSDSrn6r9W/ale6ZHusLkKLsq8s985eEekD+ho8AWwMoFQv5SbMLTpILO6/ihVv67X5ZbJZkncTQsd2u+vuSSyOU4wbox0cLaU8zPiSWGKb1AXh0DrmUC1EfDqSZjTHO8qniEodrsVJ6dlioNAkub8FOVVSKdnyDbbZSRwSAEOP8b4ZG7+/ThjXQXddjNsZZZcrb3+aD1lbThjhB72V/yrCECgYEA/4bRkm7AxaVIKvHo9tg28vmuara12lu/4b5zaapnn8fXqv3EA8/K5tdlaTQIJa5vZfnue+hTV2+6ROEt4E2L0ajC/zaG7Jr2nG3RHB4EPC/FN9zExXpcbMpPJseBO20hUsnT8/pNCj6xgbrVkhwjefKHlI8W/nFhl6/kirPd8s8CgYEAgqK5nd2rGJ3LphHV2/aBLDKOGKzd9crF394U1bUgEDvpVrvn+y+IDwQyfL/b+nb07NwMNLobHklP3NvQlTA0+s9L8xlZy5HVvbD6doK0hx+jzcsGtlt7AijLABECcCoeAhPEglL0eaKnrDcgpRTlxr4be8aB8a9GTaUCzCF6Gc8CgYAoPsGvQIZYGsodCXDZwAAXkL+pyxElTSIRmf9vewlLHxyWr9U5jHa2mOI+CZXm6WxeMVkgZt0Jfm1l/9lL5KrK4Lulmp7xkQ6aYKl4tjmQiS2UuM69E6KO9+Yzg2SVSYDgGy2o1ZlgrbMjbZvJoWjtAgfcnBTRCmaGj4t9VQr1/QKBgBt2O9D89WfSXCpIG44HDvaMliSHyo1OGDTMidK3Jctj3NSX4deDEXYeqsJgzsyjTy+vvn0jFmpSfRBvwTRrkueaxluPW7oYqTccSjq5lVvGgffUE1AogP5eNvaHnNyZbf9/ylKfP7eGQvtIB3vMndUex8ZIX66/6uaNpr3k17cvAoGAElag1N1oIn/EQqGoHztf+caLedWCBW4uvF5tM/GDokkbNV9MrXreV2Ol2+qBRWZh6dfl5oBVtoWNkll8BO6eZYkj1qcbf366n2PcYmHFuNI3/N8ZzhEAGXuj3wF9FgzDFtsw3xNsVNWt1HAr4dkQwSZNh0bR2AGnHLvUIX3RLXM=', // 应用私钥字符串
//     })
//     const formData = new AlipayFormData()
//         // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url

//     // formData.addField("charset", "utf-8");

//     formData.setMethod('get')
//         // 配置回调接口
//     formData.addField('notifyUrl', 'http://www.baidu.com')
//         // 设置参数
//     formData.addField('bizContent', {
//         outTradeNo: '1582976759798',
//         productCode: 'FAST_INSTANT_TRADE_PAY',
//         totalAmount: '0.01',
//         subject: '111',
//         body: '1111',
//     });
//     // 请求接口
//     // const result = await
//     alipaySdk.exec(
//         'alipay.trade.page.pay', {}, { formData: formData },
//     ).then(data => {
//         console.log(data);
//         res.send(data)
//     })
// })
// module.exports = router