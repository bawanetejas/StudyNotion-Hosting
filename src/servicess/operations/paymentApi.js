import toast from 'react-hot-toast';
import {studentEndpoints} from '../apis'
import { apiConnector } from '../apiConnector';
import {setPaymentLoading} from '../../slices/courseSlice'
import {resetCart} from '../../slices/cartSlice'

import rzplogo  from '../../assets/Images/Compare_with_others.svg'

const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API}=studentEndpoints

function loadScript(src){
    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src=src

        script.onload=()=>{
            resolve(true);

        }
        script.onerror=()=>{
            resolve(false);
        }
        document.body.appendChild(script)
    })
}

export async function buyCourse (token,courses,user,navigate,dispatch,) {
    const toastId = toast.loading("Loading...");

    try{
        //load the script

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            toast.error("Razorpay SDK failed to load")
            return 
        }
        //initiate the order

        const orderResponse = await apiConnector("POST",COURSE_PAYMENT_API,{courses},
                                                {
                                                    Authorization:`Bearer ${token}`
                                                });
        console.log("order response of payment --->",orderResponse,
        "key of the razorpay -->",process.env.RAZORPAY_KEY)

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.data)
        }

        const options ={
            key:'rzp_test_ycK24dgVqnbeWj',
            currency:orderResponse.data.data.currency,
            amount:`${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"StudyNotion",
            description:"Thank You form purchasing the course",
            image:rzplogo,

            prefill:{
                name:`${user.firstName}`,
                email:user.email
            },
            handler:function(response){
                verifyPayment({...response,courses},token,navigate,dispatch)
            }

        }

        //razorpay window
         
        const paymentObject = new window.Razorpay(options)
        paymentObject.open();

        paymentObject.on("payment failed",function(response){
            toast.error("oops,payment failed")
            console.log(response.error)
        })
        
    }catch(error){
        console.log("error in payment api --->",error)
        toast.error("Payment Failed");
    }

    toast.dismiss(toastId);
}


async function verifyPayment(bodyData,token,navigate,dispatch){
    const toastId = toast.loading("Verifying Signature...")
    dispatch(setPaymentLoading(true));
    try{
       const response = await apiConnector("POST",COURSE_VERIFY_API,bodyData,{
                    Authorization:`Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error("response.data.error");
        }

        toast.success("Payment successfull you are added to the course")
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }catch(error){
        console.log("Payment verify error --->",error);
        toast.error("Could not verify Payment")
    }

    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false));
}