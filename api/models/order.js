const mongoose = require("mongoose");

//Create order object
const orderSchema = new mongoose.Schema(
    {
        userId:{type: String, require: true},
        products:
        [{
            productId:{
                type:String,
            },
            quantity:{
                type:Number,
                default:1,
            }
        },],
        amount:{type: Number, require: true},
        address:{type: Object, require: true},
        status: {type: String, default: "Pending"},        
    },
    // {createdAt: Date.now()}
    {timestamps:true}
);

module.exports = mongoose.model("Order", orderSchema);