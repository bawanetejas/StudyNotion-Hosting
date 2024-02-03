
import {toast} from "react-hot-toast"
import {apiConnector} from '../apiConnector'

import { courseEndpoints } from "../apis"

const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
} = courseEndpoints

export const getAllCategories = async () =>{
    
    let result =[]
    try{
        const response = await apiConnector("GET",COURSE_CATEGORIES_API)

        if(!response?.data?.success){
            throw new Error("Could Not Fetch course categories")
        }
        // console.log("category --->",response)
        result = response?.data?.allCategory
        return result
    }catch(error){
        console.log("COurse category api error ---->",error)
        toast.error(error.message)
    }
}

// course api
export const addCourseApi = async (data,token) =>{

    let result = null 
    const toastId = toast.loading("Loading....")
    try{
         const response = await apiConnector("POST",CREATE_COURSE_API, data,
         {
            "Content-Type":"multipart/form-data",
            Authorization:`Bearer ${token}`})

            // console.log("response of add course --->",response)

            result = response.data.data
            toast.success("Course created successfully")
            toast.dismiss(toastId);
            return result
    }catch(error){
           toast.error("Probleme in add course api");
           console.log("add course api error -->",error);
    }
    toast.dismiss(toastId);

}

export const editCourseDetails = async(data,token)=>{
    const toastId = toast.loading("Loading...");
    let result = null
    try{
        const response = await apiConnector("PUT",EDIT_COURSE_API,data,
        {
            "Content-Type":"multipart/form-data",
            Authorization:`Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error("Check the controller")
        }
        
        // console.log("response of edit course api --->",response);
        result = response.data.data
        toast.success("Section updated successfully")
    }catch(error){
        toast.error("Error in editcourse api")
        console.log("error of edit course api --->",error);
    }
    toast.dismiss(toastId);
    return result
}

export const deleteCourse = async(courseId,token)=>{
    const toastId = toast.loading("Loading...");
    let result=null;
    try{
        const res = await apiConnector("DELETE",DELETE_COURSE_API,{courseId:courseId},{
                           Authorization:`Bearer ${token}`})

        if(!res){
            throw new Error("check the controller")
        }
        toast.success("Course Deleted Successfully")   
        // console.log("response of the delete course",res)
        result = res.data.data                
    }catch(error){
        toast.error("error in delet sec api")
        console.log("error in delete course api -->",error)
    }
    toast.dismiss(toastId)
    return result;
}

//  section api
export const createSection = async (data , token) => {
     const toastId = toast.loading("Loading...")
    //  console.log("data of the fe --->",data)

    let result = null
     
    try{
       const response = await apiConnector("POST", CREATE_SECTION_API , data,{
        // "Content-type":"multipart/form-Data",---->    D of the form-data must be small nahi to req me data nahi jayega
         "Content-Type":"multipart/form-data",
        Authorization:`Bearer ${token}`
       });

       if(!response){
        throw new Error("Please check the controller");
        
       }
       console.log("create section api response --->",response)
        
       result = response.data.updatedCourseDetails
       toast.success("Section created successfully")
    }catch(error){
        toast.error("Error in create section api")
        console.log("create section api error -->",error)
    }
    toast.dismiss(toastId);
    return result;
}

export const updateSection =async(data,token)=>{
         const toastId = toast.loading("Loading...");
         let result =null
         try{
            const response = await apiConnector("PUT",UPDATE_SECTION_API,data,{
                Authorization:`Bearer ${token}`
             })

             if(!response){
                throw new Error("Please check the controller")
             }
             console.log("response of the --->",response)
             result = response.data.updatedSectionCourse;
             toast.success("Section updated successfully");
         }catch(error){
            toast.error("Error in updatesec api ")
            console.log("error in updateSection api -->",error)
         }
         toast.dismiss(toastId);
        return result;
         
}

export const deleteSection = async(data,token)=>{

    const toastId = toast.loading("Loading...");
    let result = null
    try{
        const response = await apiConnector('POST',DELETE_SECTION_API,data,{
                                                 Authorization:`Bearer ${token}`  
                                       });

        if(!response) {
            throw new Error("Please check the controller")
        }            
        
        console.log("response delete sec --->",response)
        toast.success("Section deleted successfully")
        result = response?.data?.data
    }catch(error){
        toast.error("Error in the delete sec api")
        console.log("error of delete sec api --->",error);
    }

    toast.dismiss(toastId);
    return result
}

// subsection part

export const createSubSection = async(formData,token)=>{

    const toastId = toast.loading("Loading...")
    let result = null;
    try{

        const res = await apiConnector("POST",CREATE_SUBSECTION_API,formData,{
                                    Authorization:`Bearer ${token}`
        })
        // console.log("res of create subsec api --->",res)

       result = res.data.updateSection;
       toast.success("sub section created successfully")
    }catch(error){
    toast.error(error.response.data.message)
    console.log("error in create subsec api-->",error)
    }
    toast.dismiss(toastId);
    return result
}
export const deleteSubSection = async(subSectionId,sectionId ,token) =>{
    const toastId = toast.loading("Loading...")
    let result = null 

    try{
        const response = await apiConnector("DELETE",DELETE_SUBSECTION_API,{subSectionId,sectionId},{
                                                                    Authorization:`Bearer ${token}`})

        if(!response){
            throw new Error("Please check the controller")
        }
        // console.log("response of the delete subSEc api --->",response)
        result= response.data.updateCourseContent
        toast.success("SubSection deleted successfully");
    }catch(error){
        toast.error("Error in the delete subSection api")
        console.log("error in the delete sec api --->",error)
    }
    toast.dismiss(toastId)
    return result
}

export const editSubSection = async (formData,token) =>{
    const toastId = toast.loading("Loading...")
    let result = null
    try{
        const res = await apiConnector("PUT",UPDATE_SUBSECTION_API,formData,{
                         Authorization:`Bearer ${token}`
        })

        if(!res){
            throw new Error("Check the controller")
        }

        // console.log("response of edt cours --->",res);
        toast.success("Sub section edited")
        result = res.data.updatedSection
    }catch(error){
        toast.error("Error in the edit sub sec api")
        console.log("Error in edit sub sec api --->",error)
    }

    toast.dismiss(toastId)
    return result
}

// get all instructor courses

export const getAllInstructorCourses = async(token) =>{
    const toastId = toast.loading("Loading...")
    let result = []
    try{
        const res = await apiConnector("GET",GET_ALL_INSTRUCTOR_COURSES_API,null,{
                         Authorization:`Bearer ${token}`})

        if(!res){
           throw new Error("Please check the controller")
        }
        // console.log("inst all course ---->",res)
        result=res.data.data;
        toast.success("All course fetched successfully")
    }catch(error){
        toast.error("instructor course not fetched")
        console.log("error in the ins all course api --->",error)
    }
    toast.dismiss(toastId);
    return result;
}

// get full detail of the course

export const getAllCourseDetail = async (courseId,token)=>{

    const toastId = toast.loading("Loading...");
    let result = null
    
    try{
        const res = await apiConnector("POST",GET_FULL_COURSE_DETAILS_AUTHENTICATED,{courseId:courseId},{
                                                                   
                                                                    Authorization:`Bearer ${token}`})

       
       if(!res.data.success){
        throw new Error("Please Check the controller")
       }
       
       toast.success("Course Detail fetched successefully")
       console.log("res of api -->",res)
       result = res.data.data
    //    .courseDetails
       console.log("result of apic --->",result)
    }catch(error){
        toast.error("Course Detail not fetched")
        console.log("Error in get all course detail api --->",error)
    }
    toast.dismiss(toastId);
    return result
}

export const markAsLectureCompleted = async(courseId,subsectionId,token) => {
    const toastId = toast.loading('Loading..');

    try{
        const result = await apiConnector("POST",LECTURE_COMPLETION_API,
                                    {courseId,subsectionId},{
                                        Authorization:`Bearer ${token}`
                                    });

                                    console.log("result",result)
        if(!result.data.success){
            throw new Error("Something went wrong");
        }

        toast.success(result.data.message)


    }catch(error){
        toast.error("Not able to mark lecture completion")
        console.log("error in lecture completion api -->",error)
    }

    toast.dismiss(toastId)

}

export const createRating = async(review,rating,courseId,token)=>{
    const toastId = toast.loading('Loading..');

    try{

        const res = await apiConnector("POST",CREATE_RATING_API,{rating,review,courseId},{
            Authorization:`Bearer ${token}`
        })

        console.log("res of rating -->",res)
        if(!res.data.success){
            throw new Error("Could not create the rating plese check BE")
        }
        toast.success("Thanks for Rating and Review")
    }catch(error){
        toast.error(error.response.data.message)
        console.log("error in rating and review api --->",error)
    }
    toast.dismiss(toastId)
}