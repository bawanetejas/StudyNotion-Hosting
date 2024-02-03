import React, { useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { COURSE_STATUS } from '../../../../utils/constants';
import { HiClock } from 'react-icons/hi';
import { FaCheck } from 'react-icons/fa6';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteCourse } from '../../../../servicess/operations/CourseDetailApi';
import { ConfirmationModal } from '../ConfirmationModal';
import { formattedDate } from '../../../../utils/dateFormatter';
export const CoursesTable = ({courses,setCourses}) => {

    const {token} = useSelector((state)=>state.auth)
    const [loading,setLoading] = useState(false)
    const [confirmationModal,setConfirmationModal] = useState(null)
    const navigate = useNavigate()
    const DESPCREPTION_LENGTH = 40

    const handleCourseDelete =async (courseId) =>{
        setLoading(true);
        const result = await deleteCourse(courseId,token)

        if(result){
            console.log("result from the front end -->",result)
            setCourses(result);
        }
        setLoading(false)
        setConfirmationModal(null)
    }
  return (
    <>
       <Table className='rounded-xl border border-richblack-800'>
        <Thead >
            <Tr className='flex gap-x-10 rounded-t-md border-b border-richblack-800 px-6 py-2'>
                <Td className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">Courses</Td>
                <Td className=" text-left text-sm font-medium uppercase text-richblack-100 md:hidden lg:block">DURATION</Td>
                <Td className=" text-left text-sm font-medium uppercase text-richblack-100">PRICE</Td>
                <Td className=" text-left text-sm font-medium uppercase text-richblack-50">ACTIONS</Td>
            </Tr>

        </Thead>
        <Tbody>
            {
                courses?.length === 0 ? (
                    <Tr>
                        <Td className="py-10 text-center text-2xl font-medium text-richblack-100"
                        >No Courses Found</Td>
                    </Tr>
                ):(
                   courses.map((course)=>{
                    return <Tr key={course._id}
                    className='flex gap-x-10 border-b border-richblack-800 px-6 py-8'
                    >
                       
                        <Td className='flex flex-1 gap-x-3 text-white'>
                            <img 
                                src={course?.thumbNail}
                                alt='course Image'
                                className='max-w-[220px] w-[120px] md:w-[150px] h-[150px] rounded-lg'
                            />
                            <div className='flex flex-col items-between justify-between'>
                                <p className="text-lg font-semibold text-richblack-5">{course.courseName} :</p>
                                <p className='text-xs text-richblack-300'>
                                {course?.courseDescription.split(" ").length > 
                                DESPCREPTION_LENGTH ?
                                (course.courseDescription.split(" ").slice(0,DESPCREPTION_LENGTH).join(" ")+"...")
                                : (course.courseDescription )                                               
                                }</p>
                                <p> Created : {formattedDate(course?.createdAt)}</p>
                                {
                                    course.status === COURSE_STATUS.DRAFT ?
                                    (<p className='bg-richblack-700 w-fit text-pink-100 font-medium flex items-center gap-x-3 rounded-full px-[8px] py-[2px]'>
                                        <HiClock size={14}/> Drafted
                                    </p>) :
                                    (<p className='text-yellow-100 font-medium w-fit bg-richblack-700 flex items-center gap-x-3 rounded-full px-[8px] py-[2px]'
                                    >
                                        <FaCheck size={14}/> Published
                                    </p>)
                                }
                            </div>
                        </Td>
                        <Td className='text-sm font-medium text-richblack-100 md:hidden lg:block'>
                             2hr 30min
                        </Td>
                        <Td className = 'text-sm font-medium text-richblack-100'>
                        ₹ {course.price}
                        </Td>
                        <Td>
                            <button
                            disabled={loading}
                            onClick={()=>{
                                navigate(`/dashboard/edit-course/${course._id}`)
                            }}
                            className='px-2 transition-all text-richblack-500 duration-200 hover:scale-110  hover:text-caribeangreen-300'
                            >
                                <FiEdit size={20}/>
                            </button>
                            <button
                            // disabled={loading}
                            onClick={()=>{
                                setConfirmationModal({
                                    text1:"Do you want to delete this course?",
                                    text2:"All the data related to this course will be deleted",
                                    btn1:!loading ? "Delete":"Loading..",
                                    btn2:"Cancle",
                                    btn1Handler:!loading ? ()=>handleCourseDelete(course._id):()=>{},
                                    btn2Handler:!loading ? ()=>setConfirmationModal(null) :()=>{}
                                })
                            }}
                            className='px-1 transition-all duration-200 text-richblack-500 hover:scale-110 hover:text-caribeangreen-300'
                            >
                                <RiDeleteBin6Line size={20}/>
                            </button>
                        </Td>
               
                    </Tr>
                   })
                )
            }
        </Tbody>
       </Table>
       {confirmationModal && <ConfirmationModal modalData={confirmationModal} setModalData={setConfirmationModal}/>}
    </>
  )
}
