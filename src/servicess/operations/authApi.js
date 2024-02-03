

import {toast} from 'react-hot-toast'

import { setLoading,setToken } from '../../slices/authSlice'
import { apiConnector } from '../apiConnector'
import { endpoints } from '../apis'
import { setUser } from '../../slices/profileSlice'
import {resetCart} from '../../slices/cartSlice'

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
  } = endpoints


  export function sendOtp(email,navigate){
    return async (dispatch) =>{
        const toastId = toast.loading("Loading...")
        console.log("email-->",email)
        dispatch(setLoading(true));
        try{
            // console.log(SENDOTP_API)
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
            });

            console.log("response of signup api......",response)
            if(!response.data.success){
                throw new Error (response.data.message);
            }
            toast.success("otp send successfully")

            navigate("/verify-email")

        }catch(error){
            console.log("SENDOTP API ERROR ...",error);
            toast.error("Could not send OTP")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
  }

  export  function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    contactNumber,
    navigate
  ) {
    return async (dispatch)=>{
       dispatch(setLoading(true));
       const toastId = toast.loading("Loading.....");
       console.log("signup flow-->",accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        contactNumber,
        otp,)
       try{
        const response = await apiConnector("POST",SIGNUP_API,{
                                                              firstName ,
                                                              lastName,
                                                              email,
                                                              otp,
                                                              password,
                                                              confirmPassword,
                                                              accountType,
                                                              contactNumber,})
        console.log("goat you")
        console.log("sign api response",response)
       if(!response.data.success){
        throw new Error(response.data.message);
       }
       toast.success("Login Successfull");
       toast.dismiss(toastId);
       navigate("/login");

       }catch(error){
          console.log('signup api error',error);
          toast.error("sign up failed");
          toast.dismiss(toastId);
          // navigate("/signup");
       }

       dispatch(setLoading(false));
       toast.dismiss(toastId);
    }
  }


  export function login(email,password,navigate){
    return async (dispatch)=>{
        
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading")
        try{
            console.log(email);
            const response = await apiConnector("POST",LOGIN_API,{
                                                    
                                                     email,
                                                     password,
            })    

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Login Successfull");
            dispatch(setToken(response.data.token));

            const userImage = response.data?.user?.image ?
                               response.data.user.image :
                               `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            
            dispatch(setUser({...response.data.user, image:userImage}));
            localStorage.setItem("user", JSON.stringify(response.data.user))
            localStorage.setItem("token",JSON.stringify(response.data.token))
            navigate("/dashboard/my-profile")

        }catch(error){
               console.log("Login Api error..",error);
               toast.error("Login Failed");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
  }

  export function getPasswordResetToken(email,setSentEmail){
    return async (dispatch) =>{

      dispatch(setLoading(true));
      try{
        const res = await apiConnector("POST",RESETPASSTOKEN_API,{email});

        console.log("Pass token respons",res);
        if(!res.data.success){
          throw new Error("Email not sent");
        }
        console.log("response of reset password-->",res)
        toast.success("Email Sent Successfully");

      }catch(error){
        console.log("error in resetpasstoken api",error)
        toast.error("email not sent");
      }

      setSentEmail(true);
      dispatch(setLoading(false));

    }
  }

export function resetPassword (setEmail,password,confirmPassword,token){
  return async(dispatch)=>{
            dispatch(setLoading(true));
            try{
              const res = await apiConnector("POST",RESETPASSWORD_API,{
                                                   password,
                                                   confirmPassword,
                                                   token,
                                                  })
              
              if(!res.data.success){
                throw new Error("Password not reseted Successfully");
              }

              // console.log("response of RESETPASSWORD_API-->",res)    
              setEmail(res.data.email)
              toast.success("Password Reseted Successfully");
            }catch(error){
              console.log("Error in Password Reset Api -->",error)
              toast.error("Password Not Reseted");
            }
            dispatch(setLoading(false));
  }
}

export function logout(navigate){
  return async(dispatch)=>{
    dispatch(setToken(null));
    dispatch(resetCart());
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  }
}