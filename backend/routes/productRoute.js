const express = require('express')
const { createProduct, getaProduct, getAllProduct, updateProduct, 
    deleteProduct,
    productFilterController,
    searchProductController} = require('../controllers/productCtl')
const { isAdmin,authMiddleware} = require('../middlewares/authMiddleware')
const route = express.Router()

route.post('/add-product',authMiddleware,isAdmin,createProduct)
route.post('/product-filters',productFilterController)

route.get('/get-product/:id',getaProduct)
route.get('/all-product',getAllProduct)
route.get("/search/:keyword", searchProductController);

route.put('/update-product/:_id',authMiddleware,isAdmin,updateProduct)

route.delete('/delete-product/:_id',authMiddleware,isAdmin,deleteProduct)

module.exports = route