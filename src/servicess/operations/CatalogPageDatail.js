import { apiConnector } from "../apiConnector";
import { catalogData } from "../apis";
import { toast } from 'react-hot-toast'

const{CATALOGPAGEDATA_API} = catalogData
export const getCatalogPageData = async(categoryId)=>{
    const toastId = toast.loading("Loading...")
    let result = []
    try{
        const res = await apiConnector("POST",CATALOGPAGEDATA_API,{categoryId : categoryId});
        
        if(!res.data.success){
            throw new Error ("Could not fetch category page data")
        }
        result = res?.data?.data;

        toast.success("All Courses fetched")
    }
    catch(error) {
      console.log("CATALOG PAGE DATA API ERROR....", error);
      toast.error(error.message);
      result = error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
  }