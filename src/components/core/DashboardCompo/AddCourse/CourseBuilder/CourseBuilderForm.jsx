import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../../commen/IconBtn'
import {IoAddCircleOutline} from 'react-icons/io5'
import {setCourse,setEditCourse,setStep} from '../../../../../slices/courseSlice'
import { createSection } from '../../../../../servicess/operations/CourseDetailApi'
import {toast} from 'react-hot-toast'
import {MdNavigateNext} from 'react-icons/md'
import { updateSection } from '../../../../../servicess/operations/CourseDetailApi'
import NestedView from './NestedView'
function CourseBuilderForm() {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors}
  } = useForm()

  const {course} = useSelector((state)=>state.course)
  const {token} = useSelector((state)=>state.auth)
  const [loading,setLoading] = useState();
  const [editSectionName,setEditSectionName] = useState(null)

  const dispatch = useDispatch();

  //handle form submit action
   const onSubmit = async (data)=>{
    // console.log("course--->",course)
  
    setLoading(true)
    let result

    if(editSectionName){
       result = await updateSection(
        {
          sectionName:data.sectionName,
          courseId:course._id,
          sectionId:editSectionName,
        }
        ,token)
       
    } else{
      result = await createSection(
        { sectionName : data.sectionName,
          courseId : course._id,
        },
        token,)
    }
      if(result){
        dispatch(setCourse(result))
        setEditSectionName(null)
        setValue("sectionName","")
      }
      setLoading(false)
      
   }  

   const cancelEdit =()=>{
     setEditSectionName(null);
     setValue("sectionName","");
   }

    const handleChangeEditSectionName = (sectionId , sectionName)=>{
      if(editSectionName === sectionId){
        cancelEdit()
        return 
      }
      setEditSectionName(sectionId)
      setValue("sectionName",sectionName)
    }
  
    const goToNext = () =>{
      if(course.courseContent.length === 0){
        toast.error("Please add atlest one section")
        return
      }
      if(course.courseContent.some((section)=>section.subsection.length === 0)){
        toast.error("Please add atleast one lecture in each subsection")
        return
      }
      dispatch(setStep(3))
    }

    const goBack =()=>{
      dispatch(setStep(1));
      dispatch(setEditCourse(true));
    }
  return (
   <div className='bg-richblack-800 relative rounded-md border-[1px] border-richblack-700 p-[24px] space-y-[26px] '>
     <p className='text-2xl font-semibold text-richblack-5'>Course Builder</p>

     <form onSubmit={handleSubmit(onSubmit)} >
       <div className='flex flex-col gap-2'>
       <label htmlFor='sectionName' className='text-sm text-richblack-5'>Section Name <sup className='text-pink-400'>*</sup></label> 
       <input
        className='form-style w-full'
        placeholder='Enter section name'
        id='sectionName'
        {...register("sectionName",{required:true})}
       />
       {
        errors.sectionName && (
          <span className='ml-2 text-xs tracking-wide text-pink-400'>Section name is required</span>
        )
       }
       </div>

       <div className='flex items-end gap-x-4 mt-4 w-full' >
       <IconBtn
       type={'submit'}
       outline ={true}
       disabled={loading}
       text={editSectionName ? "Edit Section Name" :"Create Section"}
       >
       <IoAddCircleOutline size={20} className="text-yellow-50" />
       </IconBtn>

      {
        editSectionName &&  <button
                              type='button'
                              onClick={cancelEdit}
                              className='text-sm text-richblack-300 underline'
                              >
                                Cancel Edit
                            </button>
      }
       </div>
       </form>
      {/* nested view */}
    <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
    <div className='flex gap-x-2'>

    <button
    onClick={goBack}
    className='flex cursor-pointer items-center gap-x-2 rounded-md
     bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'>
      Back
     </button>

     <IconBtn
     disabled={loading}
     text="Next"
     onclick={goToNext}
     >
      <MdNavigateNext />
     </IconBtn>

    </div>

   </div>
  )
}

export default CourseBuilderForm