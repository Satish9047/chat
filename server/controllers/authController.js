const bcrypt =  require("bcrypt");
const joi = require("joi");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const saltRound = 10;
const secret = "jwtSecret"


const registerController = async (req, res)=>{
    console.log(req.body);
    const schema = joi.object({
        email: joi.string().email().required(),
        username: joi.string().required().trim(),
        password: joi.string().min(8).required(),
        confirmPassword: joi.string()
    });

    const {error, value}= schema.validate(req.body);
    if(error){
        return res.status(400).json({error: error.details[0].message})
    }

    const { email, username, password } = value; 
    console.log(value);

    const existUser = await User.findOne({email: email});
    if(existUser){
        return res.status(400).json({error: "User already exist!"});
    }
    try {
        const hash = await bcrypt.hash(password, saltRound)
        const newUser = new User({
            email: email,
            username: username,
            password: hash,
        })
        await newUser.save();
        console.log("saved user in mongoDB database");
        res.status(200).json({success: "User register successfully"});
            
        
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "internal server error! :", error})
    }
}

const loginController = async (req, res)=>{
    console.log(req.body);
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).required()
    });

    const {error, value}=schema.validate(req.body);
    console.log(value);
    const {email, password}= value;
    if(error){
        return res.status(400).json({error: error.details[0].message});
    }
    const existUser = await User.findOne({email: email});
    if(!existUser){
        return res.status(400).json({error: "user didn't exist"});
    }

    bcrypt.compare(password, existUser.password, (error, result)=>{
        if(error){
            console.error("internal server error :", error);
            return res.status(500).json({ error: "internal server error" });
        }

        if(result){
            const Token = jwt.sign({email}, secret, { expiresIn: '5h' });
            console.log(Token);
            return res.status(200).json({ success: "Login successful", jwtToken: Token });
        } else{
            console.error("password didn't match ");
            return res.status(400).json({ error: "password didn't match" });
        }
    })
}



module.exports = {
    loginController,
    registerController
};