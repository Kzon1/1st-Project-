const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim : true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase : true
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{ // loại sản phẩm
        type:String,
        required : true
    },
    quantity : {
        type:Number,
        required : true
    },
    images :[{
        public_id:String,
        url:String
    }],
},{timestamps:true});

//Export the model
module.exports = mongoose.model('Product', productSchema);