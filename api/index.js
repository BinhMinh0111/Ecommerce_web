const express = require("express");
const app = express();
const dotenv = require("dotenv");
//mongoose to connect MongoDB
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
const cors = require("cors");
const stripeRoute = require("./routes/stripe");

dotenv.config();

mongoose
    .connect(process.env.Mongo_URL)
    .then(()=> console.log("Database connected"))
    .catch((err)=>{console.log("Error")});  

app.use(cors());
//To read json file
app.use(express.json());
//Use route
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/cart", cartRoute);
app.use("/api/payment", stripeRoute);

//chọn port 
app.listen(5000, ()=> {
    console.log("server is online") 
});

