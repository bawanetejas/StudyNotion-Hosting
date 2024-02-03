
const express = require("express")
const router = express.Router();

const {auth} = require("../middleware/Auth")

const{
    updateProfile,
    deleteAccount,
    getAllUserDetails,
    updateDisplayPicture,
    getEnrolledCourses,
    instructorDashboard
} = require("../controller/Profile");


/////////////////////////             /////////////////////////
//                       PROFILE ROUTE
/////////////////////////             /////////////////////////

//DELETE ACOUNT

router.delete("/deleteProfile",auth,deleteAccount);

router.put("/updateProfile",auth,updateProfile)

router.get("/getUserDetail",auth,getAllUserDetails)

// get enrolled courses
router.post("/getEnrolledCourses",auth,getEnrolledCourses)

//update display picture
router.put("/updateDisplayPicture",auth,updateDisplayPicture)

//instructor dashboard 

router.get("/instructorDashboard",auth,instructorDashboard)
module.exports= router