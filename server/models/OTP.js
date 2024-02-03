
const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailVerification = require("../mail/template/emailVerificatio")
const otpSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60, // The document will be automatically deleted after 5 minutes of its creation time
    },
})

// mailsend function to verify otp

async function sendVerificationEmail(email,otp){

    try{
        const mailResponse = await mailSender(email,"verification of the otp", emailVerification(otp));

        console.log("Email sent successfully", mailResponse);
        
    }catch(error){
        console.log("error occured while send mail",error);
        throw error;
    };
}

otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports = mongoose.model("OTP",otpSchema);