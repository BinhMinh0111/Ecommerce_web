const mongoose = require("mongoose");

//Create product object
const productSchema = new mongoose.Schema(
    {
        title:{type: String, require: true, unique: true},
        description:{type:String, require: true},
        image:{type:String, require:true},
        categories:{type:Array},
        Size:{type:Array},
        Color:{type:Array},
        Price:{type: Number, require:true},
        inStock: { type: Boolean, default: true },
    },
    // {createdAt: Date.now()}
    {timestamps: true}
);

module.exports = mongoose.model("Product", productSchema);