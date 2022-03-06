let receiveAddress = require('../receiveAddress')
let express = require("express")
let router = express.Router()
    // 读取收货地址
router.get('/address', (req, res) => {
        receiveAddress.find({ "userid": req.query.id }, (err, data) => {
            if (err) {
                return
            } else {
                res.send(data);
                return
            }

        })
    })
    // 保存收货地址
router.post('/saveAddress', (req, res) => {
        let value = req.body.address;
        let address = new receiveAddress({
            "userid": req.body.id,
            "name": value.name,
            "phone": value.phone,
            "province": value.province,
            "city": value.city,
            "area": value.area,
            "info": value.info
        })
        address.save((err, data) => {
            if (err) {
                res.send("faile")
                return
            } else {
                res.send(data)
                return
            }
        })

    })
    // 删除收货地址
router.post('/deleteAddress', (req, res) => {
        let id = req.body.id
        receiveAddress.remove({ "_id": id }, (err, data) => {
            if (err) return res.send('fail')
            else {
                res.send('success')
            }
        })
    })
    // 修改收货地址
router.post('/modifyAddress', (req, res) => {
        let address = req.body.address
        receiveAddress.findByIdAndUpdate(address._id, address, (err, data) => {
            console.log(data)
            if (err) return res.send('fail')
            else {
                res.send('success')
            }
        })
    })
    // 获取收货地址
router.post('/getAddress', (req, res) => {
    let address = req.body.id
    receiveAddress.findById({ '_id': address }, (err, data) => {
        res.send(data)
    })
})
module.exports = router