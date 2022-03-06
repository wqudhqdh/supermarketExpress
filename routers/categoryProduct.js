  let express = require("express")
  let router = express.Router()
  let categoryProduct = require('../categoryProductsSchema')
      //返回导航栏的分类的商品
  router.get('/home/category/products', function(req, res) {
      categoryProduct.find(function(err, data) {
          if (err) {
              return;
          } else {
              res.send(data)
              return;
          }
      })
  })
  module.exports = router