import React from 'react'
import { FaMessage, } from "react-icons/fa6";
import { FaEarthAmericas } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import ConnectUs from '../components/core/About/ConnectUs';
import Footer from '../components/commen/Footer';
import ReviewModal from '../components/commen/ReviewModal';

function ContactUs() {
  return (
    <div>

    {/* contact us section */}

    <section className='lg:px-[120px] py-[90px] mx-auto max-w-maxContent w-11/12  '>
        <div className='flex flex-col gap-3 lg:flex-row mx-auto justify-between w-full items-start'>
            <div className='flex flex-col gap-[24px] p-[24px] rounded-md bg-richblack-800 md:w-[450px] h-fit'>
                <div className='flex flex-row gap-2'>
                    <FaMessage className='text-richblack-200'  size={24}/>
                    <div className='flex flex-col gap-1 '>
                        <p className='text-[18px] font-semibold leading-[24px] text-richblack-5'>Chat on us</p>
                        <p className='text-[14px]  text-richblack-200 font-semibold leading-[24px]'>Our friendly team is here to help. <br/> @mail.com</p>
                    </div>
                </div>
                <div className='flex flex-row gap-2 '>
                <FaEarthAmericas className='text-richblack-200' size={24}/>
                    <div className='flex flex-col gap-1 '>
                        <p className='text-[18px] font-semibold leading-[24px] text-richblack-5'>Visit Us</p>
                        <p className='text-[14px]  text-richblack-200 font-semibold leading-[24px]'>Come and say hello at our office HQ. <br/>Here is the location/ address</p>
                    </div>
                </div>
                <div className='flex flex-row gap-2'>
                <IoCall className='text-richblack-200' size={24}/>
                    <div className='flex flex-col gap-1 '>
                        <p className='text-[18px] font-semibold leading-[24px] text-richblack-5'>Call Us</p>
                        <p className='text-[14px]  text-richblack-200 font-semibold leading-[24px]'>Mon - Fri From 8am to 5pm<br/>+123 456 7890</p>
                    </div>
                </div>
                
              
            </div>
            <div className='flex flex-col items-center gap-3 lg:w-[700px] p-2 md:p-[52px] border-[1px] rounded-md border-richblack-500 mx-auto'>
                    <h1 className='font-semibold text-richblack-5 md:w-[600px] text-xl md:text-[36px] md:leading-[44px] -tracking-[2%]'>Got a Idea? We’ve got the skills. Let’s team up</h1>
                    <p className='font-[500] text-richblack-300 text-[16px] leading-[24px]'>Tall us more about yourself and what you’re got in mind.</p>

                    <ConnectUs/>
            </div>
        </div>
    </section>
    <div className='w-11/12 mx-auto max-w-maxContent'>
       <ReviewModal/>
       </div>
    <Footer/>

    </div>
  )
}

export default ContactUs