const mongoose = require("mongoose"); // Erase if already require

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    user : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User",
      require: true 
    },
    shippingInfo:{
      name : {
        type : String,
        require:true
      },
      address : {
        type : String,
        require:true
      },
      city : {
        type : String,
        require:true
      },
      country : {
        type : String,
        require:true
      },
      state : {
        type : String,
        require:true
      },
      other : {
        type : String,
        require:true
      },
      pincode : {
        type : Number,
        require:true
      },
    },
    orderItems:[
      {
        productId : {
          type : mongoose.Schema.Types.ObjectId,
          ref:"Product",
          require : true
        },
        quantity:{
          type : Number,
          require : true
        },
        price:{
          type : Number,
          require : true
        },
      }
    ],
    
    totalPrice : {
      type :Number ,
      require:true
    },
    orderStatus : {
      type : String ,
      default : "Cancelled",
      enum : ['Cancalled',"COMPLETED"]
    },
    status:{
      type : String,
      default: "Đang xử lý",
      enum : ["Đang xử lý","Đang chuẩn bị hàng","Đang giao hàng","Giao hàng thành công"]
    }
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);