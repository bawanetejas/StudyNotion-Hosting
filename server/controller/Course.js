
const {uploadImageToCloudinary}= require("../utils/imageUploader");
const Category = require("../models/Category");
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const User = require("../models/User");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration")

// creating new course
exports.createCourse =async(req,res)=>{

    try{

        const {courseName,courseDescription, whatYouWillLearn,category,price,tag,instructions} = req.body;

        const thumbNail = req.files.thumbnailImage;
        // console.log(req.body)
        // console.log("thumbnail",thumbNail)
        if(!courseName 
            || !courseDescription
            || !whatYouWillLearn 
            || !category 
            || !thumbNail
            ){
            return res.status(400).json({
                success:false,
                message:"All field are required"
            })
        }
        // console.log("hey this is me")
        const userId = req.user.id;
        const instructorDetails = await User.findById({_id:userId});
        // console.log("instructor id",instructorDetails) done seen
        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor details not found"
            })
        }

        const categoryDetails = await Category.findOne({_id:category});

        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category details not found"
            })
        }

        // upload image to the cloudinary
       
        const thumbNailImage = await uploadImageToCloudinary(thumbNail);
        console.log("thumbnail==>",thumbNailImage)
        // create entry in the db

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag,
            instructions,
            category:category,
            thumbNail:thumbNailImage.secure_url,
        });
        // console.log("hey i am here", newCourse)
        //  adding new course in instructor id

        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                     course:newCourse._id
                }
            },
            {new:true}
        );

        // inserting in the course under category
        await Category.findByIdAndUpdate(
            {_id:category},
            {
                $push:{

                    course:newCourse._id
                }
            },
            {new:true}
        );

        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newCourse,
        });



    }catch(error){

        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create Course',
            error: error.message,
        })
    }
}

//  get all courses

exports.showAllCourses = async(req,res)=>{
    try{
        const showAllCourses = await Course.find({});

        return res.status(200).json({
            success:true,
            message:'Data for all courses fetched successfully',
            data:showAllCourses,
        })
    }  catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Cannot Fetch course data',
            error:error.message,
        })
    }
}

// get all course detail

exports.getCourseDetail = async (req,res)=>{
    try{

        const {courseId} = req.body;

        const courseDetail = await Course.findById({_id:courseId})
                                                  .populate({
                                                    path:"instructor",
                                                    populate: {
                                                            path:"additionalDetails",
                                                        }
                                                  })
                                                  .populate({
                                                    path:"courseContent",
                                                    populate:{
                                                        path:"subsection",
                                                    }
                                                  })
                                                  .populate("category")
                                                  .populate("ratingAndReviews");

        if(!courseDetail){
            return res.status(400).json({
                success:false,
                message:"Course Detail found"
            })
        }
        
        return res.status(200).json({
            success:true,
            message:"course detail fetched successfully",
            data:courseDetail,
        })
    }catch(error){

        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

exports.editCourse = async (req,res)=>{
    try{

        const {courseId} = req.body
        const updates = req.body
        // console.log("updates -->",updates)
        const course = await Course.findById(courseId)

        if(!courseId){
            return res.status(404).json({
                error:"Course NOt found"
            })
        }

        // if thumbnail updated
        if(req.files){
            
            const thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            course.thumbnail = thumbnailImage.secure_url
        }

        //Update only the fields that are present in the request body
        for(const key in updates){
            if(updates.hasOwnProperty(key)){
                if(key === "tag" || key === "instructions"){
                    course[key] = JSON.parse(updates[key])
                }else{
                    course[key] = updates[key]
                }
            }
        }
       
        await course.save();

        const updateCourse = await Course.findOne(
                               {_id:courseId}).populate({
                                path:"instructor",
                                populate:{
                                    path:"additionalDetails",
                                },
                               })
                               .populate("category")
                               .populate("ratingAndReviews")
                               .populate({
                                path:"courseContent",
                                populate:{
                                    path:"subsection",
                                }
                               })
                               .exec();

    return res.json({
        success:true,
        message:"Course Updated successfully",
        data:updateCourse
    })                           

    }catch(error){

    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
 
    }
}

// full course detail with students proress

exports.getFullCourseDetail  = async(req,res)=>{
    try{
        const {courseId} = req.body
       
        const userId =  req.user.id
        
        const courseDetails = await Course.findById({
            _id:courseId,
        }).populate({
            path:"instructor",
            populate:{
                path:"additionalDetails",
            }
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path:"courseContent",
            populate:{
                path:"subsection"
            },
        })
        .exec();


    let courseProgressCount = await CourseProgress.findOne({
        courseID:courseId,
        userId:userId,
    })

    if(!courseDetails){
        return res.status(400).json({
            success:false,
            message:`Could not find course with id ${courseId}`
        })
    }

    let totalDurationInSeconds = 0
    courseDetails?.courseContent.forEach((content)=>{
        content.subsection.forEach((subSection)=>{
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
        })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
        success:true,
        data:{
            courseDetails,
            totalDuration,
            completedVideos:courseProgressCount?.completeVideo ?
            courseProgressCount?.completeVideo: [],
        }
    })
     
    }catch(error){

        return res.status(500).json({
            success: false,
            message: error.message,
          })

    }
}

// get a list of course for a given instructor

exports.getInstructorCourse = async(req,res) =>{
    try{
        // get instructor id 
        const instructorId = req.user.id

        // find all courses which is created by instructor

        const instructorCourses = await Course.find({
            instructor:instructorId,
        }).sort({createdAt:-1})

        // return the instructor courses

        res.status(200).json({
            success:true,
            data:instructorCourses,
        })
    }catch(error){

        res.status(500).json({
            success:false,
            message:"Failed to retrieve instructor courses"
        })
    }
}

// Delet the course

exports.deleteCourse = async (req,res) =>{
    try{
        const {courseId} = req.body

        // find the course

        const course = await Course.findById(courseId)

        // unenroll students from the course

        const studentsEnrolled = course?.studentsEnrolled
        if(studentsEnrolled){
            for(const studentId of studentsEnrolled){
                await User.findByIdAndUpdate(studentId,{
                    $pull:{courses:courseId}
                })
            }
        }

        // delete section and sub-section

        const courseSections = course?.courseContent
        if(courseSections){
            for(const sectionId of courseSections){
                //delet sub section of the section
                
                const section = await Section.findById(sectionId)
                if(section){
                    const subSections = section.subsection
                    for (const subSectionId of subSections) {
                        await SubSection.findByIdAndDelete(subSectionId)
                      }
                    }
              
                    // Delete the section
                    await Section.findByIdAndDelete(sectionId)
                  }
        }
              console.log("course id -->",courseId)
              // Delete the course
              await Course.findByIdAndDelete(courseId)
              
             const result = await Course.find({instructor:req.user.id});
              return res.status(200).json({
                success: true,
                message: "Course deleted successfully",
                data:result
              })
            } catch (error) {
              console.error(error)
              return res.status(500).json({
                success: false,
                message: "Server error",
                error: error.message,
              })
            }
          }