import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import {FaStar} from 'react-icons/fa'
import { RiDeleteBin6Line } from "react-icons/ri";
import  GetAvgRating from '../../../../utils/avgRating'
import {removeFromCart} from '../../../../slices/cartSlice'
const Cart = () => {
  const dispatch = useDispatch();
  const {cart,total,totalItems} = useSelector((state)=>state.cart)

  useEffect(()=>{
    console.log("cart item from cart -->",cart)
  },[])
  function clickHandler (course){
    
    dispatch(removeFromCart(course._id))
  }
  return (
    <div className='text-white'>
    <h1 className='text-[30px] font-medium text-richblack-5'>My Cart</h1>

    <div>
    {
      !cart.length ? (
        <div className='text-[20px] text-richblack-100 font-medium text-center mt-[100px] 
                        pb-6 border-b-[1px] border-b-richblack-500'>
          No Items in the cart
        </div>
      ):(
      <div>

      <div className='pb-3 border-b-[1px] font-semibold text-[16px] border-b-richblack-600 text-richblack-400 '>{totalItems} Courses in Cart</div>

     <div className='flex lg:flex-row flex-col gap-y-6 gap-x-6'>
     <div className='w-full lg:w-[70%]'>
        {
          cart.map((course , index)=>{
           return <div key={index} className='py-6 border-b-[1px] border-b-richblack-600 flex flex-col items-start gap-y-4 justify-center lg:flex-row lg:justify-between text-white'>
              

               <div className='flex gap-x-3 px-6'> 
               <img src={course?.thumbNail} className='max-w-[185px] object-cover aspect-auto h-[150px] rounded-md' />
                <div className='flex flex-col gap-y-2'>
                <p className='font-medium text-[18px] text-richblack-5'>{course?.courseName}</p>
                <p className='text-richblack-300 font-normal text-[16px]'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                {/* be me call karna padega average rating api */}
                <p className='flex flex-row gap-2'> {GetAvgRating(course?.ratingAndReview) || 0}
                <ReactStars
                  count={5}
                  edit={false}
                  activeColor='#ffd700'
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}

                />
                <span>{course?.ratingAndReview?.review?.length}</span>
                </p>
              </div>
               </div>
              <div className='flex flex-col items-center gap-y-3 ml-6'>
                <button 
                onClick={()=>clickHandler(course)}
                className='flex flex-row items-center gap-2 py-2 px-6 bg-richblack-800 rounded-md text-pink-400'>
                    <RiDeleteBin6Line/>
                    Remove
                </button>
                <p className='text-yellow-50 text-xl font-semibold'>Rs. {course.price}</p>
              </div>
            </div>
          })
        }
      </div>

           <div className='flex flex-col gap-y-2 w-[282px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 h-fit lg:mt-6'>
            <p className='text-[14px] font-semibold text-richblack-200'>Total</p>
            <p className='text-2xl font-semibold text-yellow-50'>Rs. {total}</p>
            <button className='py-3 rounded-md px-4 w-full bg-yellow-50 text-richblack-800 font-medium'>Buy Now</button>
           </div>
     </div>
      </div>)
    }

    </div>

    </div>
  )
}

export default Cart