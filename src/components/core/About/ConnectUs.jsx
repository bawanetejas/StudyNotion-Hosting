import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import countryode from '../../../data/countrycode.json'

function ConnectUs() {
    const [loading ,setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    } = useForm()

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:'',
                firstName:'',
                lastName:'',
                message:'',
                phoneNO:''
            })
        }
    },[reset,isSubmitSuccessful])

    function submitContactForm(data){
        setLoading(true)
        console.log("form data",data)
        setLoading(false)
    }



  return (
    <form className='flex flex-col gap-4 justify-center mx-auto w-[350px] md:w-[600px] md:p-[30px]' 
    onSubmit={handleSubmit(submitContactForm)}
    >
        <div className='flex flex-row justify-between w-full gap-3 '>
            <div className='flex flex-col w-full md:w-[45%]'>
                <label htmlFor='firstName' className='text-[14px] text-richblack-5'>First name</label>
                <input
                    name='firstName'
                    id="firstName"
                    type='text'
                    placeholder='Enter First Name'
                    className='form-style w-full'
                    {...register("firstName", {required:true})}
                />
                {
                    errors.firstName && (
                        <span className="-mt-1 text-[12px] text-yellow-100">Please enter Your First Name</span>
                    )
                }
            </div>
            <div className='flex flex-col w-full md:w-[45%]'>
                <label htmlFor='lastName'className='text-[14px] text-richblack-5'>Last name</label>
                <input
                    name='lastName'
                    id="lastName"
                    type='text'
                    placeholder='Enter last Name'
                    className='form-style'
                    {...register("lastName", {required:true})}
                />
              
            </div>
        </div>

        <div className='flex flex-col'>
            <label htmlFor='email' className='text-[14px] text-richblack-5'>Email</label>
            <input
                type='email'
                placeholder='Enter your Email'
                name='email'
                id='email'
                className='form-style'
                {...register("email",{required:true})}
            />
            {
                errors.email &&(
                        <span className="-mt-1 text-[12px] text-yellow-100">Please Enter Your Email</span>
                )
            }
        </div>

        <div className='flex flex-col w-full'>
            <label htmlFor='phoneNnumber' className='text-[14px] text-richblack-5'>Enter Mobile Number</label>
            <div className='flex flex-row justify-between'>
                <select className='form-style w-[80px]'
                name='countrycode'
                {...register("country",{required:true})}
                >
                    {
                        countryode.map((country,i)=>(
                            <option key={i} className='form-style'>{country.code}-{country.country}</option>
                        ))
                    }
                </select>
                <input
                    type='tel'
                    name='phoneNumber'
                    id='phoneNumber'
                    placeholder='12345 6890'
                    {
                        ...register("phoneNO",{
                           required:{
                            value:true,
                            message:"Please enter your Number"
                           },
                           minLength:{value:10 , message:"Invalid number"},
                           maxLength:{value:12 , message:"Invalid number"}
                           }

                        )
                    }
                    className='form-style w-[calc(100%-100px)]'
                />
                {
                    errors.phoneNO &&(
                        <span className="-mt-1 text-[12px] text-yellow-100">{errors.phoneNO.message}</span>
                    )
                }
            </div>
        </div>

        <div className='flex flex-col w-full'>
            <label htmlFor='message' className='text-[14px] text-richblack-5'>Message</label>
            <textarea
            rows={5}
            cols={60}
            name='message'
            id='message'
            placeholder='Enter your message'
            {
                ...register("message",{
                    required:true
                })
            }
            className='form-style'
            ></textarea>
            {
                errors.message && (
                    <span className="-mt-1 text-[12px] text-yellow-100">Please Enter Proper Message</span>
                )
            }
        </div>

        <button
        type='submit'
        disabled={loading}
        className='text-ceter bg-yellow-100 text-richblack-900 font-semibold rounded-md py-2 '
        >
            Send Message
        </button>
    </form>
  )
}

export default ConnectUs