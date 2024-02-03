const User = require("../models/User");

const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt")
const crypto = require("crypto");

// send token and link of reset password to the user 
exports.resetPasswordToken = async(req,res) =>{
    
    try{
        const email = req.body.email;

        const user = await User.findOne({email:email});
    
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Your email is not registered"
            });
        }
    
        // generating token using crypto
    
        const token = crypto.randomBytes(20).toString("hex");
    
        // adding token and its expiration time in the USER
    
        const updatedDetails = await User.findOneAndUpdate({email:email},
                                                            {
                                                                token:token,
                                                                resetPasswordExpires: Date.now() + 5*60*1000,
                                                            },
                                                            {new:true}
                                                          )
                                         
                                                          
        console.log(" reset password updatedDetails ->" ,updatedDetails);
        
        // create url
        const url = `http://localhost:3000/update-password/${token}`;
    
        await mailSender(email,"Password reset link",
                              `Your Link for email verification is ${url}. Please click this url to reset your password.`);
    
        return res.json({
            success:true,
            message:"Email sent successfully , check email for reset password"
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"something went wrong while sending reset link mail"

        })
    }
    
}


// reseting password

exports.resetPassword =  async(req,res)=>{
    
    try{
      
        const {password,confirmPassword,token} = req.body;
        // console.log(password,confirmPassword,token)
        if(password !== confirmPassword){
            return res.status(401).json({
                success:false,
                message:"password and confirmpassword are not match"
            })
        }
       
        const user = await User.findOne({token})
        
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User does not exist"
            })
        }
       
        if(Date.now() > user.resetPasswordExpires){
            return res.status(401).json({
                success:false,
                message:"Token expires, Regenerate again"
            })
        }
       
        //hash password

        const hashPass =await bcrypt.hash(password ,10);

        await User.findOneAndUpdate({token :token},
                                    {password:hashPass},
                                    {new:true}
                                    );
        console.log("user>>>",user)
        return res.status(200).json({
            success:true,
            email:user.email,
            message:'Password reset successful',
        });


    }catch(error){
        return res.status(500).json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
    }
}