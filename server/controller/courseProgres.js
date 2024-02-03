const CourseProgress = require('../models/CourseProgress')

exports.lectureCompletion= async(req,res)=>{

    const userId = req.user.id
    const {courseId,subsectionId} = req.body
    
    if(!userId || !courseId || !subsectionId){
        return res.status(404).json({
            success:false,
            message:"Not valid"
        })
    }

   try{
    
   
    const courseProgress = await CourseProgress.findOne({userId:userId,courseID:courseId})
    
    if(!courseProgress){
        return res.status(404).json({

            success:false,
            message:"Course Progress does not exist"
        })
    }
    
    if(courseProgress?.completeVideo.includes(subsectionId)){
        
        return res.status(400).json({
            success:false,
            message:"Lecture is already mark as completed"
        })
    }
    console.log("hey this is me")
    courseProgress.completeVideo.push(subsectionId);
    await courseProgress.save();

    return res.status(200).json({
        success:true,
        message:'Lecture mark as completed'
    });

   }catch(error){
    return res.status(404).json({
        success:false,
        message:error.message
    })
   }
    
}