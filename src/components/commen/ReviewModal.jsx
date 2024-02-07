import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { FreeMode, Pagination}  from 'swiper/modules'

import { ratingsEndpoints } from '../../servicess/apis'
import { apiConnector } from '../../servicess/apiConnector';
import toast from 'react-hot-toast';

import ReactStars from "react-rating-stars-component"

function ReviewModal() {

    const [reviews,setRewiews] = useState([])
    useEffect(()=>{

        const reviewDetial = async()=>{
            
            try{
                const reviewData = await apiConnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API);
            //    console.log("reviw data -->",reviewData)
                if(!reviewData?.data?.success){
                    throw new Error("Could not fetch review")
                }
                setRewiews(reviewData?.data?.data)
                toast.success("Review Fetched")
            }catch(error){
                console.log("error in the  review api -->",error)
                toast.error("Review not fetched")
            }
        }
        reviewDetial();
    },[])
  return (
    <div className='w-full my-10'>
        <p className='text-richblack-5 font-semibold text-center text-2xl my-6'>Reviews From Other Learners</p>

        <div className='w-full'>
            <Swiper
             spaceBetween={25}
            loop={true}
            modules={[FreeMode, Pagination]}
                breakpoints={{
                    1024: {
                    slidesPerView: 3,
                    },
                }}

            className="max-h-[30rem]"
            >
            {
                reviews?.map((review,i)=>{
                 return   <SwiperSlide key={i}>
                        <div className='bg-richblack-800 p-4 max-w-[30rem] w-fit min-w-[300px]'>
                            <div className='flex gap-3'>
                                <img src={review?.user?.image}
                                    className='w-[60px] aspect-square rounded-full'
                                />
                                <div>
                                    <p className='text-richblack-25 font-medium '>{review?.user?.firstName} {review?.user?.lastName}</p>
                                    <p className='text-richblack-400 '>{review?.user?.email}</p>
                                </div>
                            </div>
                            <p className='text-richblack-100 '>{review?.review}</p>
                            <div className='flex gap-2 items-center'>
                                <p className='text-xl text-yellow-50 font-semibold'>{review?.rating}</p>
                                <ReactStars
                                    edit={false}
                                    value={review?.rating}
                                    size={24}
                                    activeColor="#ffd700"
                                    count={5}
                                />
                            </div>
                        </div>
                    </SwiperSlide>
            })
            }
            </Swiper>
        </div>

    </div>
  )
}

export default ReviewModal