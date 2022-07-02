const mongoose = require("mongoose");

//Create cart object
const cartSchema = new mongoose.Schema(
    {
        userId:{type: String, require: true},
        products:[{
            productId:{
                type:String,
            },
            quantity:{
                type:Number,
                default:1,
            }
        },]
    },
    // {createdAt: Date.now()}
    {timestamps:true}
);

module.exports = mongoose.model("Cart", cartSchema);