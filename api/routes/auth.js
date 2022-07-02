const router = require("express").Router();
const userModel = require("../models/user");
//Hash library
const CryptoJS = require("crypto-js");
//json webtoken lib
const jwt =  require("jsonwebtoken");


//Register

router.post("/register", async (req, res)=>{
    const newUser = new  userModel({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECR).toString(),
    })
        
    if(!newUser.username || !newUser.password || ! newUser.email)
    return res.status(400).json({
        success:false,
        message: 'Missing username and/or password and/or email'
    })

    try {
        //check for existing user
        const user = await userModel.findOne({ username:req.body.username })

        if (user)
        return res.status(400).json({
            success:false,
            message: 'Username already taken'
        })

        //check for existing email
        const email = await userModel.findOne({ email:req.body.email })

        if (email)
        return res.status(400).json({
            success:false,
            message: 'Email already taken'
        })

        //save user
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } 
    catch (error) {
        res.status(500).json(error);
    }
    
});

//Login
router.post("/login", async (req,res)=> {
    try {
        //check username
        const user = await userModel.findOne({username: req.body.username})
        if(!user)
        {
           return res.status(401).json("Wrong credential!");
        }

        //check password
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECR);
        const stringPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        
        if(stringPassword != req.body.password)
        {
            return res.status(401).json("Wrong credential!!");
        }
        
        //sign token
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SEC, {expiresIn: "1d"});
        
        //send/return everything except passwords
        const {password,...others} =user._doc;
        res.status(200).json({others, accessToken});

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router