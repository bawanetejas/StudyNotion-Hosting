const Profile = require("../models/Profile")
const User = require("../models/User");
const OTP = require("../models/OTP")
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator")
const bcrypt= require("bcrypt");
const mailSender = require("../utils/mailSender")
const passwordUpdated = require("../mail/template/passwordUpadate")
require("dotenv").config();

// send otp

exports.sendotp=async(req,res)=>{

    try{
        const {email} =req.body;

        const checkUser = await User.findOne({email});

        if(checkUser){
            return res.status(401).json({
                success:false,
                message:"user already registered"
            })
        }

        // otp generate

        let otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })

        let result = await OTP.findOne({otp :otp});
        // find unique otp
        while(result){
            let otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            })
        
            result = await OTP.findOne({otp :otp});
        }

        // creating entry in db

        const otpPayload = {email,otp};

        const otpBody = await OTP.create(otpPayload);

        return res.status(200).json({
            success:true,
            otp,
            message:"otp sent successfully"

        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }

}

// sign up 

exports.signup =async(req,res)=>{

    try{

        const {
                firstName ,
                lastName,
                email,
                otp,
                password,
                confirmPassword,
                accountType,
                contactNumber,

                } = req.body;

        if(!firstName || !lastName || !otp || !password ||!confirmPassword
        || !email){
            return res.status(403).json({
                success:false,
                message:"All fields are mandetory"
            })
        }

        const checkUser = await User.findOne({email});
        if(checkUser){
            return res.status(400).json({
                success:false,
                message:"Email is already registered"
            });
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"passwords are not matching"
            })
        }

        // finding most recent otp 
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("user otp",otp)
        // console.log("recent otp",recentOtp[0].otp)
        if(recentOtp.length === 0){
            return res.status(400).json({
                success:false,
                message:"OTP NOT FOUND"
            })
           
        }else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"INVALID OTP"
            });
        }

        // HASHINg OF PASSWORD
        const hashPass = await bcrypt.hash(password,10);
        
        // setting additional detaile as null
        const profileDetails = await Profile.create({
            gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashPass,
            contactNumber,
            accountType,
            additionalDetails:profileDetails._id,  // object id
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,

        })

        return res.status(200).json({
            success:true,
            user,
            message:"User entry created successfully"
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registrered. Please try again",
        })
    }

}

// log in 

exports.login = async(req ,res)=>{
    try{

        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"ALL FIELDS ARE REQUIRED"
            })
        }

        const user = await User.findOne({email}).populate("additionalDetails");

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User is not registered"
            })
        }

        if(await bcrypt.compare(password,user.password)){
            const Payload ={
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }

            const token = jwt.sign(Payload,process.env.JWT_SECRET ,{
                expiresIn:"30d",
            })

            user.token = token;
            user.password = undefined;

            // creating cookie
            const options={
                httpOnly:true,
                expires:new Date(Date.now() + 3*24*60*60*1000)
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in successfully"
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"password is incorrect"
            })
        }
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure, please try again',
        });
    }
};


// change password

exports.changePassword= async(req, res)=>{
    try{
        const {newPassword,confirmPassword} = req.body;
         
        const userId = req.user.id;
        const user = await User.findOne({_id:userId});
        // console.log("change pass user detail --->",user)

        if(newPassword !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"newpassword and confirmpassword not match"
            })
        }
        

            const newPass = await bcrypt.hash(newPassword,10);
            // below code change the password in the db
            console.log("hashh new pass --->",newPass)
             await User.findOneAndUpdate({_id:userId},
                                        {password:newPass},
                                        {new:true} );
            
             user.password = newPass; //  this code change the password in the user object         

            //  const mailResponse = await mailSender(email,"verification of the otp", emailVerification(otp));
          const mailresponse =  await mailSender(user.email,"password change successfuly",passwordUpdated(user.email,user.firstName));
        //    console.log("mailResponse -->",mailresponse)
            return res.status(200).json({
                success:true,
                message:"password change successfully",
                newPassword,
            })
       

    }catch(e){

        return res.status(400).json({
            success:false,
            message:"Password not change ,Please try again"
        });
    }
}


