
const User = require("../models/User");
const Profile =require("../models/Profile");
const Course = require("../models/Course")
const CourseProgrss = require('../models/CourseProgress')
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// creating profile

exports.updateProfile = async(req,res)=>{
    try{

        const {gender,about="",contactNumber,dateOfBirth=""} = req.body;
    //    console.log("formdata back end -->",req.body)
        const id = req.user.id;
        
        if(!gender || !contactNumber || !id){
            return res.status(400).json({
                success:false,
                messsge:"All fields are require"
            });
        }

        const user= await User.findById(id);
        const profileId = user.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        profileDetails.dateOfBirth= dateOfBirth;
        profileDetails.contactNumber=contactNumber;
        profileDetails.gender=gender;
        profileDetails.about=about;

        await profileDetails.save();
        const updatedProfile = await User.findById(id).populate("additionalDetails");
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            updatedProfile,
            
        })

    }catch(error){

        return res.status(500).json({
            success:false,
            message:"Profile not updated ",
            
        })
    }
}


// deleting account 

exports.deleteAccount = async(req,res)=>{
    try{

        const userId = req.user.id;
        // finding  userdetailes and profileid to delete account
        const userDetail = await User.findById(userId);
        // console.log("delet account -->",userDetail)
        const profileId = userDetail.additionalDetails;

        // deleting user details
        await Profile.findByIdAndDelete(profileId);
        //  console.log("hey i am here")
        // deleting account 

        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success:true,
            message:"Account deleted successfully"
        });

    }catch(error){

        return res.status(500).json({
            success:false,
            message:"Account Not Deleted"
        });
    }
}


// getting all codes

exports.getAllUserDetails = async(req,res) =>{
    try{

        const userId = req.user.id;
        
        const userDetail = await User.findById(userId).populate(additionalDetails);

        return res.status(200).json({
            success:false,
            message:"user return successfully",
            userDetail,

        })
    }catch(error){

        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

// set image

exports.updateDisplayPicture = async(req,res)=>{
    try{
        //get user
        const userId = req.user.id;
        //get image
        const displayPicture = req.files.displayPicture;
        // ulpoad image to cludinary
        
        const image = await uploadImageToCloudinary(
                                           displayPicture,
                                           process.env.FOLDER_NAME,
                                           1000,
                                           1000
        )
        
        // console.log(image);
        // update user
        const updateProfile = await User.findByIdAndUpdate(
                                 {_id:userId},
                                 {image:image.secure_url},
                                 {new:true},
                                                           );
        return res.status(200).json({
            success:true,
            message:"Image updated successfully",
            updateProfile,
        })
        //return res
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}

// get enrolled courses

exports.getEnrolledCourses = async(req,res)=>{
    try{
     // get user
     const userId = req.user.id;
     // find courses
    //  console.log("user id -->",userId)
     let userDetail = await User.findById({_id:userId})
                                  .populate({
                                    path:"courses",
                                    populate:{
                                        path:'courseContent',
                                        populate:{
                                            path:'subsection'
                                        }
                                    }}).exec();
     // validate
    //  console.log("user detail -->",userDetail)

    userDetail = userDetail.toObject()
    var subseclength =0;


    for(let i=0;i< userDetail.courses.length;i++){

        //finding all subsections

        subseclength =0;
        
        for(let j=0; j < userDetail.courses[i].courseContent.length;j++){
            
            subseclength += userDetail.courses[i].courseContent[j].subsection.length
           
        }

        
        // console.log("hey this is me")
        let courseProgress = await CourseProgrss.findOne(
            {userId:userId,courseID:userDetail.courses[i]._id})
          
        let completedLectures = courseProgress?.completeVideo.length

       

        if(subseclength === 0)    {
            userDetail.courses[i].progressPercentage = 100;
        }else{

            //2 decimal places
           
            const multiplyer = Math.pow(10,2);

            userDetail.courses[i].progressPercentage = 
            Math.round((completedLectures/subseclength)*100*multiplyer/multiplyer)
        }
    }
    
     if(!userDetail){
        return res.status(400).json({
            success:false,
            message:"Not eble to fetch course",
            
        })
    } 
      
        return res.status(200).json({
            succes:true,
            data:userDetail.courses,
        })
     
     //return res
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}

exports.instructorDashboard = async(req,res)=>{
    try{

        const userId = req.user.id
        const courseDetail= await Course.find({instructor:userId})
        
        //create array to send data to fe
        const courseData = courseDetail.map((course)=>{
            const totalEnrolledStudent = course?.studentsEnrolled?.length
            const totalAmount = totalEnrolledStudent * course?.price
            
            const statistics ={
                _id:course._id,
                courseName :course.courseName,
                courseDescription:  course?.courseDescription,
                totalEnrolledStudent,
                totalAmount,
        }

        return statistics
    })

    return res.status(200).json({
        success:true,
        courseData
    })

    }catch(error){
        return res.status(404).json({
            succes:false,
            message:error.message
        })
    }
}
