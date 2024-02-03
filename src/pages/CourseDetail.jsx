import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getAllCourseDetail } from '../servicess/operations/CourseDetailApi';
import GetAvgRating from '../utils/avgRating';
import RatingStars from '../components/commen/RatingStar';
import {formattedDate} from '.././utils/dateFormatter'
import {addToCart} from '../slices/cartSlice'
import ConfirmationModal from '../components/commen/LogoutModal'
import CourseDetailCard from '../components/core/CourseDetailPage/CourseDetailCard';
import toast from 'react-hot-toast';
import Footer from '../components/commen/Footer'
import CourseAccourdianBar from '../components/core/CourseDetailPage/CourseAccourdianBar';
import { buyCourse } from '../servicess/operations/paymentApi';
function CourseDetail() {
    const {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth)
    const {user} = useSelector((state)=>state.profile)
    const {paymentLoading} = useSelector((state)=>state.course)
    const[courseDetails,setCourseDetails] = useState(null);
    const[confirmationModal,setConfirmationModal] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate()


    useEffect(()=>{
        const getFullCourseDetail=async()=>{
            const res= await getAllCourseDetail(courseId,token);
            // console.log("response of the full course --->",res)
            setCourseDetails(res.courseDetails);
            
           
           
        }

        
        getFullCourseDetail();
    },[courseId])

    const avgRating =GetAvgRating(courseDetails?.ratingAndReviews)

    const addToCartCourse = ()=>{
      if(!token){
        toast.error("you are not logged in")
        setConfirmationModal({
          text1:"You are not Logged in!",
          text2:"Please login to purchase Course",
          btn1:"Login",
          btn2:"Cancel",
          btn1Handler:()=>navigate("/login"),
          btn2Handler:()=>setConfirmationModal(null)
        })
      }
      dispatch(addToCart(courseDetails))
    }
    const  handleBuyNow =()=>{
          if(token){
            buyCourse(token,[courseId],user,navigate,dispatch)
            return
          }
          setConfirmationModal({
            text1:"You are not Logged in!",
            text2:"Please login to purchase Course",
            btn1:"Login",
            btn2:"Cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler:()=>setConfirmationModal(null)
          })
    }

    const [isActive,setIsActive]=useState(Array(0))

    const handleActive =(id)=>{
      
     setIsActive(
      !isActive.includes(id)?(isActive.concat([id]))
      :(isActive.filter((e)=> e !== id))
     )

      
    }

    const [totalNoOfLectures,setTotalNoOfLectures] = useState(null)
    useEffect(()=>{
      let lectures = 0
      courseDetails?.courseContent.forEach((sec)=>{
        lectures +=sec?.subsection?.length || 0

      })
      setTotalNoOfLectures(lectures)
    },[courseDetails])
    return (
    <>
        {/* section 1 */}
        <div className='w-full bg-richblack-800 relative'>
            <div className='lg:max-w-maxContent w-11/12 mx-auto py-4 relative'>
            <p className='text-richblack-400 font-medium my-2'>
                Home / Learining / <span className='text-yellow-300'> {courseDetails?.category?.name} </span></p>
            
            <div className='w-full max-h-[30rem] block lg:hidden'>
              <img src={`${courseDetails?.thumbNail}`}
                alt='course Thumbnail'
                className='aspect-auto w-full'
              />
            </div>
            <div className='flex flex-col gap-y-3 lg:max-w-[750px] max-w-maxContentTab  lg:pr-5 lg:border-r-[1px] lg:border-r-richblack-600'>
                
                <p className='text-[30px] font-medium text-richblack-5'>{courseDetails?.courseName}</p>
                <p className='text-richblack-200 text-[14px] font-normal'>{courseDetails?.courseDescription}</p>
                <div className='flex gap-x-2 text-richblack-25 font-medium text-[16px] items-center'>
                    <p>{avgRating || 0}</p>
                    <RatingStars Review_Count={avgRating}/>
                    <p>({courseDetails?.ratingAndReviews?.length || 0} Rating)</p>
                    <p>{courseDetails?.studentsEnrolled.length || 0} Students</p>
                </div>
                <p className='text-richblack-25 text-[16px] font-medium'>Created by {courseDetails?.instructor?.firstName} {courseDetails?.instructor?.lastName}</p>
                <p className='text-richblack-25 text-[16px] font-medium'>Created at {formattedDate(courseDetails?.createdAt)}</p>
            </div>
            <div className='flex flex-col mt-2 justify-start gap-y-2 border-y border-y-richblack-500 py-4 lg:hidden'>
              <p className='space-x-3 pb-4 text-3xl font-semibold text-richblack-5'>Rs. {courseDetails?.price}</p>
              {
                courseDetails?.studentsEnrolled.includes(user._id) ? 
                (
                  <button 
              onClick={()=>navigate('/dashboard/enrolled-courses')}
              className='py-3 px-6 max-w-[300px] text-center rounded-md text-lg bg-yellow-50 text-richblack-700 font-semibold'>
               Go to Course
              </button>
                ):(
              <div className='flex flex-col gap-3'>
              <button 
              onClick={()=>handleBuyNow()}
              className='py-3 px-6 max-w-[300px] text-center rounded-md text-lg bg-yellow-50 text-richblack-700 font-semibold'>
                Buy Now
              </button>
              <button 
              onClick={addToCartCourse}
              className="py-3 px-6 max-w-[300px] text-center rounded-md text-lg text-yellow-50 bg-richblack-700 font-semibold">Add to Cart</button>
                  </div>
                )
              }
            </div>

            <div className='lg:block hidden absolute xl:right-20 right-1 top-12'>
                <CourseDetailCard
                  course={courseDetails}
                  addToCart={addToCartCourse}
                  buyNow={handleBuyNow}
                />
            </div>
            </div>
       
        </div>
        {/* what you will learn */}
        <div className='lg:w-[1260px] w-11/12 mx-auto px-4 xl:px-0'>
        <div className='text-richblack-5 max-w-[750px] w-11/12 
        border-richblack-700 border-[1px] mt-10 p-8'>
          <div className='flex flex-col gap-y-2'>
            <p className='text-2xl font-medium'>What you'll learn</p>
           <div>
              {courseDetails?.whatYouWillLearn}
           </div>

          </div>
        </div>
        
        <div className='lg:w-[750px] max-w-[800px] w-11/12 flex  justify-between items-baseline text-richblack-5 my-8'>
          <div className='flex flex-col gap-2'>
            <p className="text-[28px] font-semibold">Course Content</p>
            <div className='flex gap-2 text-richblack-500'>
              <p>{courseDetails?.courseContent?.length} sections</p>
              <p>{totalNoOfLectures} lectures</p>
            </div>
          </div>
          <button className="text-yellow-25"
          onClick={()=>setIsActive([])}>
            Collapse all
          </button>
        </div>
         {/* courseDetail accordion */}
         <div className='lg:w-[750px] max-w-[800px] w-11/12'>
           {
            courseDetails?.courseContent?.map((section,index)=>{
             return <CourseAccourdianBar
                section={section}
                key={index}
                isActive={isActive}
                handleActive={handleActive}
              />
            })
           }
        </div>

        {/* instructor */}
        <div className='my-8 flex flex-col gap-2 lg:w-[750px] w-11/12'>
          <p className='text-2xl font-medium text-richblack-5'>Author</p>
          <div className='flex flex-row gap-2 items-center'>
            <img src={courseDetails?.instructor?.image} className='aspect-square w-8 rounded-full'/>
            <p className='text-richblack-5 text-lg font-medium'>{courseDetails?.instructor?.firstName} {courseDetails?.instructor?.lastName}</p>
          </div>
          <p className='text-sm text-richblack-50 font-normal'>I will be your lead trainer in this course. Within no time, I will help you to understand the subject in an easy manner. I have a 
          huge experience in online training and recording videos. Let's get started!</p>
        </div>
        </div>
      {/* Review part is remaining */}
       <Footer/>
        {confirmationModal && <ConfirmationModal logoutModal={confirmationModal}/>}
    </>
  )
}

export default CourseDetail