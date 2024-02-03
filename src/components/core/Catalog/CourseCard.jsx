import React, { useEffect, useState } from 'react'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';
import RatingStars from '../../commen/RatingStar';

function CourseCard({course,height}) {

    const[avgReviewCount , setAvgReviewCount] = useState(0);

    useEffect(()=>{
        const count = GetAvgRating(course?.ratingAndReviews)
        setAvgReviewCount(count);
    },[])
  return (
    <>
        <Link to={`/course/${course._id}`}>
        <div className={`flex flex-col gap-x-2 `}>
        <img src={course.thumbNail} alt='course image'
            className={`${height} rounded-lg w-full object-cover`}
        />
        <p className='text-richblack-5 text-xl'>{course.courseName}</p>
        <p className='text-sm text-richblack-50'>{course.instructor.firstName} {course.instructor.lastName}</p>
        <div className='flex gap-x-2'>
            <span className="text-yellow-5">{avgReviewCount || 0 }</span>
            <RatingStars Review_Count={avgReviewCount}/>
            <p className='text-richblack-400'>({course?.ratingAndReviews?.length})</p>
        </div> 
        <p className='text-xl text-richblack-5'>Rs. {course.price}</p>
    </div>
        </Link>
    </>
  )
}

export default CourseCard