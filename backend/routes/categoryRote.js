const express = require('express')
const { CreateCategory, getCategory, getAllCategory, updateCategory, deleteCategory } = require('../controllers/categoryCtl')
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware')
const route = express.Router()

route.post('/add-category',authMiddleware,isAdmin,CreateCategory)

route.get('/get-category/:_id',getCategory)
route.get('/all-category',getAllCategory)

route.put('/update-category/:_id',authMiddleware,isAdmin,updateCategory)

route.delete('/delete-category/:_id',authMiddleware,isAdmin,deleteCategory)


module.exports = route