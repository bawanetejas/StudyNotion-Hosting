
const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");


   //create section

   exports.createSection = async (req, res) => {
    try{
        
        const{sectionName,courseId} = req.body;
       
        if(!sectionName 
           || !courseId
            ){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
        }

        const newSection = await Section.create({sectionName})
        // console.log("new Section-->",newSection)
        // pushing entry of the section in coursecontaint
        // if i wanna to send key-value pair then only i can make curly bracket around them .-->>{_id:courseId}
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                                                       courseId,
                                                                        {
                                                                            $push:{
                                                                                courseContent:newSection._id,
                                                                            }
                                                                        },
                                                                        {new:true}
                                                                        ).populate({
                                                                            path:"courseContent",
                                                                            populate:{
                                                                                path:"subsection",
                                                                            }
                                                                        }).exec();
        // console.log("got to be so cold",updatedCourseDetails)
        // use populate to replace section and subsection to get whole updatedcourseDetail 

        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails

        })

    }catch(error){

        return res.status(500).json({
            success:false,
            message:"Unable to create Section, please try again",
            error:error.message,
        });
    }
    }

    //update section

    exports.updateSection = async(req,res)=>{
        try{

            const {sectionName,sectionId,courseId} = req.body;
            
            const updatedSection = await Section.findByIdAndUpdate(
                                                                   {_id:sectionId},
                                                                   {sectionName},
                                                                   {new:true}
                                                                   )
            const updatedSectionCourse = await Course.findById(courseId)
                                                        .populate({
                                                            path:"courseContent",
                                                            populate:{
                                                                path:"subsection",
                                                            }
                                                        }).exec();
                                                                    
            return res.status(200).json({

                success:true,
                message:"section updated successfully",
                updatedSectionCourse
            });                                                   
        }catch(error){

            return res.status(500).json({
                success:false,
                message:"section not updated, please try again"
            })
        }
    }


    // delete sections

    exports.deleteSection = async(req,res)=>{

        try{
   
            // get id - assuming that we are sending id in params

            const {sectionId,courseId} = req.body;

            await Course.findByIdAndUpdate(courseId,
                {
                    $pull:{courseContent:sectionId}
                },{new:true});
            
            const section = await Section.findById(sectionId);
            
            if(!section){
                return res.status(404).json({
                    success:false,
                    message:"Section not found"
                })
            }
            //first need to delete subsection

            await SubSection.deleteMany({_id: {$in :section.subsection}})

            await Section.findByIdAndDelete(sectionId);
        
            // return update course

            const updatedCourse = await Course.findOne({_id:courseId})
                                   .populate({
                                    path:"courseContent",
                                    populate: {
                                        path:"subsection"
                                    }
                                   })
            // console.log("course in the backend --->",updatedCourse)
            

            return res.status(200).json({
                success:true,
                message:"section deleted successfully",
                data:updatedCourse,
            });
        }catch(error){
            return res.status(500).json({
                success:false,
                message:"Unable to delete Section, please try again",
                error:error.message,
            });

        }
    }