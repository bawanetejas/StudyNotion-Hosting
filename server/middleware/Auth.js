
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//authentication

exports.auth = async(req,res,next)=>{
    try{
        
        //extract token
        const token = req.body.token 
                     || req.cookies.token
                     ||req.header("Authorization").replace("Bearer ","");

        if(!token){
            return res.status(401).json({
                success:false,
                message:"token not found"
            })
        }

        // console.log("auth token -->",token)

        //veryfy token

        try{
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            // console.log("payload of the token-->",payload)
            req.user = payload;
        }catch(error){
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }

        next();
        
    }catch(error){
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}


// authorization "student"

exports.isStudent = async(req, res,next)=>{
    try{

        if(req.user.accountType !== "Student"){
            return res.status(500).json({
                success:false,
                message:"This is protected route for Student"
            })
        }
        next();
    }catch(error){

        return res.status(500).json({
            success:false,
            message:"User role cannot be verified"
        })
    }
}

// authorization "instructor"
exports.isInstructor = async(req,res,next)=>{
    try{
        
        if(req.user.accountType !== "Instructor"){
            return res.status(500).json({
                success:false,
                message:"This is protected route for Instructor"
            })
        }
        next();
    }catch(error){

        return res.status(500).json({
            success:false,
            message:"User role cannot be verified"
        })
    }
}

// authorization "admin"

exports.isAdmin = async(req, res,next)=>{
    try{

        if(req.user.accountType !== "Admin"){
            return res.status(500).json({
                success:false,
                message:"This is protected route for Admin"
            })
        }
        next();
    }catch(error){

        return res.status(500).json({
            success:false,
            message:"User role cannot be verified"
        })
    }
}
