import React from 'react'
import copy from 'copy-to-clipboard'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function CourseDetailCard({course,addToCart,buyNow}) {
   
    
  const {user} = useSelector((state)=>state.profile)
  const navigate = useNavigate()
    const handleShare = () =>{
        copy(window.location.href)
        toast.success("Copied to clickboard")
    }
  return (
    <div className='w-[384px] rounded-md'>
       <img src={course?.thumbNail}
        className='object-fit aspect-auto w-full h-[200px] rounded-tr-md rounded-tl-md'
       />
       <div className='p-6 gap-4 bg-richblack-800 flex flex-col gap-y-4'>
        <p className='text-3xl text-richblack-5 font-bold'>Rs. {course?.price}</p>
        <div className='flex flex-col  gap-y-2'>
            {
              course?.studentsEnrolled?.includes(user._id) ?
              (<button 
            onClick={()=>navigate('/dashboard/enrolled-courses')}
            className='w-full py-3 px-6 text-richblack-800 rounded-md bg-yellow-50 font-semibold'>Go to Course</button>):(
              <div className='flex flex-col gap-2'>
                <button 
            onClick={()=>addToCart(course)}
            className='w-full py-3 px-6 text-richblack-800 rounded-md bg-yellow-50 font-semibold'>Add to Cart</button>
            <button
             onClick={()=>buyNow()}
             className='w-full py-3 px-6 text-richblack-5 rounded-md bg-richblack-700 font-semibold'>Buy Now</button>
              </div>)
            }
            <p className='text-richblack-25 font-normal text-sm text-center '>30-Day Money-Back Guarantee</p>
        </div>
        <div className='flex flex-col gap-y-2 items-start justify-center'>
            <p className='text-[16px] font-medium text-richblack-5'>This course Includes :</p>
            <p className='text-caribeangreen-100 font-medium text-sm'>8 hourse on-demand video</p>
            <p className='text-caribeangreen-100 font-medium text-sm'>Full Lifetime access</p>
            <p className='text-caribeangreen-100 font-medium text-sm'>Access on mobile and Tv</p> 
            <p className='text-caribeangreen-100 font-medium text-sm'>Certificate of completion</p>
        </div>

        <button
        onClick={()=>handleShare()}
         className='text-center text-yellow-50'>
            Share
        </button>
       </div>
    </div>
  )
}

export default CourseDetailCard