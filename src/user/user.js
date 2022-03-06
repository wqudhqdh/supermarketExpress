let user = require('../../userSchema')
    // 账号登录(手机号/用户名)
router.post('/loginAccount', (req, res) => {
        user.find({
            $or: [{
                "username": req.body.account,
                "password": req.body.password
            }, {
                "phone": req.body.account,
                "password": req.body.password
            }]
        }, (err, data) => {
            if (data.length === 0) {
                res.send(data)
            } else {
                let content = {
                    username: data.username
                };
                // 生成token主体
                let token = jwt.sign(content, "supermarett", { expiresIn: 3600 });
                res.json({ data, token: token });
                console.log(data.username)
            }
        })
    })
    // 邮箱登录
router.post('/loginEmail', (req, res) => {
    user.find({ "email": req.body.account }, (err, data) => {
        if (data.length === 0) {
            res.send(data)
        } else {
            let content = {
                username: data.username
            };
            // 生成token主体
            let token = jwt.sign(content, "supermarett", { expiresIn: 3600 });
            res.json({ data, token: token });
            console.log(data.username)
        }

    })
})