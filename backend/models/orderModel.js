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
      firstName : {
        type : String,
        require:true
      },
      lastName : {
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
      default: "Processing",
      enum : ["Processing","Preparing goods","Delivering","Successful delivery"]
    }
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);