
import { settingsEndpoints } from "../apis";
import {toast} from 'react-hot-toast'
import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { logout } from "./authApi";


const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
} = settingsEndpoints

 export const updateDisplayPicture = (token,formData) =>{
    return async (dispatch)=>{
        setLoading(true);
        const toastId = toast.loading("Uploading");

        try{
            const response = await apiConnector("PUT",
                                                   UPDATE_DISPLAY_PICTURE_API,
                                                    formData,
                                                    {
                                                        "Content-Type": "multipart/form-data",
                                                        Authorization: `Bearer ${token}`,
                                                    })
            if(!response.data.success){
                throw new Error("Profile picture not uploaded")
            }
            dispatch(setUser(response.data.updateProfile))
            toast.success("Image uploded successfully")
            console.log("upload image respons__--",response)
        }catch(error){
          toast.error("error in display picture api")
          console.log("update profile picture api-->",error)

        }
        toast.dismiss(toastId)
    }
}

export const updateProfile = (token,formData)=>{
    return async (dispatch)=>{
        setLoading(true);
        const toastId = toast.loading("Loading..");
        try{
            const response = await apiConnector("PUT",
                                                 UPDATE_PROFILE_API,
                                                 formData,
                                                 {
                                                    "Content-Type": "multipart/form-data",
                                                    Authorization: `Bearer ${token}`
                                                 })

            console.log("update profile -->",response)
            if(!response.data.success){
                throw new Error("Profile not updated ")
            }                                     
            dispatch(setUser(response.data.updatedProfile))
            toast.success("Profile Updated successfully")
        }catch(error){
            toast.error("Not able to update profile");
            console.log("Error in update profile api -->",error)
        }
        toast.dismiss(toastId);
    }
}

export const changePassword =(token,formdata)=>{
    return async (dispatch)=>{
        setLoading(true);
        const toastId = toast.loading("Loading..")
        try{
            const response = await apiConnector("POST",
                                                    CHANGE_PASSWORD_API,
                                                    formdata,
                                                    {
                                                        "Content-Type": "multipart/form-data",
                                                        Authorization:`Bearer ${token}`
                                                    })
            console.log("change pass api -->",response) ;
            if(!response.data.success) {
                throw new Error("Check the controller")
            }        
            toast.success("Password change Succssfully")                                 
        }catch(error){
            // toast.error("Error in change pass api")
            console.log("Error in th change pass api -->",error)
            toast.error(error.response.data.message)
        }
        toast.dismiss(toastId);
    }
}

export const deleteAccount=(token,navigate)=>{
   return async (dispatch) =>{
        setLoading(true);
        const toastId = toast.loading("Loading..")
        try{
            const response = await apiConnector("DELETE",
                                        DELETE_PROFILE_API,
                                        null,
                                        {
                                            "Content-type":"multipart/form-data",
                                            Authorization:`Bearer ${token}`
                                        })

            if(!response.data.success){
                throw new Error("Plese check the controller")
            }   
            
            dispatch(logout(navigate))
            toast.success("Account deleted successfully");
         
        }catch(error){
            toast.error("Could not delete account");
            console.log("Error in delete account api-->",error);
        }

        toast.dismiss(toastId);
   }
}