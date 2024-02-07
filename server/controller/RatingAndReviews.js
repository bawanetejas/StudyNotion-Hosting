
const User = require("../models/User");
const Course = require("../models/Course");
const RatingAndReviews = require("../models/RatingAndReviews");
const {  default: mongoose } = require("mongoose");

// creating rating

exports.createRating = async (req,res)=>{
    try{

        //get userId and courseID
        const userId = req.user.id;

        const{rating,review,courseId} = req.body;

        // find the user is enrolled in the course or not
        const courseDetail =await Course.findOne({
                                        _id:courseId,
                                        studentsEnrolled:{$elemMatch: {$eq:userId}}
                                    })
        //validation
        if(!courseDetail){
            return res.status(400).json({
                success:false,
                message:"Student is not enrolled in th course"
            })
        }

        // check if user already reviewed the course

        const alreadyReviewed = await RatingAndReviews.findOne({
                                                            user:userId,
                                                            course:courseId,
        });

        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"Course is already reviewed by the user"
            });
        }
        //creating rating and reviews

        const ratingReviews = await RatingAndReviews.create({
                                                   rating:rating,
                                                   review:review,
                                                   course:courseId,
                                                   user:userId,
        })

        // updating course with this rating and review
       
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                                                {_id:courseId},
                                                                {
                                                                    $push:{ratingAndReviews:ratingReviews}
                                                                },
                                                               {new:true} );

        return res.status(200).json({
            success:true,
            ratingReviews,
            message:"Rating and Review Created successfully"
        })

    }catch(error){

        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// get average rating

exports.getAverageRating = async (req,res) =>{
    try{
        // get course Id
        const courseId = req.body.courseId;

        // calculate avg rating

        const result  = await RatingAndReviews.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId)
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ]);

        // return rating
        if(result.length >0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }

        // if no rating/review exist

        return res.status(200).json({
            success:true,
            message:"Average Rating is 0, no rating given by student"
        })

    }catch(error){

        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//get all rating
// not finding rating on the perticular course basis
exports.getAllRating = async(req,res)=>{
    try{
        let allReviews = await RatingAndReviews.find({})
                                   .sort({rating:"desc"})
                                   .populate({
                                    path:"user",
                                    select:"firstName lastName email image"
                                   })
                                   .populate({
                                    path:"course",
                                    select:"courseName"
                                   }).exec()

            allReviews = allReviews.filter((review)=>review.user !==null)

        return     res.status(200).json({
                                    success:true,
                                    message:"All reviews are fetched successfully",
                                    data:allReviews,
        });                       
    }catch(error){

        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}