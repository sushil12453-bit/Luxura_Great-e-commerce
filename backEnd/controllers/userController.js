import { json } from "express";
import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Route for userLogin
const loginUser = async (req,res)=>{
    try{
        const{email,password} = req.body;
        const user = await userModel.findOne({email})
        console.log(user,email,password);

        if(!user){
            return res.json({success:false,message:"User doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password,user.password);
        console.log(isMatch);
        if(isMatch){

           const token = createToken(user._id);
           res.json({success:true,token})

        }
        else{
            res.json({success:false,message:'Invalid cratendtials'})
        }
    }catch(error){
        console.log(error);
    }

} 

//Route for user register
const registerUser = async (req,res)=>{
    try{
        const {name,email,password} = req.body;

        //checking user already exsists or not
        const exsists  = await userModel.findOne({email});
        if(exsists){
            return res.json({success:false,message:'USer already exsists'})
        }

        //validating email formate & strong Password using validator
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        //hashing user password 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({success:true,token})

    }catch(error){
        console.log('error');
        res.json({success:false,message:error.message})
    }
}

//Rotute for admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({ success: true, token });
    } else {
      return res.json({
        success: false,
        message: "Invalid Credentials"
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};



export {loginUser,registerUser,adminLogin};