
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

require("dotenv").config();

// creating subsection

exports.createSubSection = async (req,res)=>{
    try{

        const {sectionId,title,description,timeDuration}= req.body;

        const video = req.files.video;
        // console.log("video-->",video)
        // console.log("creat sec -->",req.body)
        if(!sectionId || !title || !description ||!video){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });

        }

        // uploading video to cloudinary
        const videoDetail = await uploadImageToCloudinary(video,process.env.FOLDER_NAME)
        const subSection = await SubSection.create({
            
            title:title,
            description:description,
            timeDuration:timeDuration,
            videoUrl:videoDetail.secure_url
        }
        )
        console.log("subsection",subSection);
        const updateSection = await Section.findByIdAndUpdate(
               {_id:sectionId},
               {
                $push:{
                    subsection:subSection._id
                }
               },
               {new:true} ).populate("subsection").exec();
               console.log("updateSection -->",sectionId);
               return res.status(200).json({
                succcess:true,
                message:'Sub Section Created Successfully',
                updateSection,
            });

    }catch(error){

        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })

    }
}


// update subsection

exports.updateSubSection = async(req,res) =>{
    try{

        const{subSectionId,title,description,sectionId} = req.body;
        console.log("req.-body ------------->",req.body)
        const video = req.files.video;
        console.log("video",video)
        
         console.log("hei this is me")
        // uploading video to cloudinary
        const videoDetail = await uploadImageToCloudinary(video,process.env.FOLDER_NAME)
       
        // updating the db
        console.log("video detail",videoDetail)
        const updatedSubSection = await SubSection.findByIdAndUpdate(
                      {_id:subSectionId},
                      {
                        title:title,
                        description:description,
                        videoUrl:videoDetail.secure_url
                      },
                      {new:true}
        )

        const updatedSection = await Section.findById(sectionId)
                                            .populate("subsection")
        // console.log("updatedSubSection ---->>>",updatedSection)
        return res.status(200).json({
            succcess:true,
            updatedSection,
            message:"Subsection updated successfully",

        })
    }catch(error){

        return res.status(500).json({
            success:false,
            message:"Subsection not updated",
            error:error.message,
        })
    }
}


// delete subsection
// need to check
exports.deleteSubSection = async(req,res)=>{
    try{
        // assuming both the way of passing id
        const {subSectionId,sectionId} = req.body
        await Section.findByIdAndUpdate(
                                        sectionId,
                                        {
                                            $pull:{
                                                subsection:subSectionId
                                            }
                                        },
                                        {new:true},
                                       );

         await SubSection.findByIdAndDelete(subSectionId);
        const updateCourseContent = await Section.findById(sectionId)
    //    console.log("updated sec api --->",updateCourseContent)
        return res.status(200).json({
            success:true,
            message:"Subsection deleted successfully",
            updateCourseContent
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete subsection",
            error:error.message,
        })
    }
}