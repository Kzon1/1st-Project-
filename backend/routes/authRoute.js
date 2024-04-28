const express = require('express')
const router = express.Router()
const {createUser, loginUser, loginAdmin, getAllUsers, getsignUser, updateUser, 
    deletesignUser, userCart, getUserCart, updateProductQuantityCart,
    removeProductCart,
    createOrder,
    emptyCart,
    getAllOrder,
    editUser,
    getMyOrder,
    updateStatusOrder,} = require('../controllers/UserCtl.js')
const {authMiddleware,isAdmin} = require('../middlewares/authMiddleware.js')

router.post('/register',createUser)
router.post('/login',loginUser)
router.post('/admin-login',loginAdmin)
router.post('/add-cart',authMiddleware,userCart)
router.post('/cart/create-order',authMiddleware,createOrder)


router.get('/all-users',getAllUsers)
router.get('/get-user/:_id',authMiddleware,isAdmin, getsignUser)
router.get('/get-cart',authMiddleware,getUserCart)
router.get('/get-all-order',authMiddleware,isAdmin,getAllOrder)
router.get('/getmyorders',authMiddleware,getMyOrder)

router.put('/update-user/:_id',authMiddleware,updateUser)
router.put('/edit-user/:_id',authMiddleware,editUser)
router.put('/update-cart/:cartItemId/:productId/:newQuantity',authMiddleware,updateProductQuantityCart)
router.put('/update-order/:_id/:status',authMiddleware,isAdmin,updateStatusOrder)


router.delete('/delete-user/:_id',authMiddleware,isAdmin,deletesignUser)
router.delete('/delete-cart/:cartItemId',authMiddleware,removeProductCart)
router.delete('/empty-cart',authMiddleware,emptyCart)


module.exports = router
