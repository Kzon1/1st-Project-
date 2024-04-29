const userModel = require('../models/userModel.js')
const cartModel = require('../models/cartModel.js')
const orderModel = require('../models/orderModel.js')
const { genarateRefreshToken } = require('../config/refreshToken.js')
const { genarateToken } = require('../config/jwtToken.js')
const bcrypt = require('bcrypt');



const createUser = async(req,res)=>{
    const {email} = req.body
    const exisitingUser = await userModel.findOne({email})
        if(exisitingUser){
            return res.status(200).send({
                success : true,
                message : 'Alrealy register please login'
            })
        }
    try {
        const newUser = new userModel(req.body).save()
        res.status(201).send({
            newUser:req.body,
            success:true,
            message : "Create new user successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message : "Create new User False",
            success : false,
            error:error
        })
    }
}


const loginUser = async(req,res)=>{
    const {email,password} = req.body
    const findUser = await userModel.findOne({email})
    // isPasswordMatched dùng để so sánh mk 
    if(findUser && (await findUser.isPasswordMatched(password))){
        // tạo refreshToken mới sử dụng hàm generateRefreshToken, 
        //cập nhật refreshToken cho người dùng.
        const refreshToken = await genarateRefreshToken(findUser?._id)
        const updateUser = await userModel.findByIdAndUpdate(findUser?._id,{
            refreshToken:refreshToken
        },{
            new : true
        })
        res.cookie("refreshToken",refreshToken,{
            httpOnly : true,
            maxAge : 72 * 60 * 60 * 1000
        })
        res.status(201).send({
            success:true,
            message : "Login successfully",
            _id : findUser?._id,
            name : findUser?.name,
            email : findUser?.email,
            mobile : findUser?.mobile,
            role : findUser?.role,
            token : genarateToken(findUser?._id), // hiển thị ra token
        })
    }else{
        return res.status(500).send({
            success : true,
            message : 'please create new user, Invalid' // nếu tìm thấy có tồn tại 
        })
    }
}


const loginAdmin = async(req,res)=>{
    const {email,password} = req.body
    const findAdmin = await userModel.findOne({email})
    if(findAdmin.role !=='admin'){
        return res.status(500).send({
            success : false,
            message : 'not authorised' // nếu tìm thấy có tồn tại 
        })
    }
    if(findAdmin && (await findAdmin.isPasswordMatched(password))){
        const refreshToken = await genarateRefreshToken(findAdmin?._id)
        const updateUser = await userModel.findByIdAndUpdate(findAdmin?._id,{
            refreshToken:refreshToken
        },{
            new : true
        })
        res.cookie("refreshToken",refreshToken,{
            httpOnly : true,
            maxAge : 72 * 60 * 60 * 1000
        })
        res.status(201).send({
            success:true,
            message : "Login successfully",
            _id : findAdmin?._id,
            firstname : findAdmin?.firstname,
            lastname : findAdmin?.lastname,
            email : findAdmin?.email,
            mobile : findAdmin?.mobile,
            role : findAdmin?.role,
            token : genarateToken(findAdmin?._id), // hiển thị ra token
        })
    }else{
        return res.status(500).send({
            success : true,
            message : 'please create new user, Invalid' // nếu tìm thấy có tồn tại 
        })
    }
}

const getAllUsers = async(req,res)=>{
    try {
        const user = await userModel.find({})
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Get all users error !"
        })
    }
}

const getsignUser = async(req,res)=>{
    const {_id} = req.params // lấy trên url
    try {
        const getUser = await userModel.findById(_id)
        res.status(200).json({
            success : true,
            message : "Get user successfully !",
            getUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Get user error !"
        })
    }
}

const updateUser = async(req,res)=>{
    const { _id } = req.params
    console.log(req.body)
    try {
        // Hash lại mật khẩu mới nếu có
        if (req.body.password) {
            const salt = await bcrypt.genSaltSync(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        
        const user = await userModel.findByIdAndUpdate(_id,{
            name : req?.body?.name,
            email :  req?.body?.email,
            mobile :  req?.body?.mobile,
            password : req?.body?.password,
        },{
            new :true
        })
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Update user error !"
        })
    }
}
const editUser = async(req,res)=>{
    const { _id } = req.user
    console.log(req.body)
    try {
        // Hash lại mật khẩu mới nếu có
        if (req.body.password) {
            const salt = await bcrypt.genSaltSync(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        
        const user = await userModel.findByIdAndUpdate(_id,{
            name : req?.body?.name,
            email :  req?.body?.email,
            mobile :  req?.body?.mobile,
            password : req?.body?.password,
        },{
            new :true
        })
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Update user error !"
        })
    }
}

// delete a user
const deletesignUser = async(req,res)=>{
    const {_id} = req.params // lấy trên url
    try {
        const user = await userModel.findByIdAndDelete(_id)
        res.status(200).json({
            success : true,
            message : "delete user successfully !"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "delete user error !"
        })
    }
}


// // cart 
const userCart = async (req, res) => {
    const { productId,quantity,price } = req.body;
    console.log({productId,quantity,price})
    const { _id } = req.user;
    try {
      let newCart = await new cartModel({
        userId:_id,
        productId,
        quantity,
        price,
      }).save();

      res.json({
        newCart
      });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "cart user error !"
        })
    }
}

// // get user cart 
const getUserCart = async(req,res)=>{
    const { _id } = req.user;
    try {
        //tìm kiếm id người thêm vào giỏ hàng
        // truy tới và hiển thị ra chi tiết của product
        const cart = await cartModel.find({userId : _id})
            .populate("productId")
        res.json(cart)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "get cart user error !"
        })
    }
}

const removeProductCart=async(req,res)=>{
    const {_id} = req.user
    const {cartItemId} = req.params
    try {
        const deleteProductCart = await cartModel.deleteOne({userId:_id,_id:cartItemId})
        res.json(deleteProductCart)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "delete product cart user error !"
        })
    }
}


const updateProductQuantityCart=async(req,res)=>{
    const {_id} = req.user
    const {cartItemId,productId,newQuantity} = req.params
    try {
        console.log(productId)
        const cartItem = await cartModel.findOne({userId:_id,productId:productId})
        cartItem.quantity = newQuantity
        cartItem.save()
        res.json(cartItem)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "delete product cart user error !"
        })
    }
}


const createOrder = async(req,res)=>{
    const {shippingInfo,orderItems,totalPrice} = req.body
    const {_id} = req.user
    console.log("alo",shippingInfo,orderItems,totalPrice,_id)
    // console.log(shippingInfo,orderItems,totalPrice,_id)
    // try{
    //     const order = await orderModel.create({
    //         shippingInfo,orderItems,totalPrice,orderStatus:"COMPLETED", user:_id
    //     })
    //     res.json({
    //         shippingInfo,
    //         order,
    //         success : true
    //     })
    // }catch(error){
    //     console.log(error)
    //     res.status(500).send({
    //         success : false,
    //         message : "create order user error !"
    //     })
    // }
}
// empty to cart
const emptyCart = async(req,res)=>{
    const {_id} = req.user
    try {
        //tìm kiếm id mà người dùng login 
        const user = await userModel.findOne({_id})
        const cart = await cartModel.deleteMany({userId : user._id})
        res.json(cart)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "emptyCart user error !"
        })
    }
}
const getAllOrder = async(req,res)=>{
    try {
        //tìm kiếm id mà người dùng login 
        const orderUser = await orderModel.find().populate("user").populate("orderItems.productId")
        res.json(orderUser)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "get all order user error !"
        })
    }
}

const getMyOrder = async(req,res)=>{
    const {_id} = req.user
    try {
        
        const orders = await orderModel.find({user : _id}).populate("orderItems.productId")
        res.json({
            orders
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false,
            message : "create order user error !"
        })
    }
}
const updateStatusOrder = async(req, res) => {
    const { _id, status } = req.params;
    try {
        // Tìm đơn hàng cần cập nhật bằng _id
        const updateOrder = await orderModel.findById(_id);

        if (!updateOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        // Cập nhật trạng thái đơn hàng
        updateOrder.status = status;
        await updateOrder.save();

        res.json(updateOrder);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Update order error!",
        });
    }
};

module.exports = {createUser,loginUser,loginAdmin,getAllUsers,getsignUser,updateUser,deletesignUser,userCart,
getUserCart,removeProductCart,updateProductQuantityCart,createOrder,emptyCart,getAllOrder,editUser,getMyOrder,
updateStatusOrder}