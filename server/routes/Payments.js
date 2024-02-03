
const express = require("express")
const router = express.Router()

// payment controller
const {capturePayment,verifySignature,sendPaymentSuccessEmail} =require("../controller/Payment")

// middleware
const {
    auth,
    isInstructor,
    isAdmin,
    isStudent
} = require("../middleware/Auth")

router.post("/capturePayment",auth,isStudent,capturePayment);
router.post("/verifySignature",auth,isStudent, verifySignature);
router.post("/sendPaymentSuccessEmail", sendPaymentSuccessEmail);
module.exports= router