
import { profileEndpoints } from "../apis";
import {apiConnector} from '../apiConnector';
import toast from "react-hot-toast";
const {
    GET_USER_ENROLLED_COURSES_API,
    GET_USER_DETAILS_API,
    GET_INSTRUCTOR_DATA_API,
   
} = profileEndpoints

export const getEnrolledCourses = async(token)=>{
    
        const toastId = toast.loading("Loading..");
        let res = [];
        try{
            const response = await apiConnector("POST",
                                                GET_USER_ENROLLED_COURSES_API,
                                                null,{
                                                    Authorization:`Bearer ${token}`}) 
            
            if(!response.data.succes){
                throw new Error("Check the backend controller");
            }                                    
           console.log("all courses data api->",response)
           toast.success("All courses fetch successfully")
           res = response.data.data;
        }catch(error){
            console.log("Error in get all courses api -->",error)
            toast.error("error in get courses api")
        }
        toast.dismiss(toastId);
        return res
    }

export const instDashboard = async(token)=>{
    let data =[]
    const toastId = toast.loading("Loading...")
    try{

        const res = await apiConnector("GET",GET_INSTRUCTOR_DATA_API,null,{
            Authorization:`Bearer ${token}`})

        // console.log("res of dashboard -->",res)
        if(!res.data.success){
            throw new Error("Please check the BE")
        }

        data = res.data.courseData
    }catch(error){
        toast.error("something went wrong")
        console.log("error in the instructor Dashboard api",error)
    }

    toast.dismiss(toastId)
    return data
}