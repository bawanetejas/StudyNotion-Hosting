import React, { useState ,useEffect } from 'react'
import { RxCross2 } from 'react-icons/rx'
import Upload from '../Upload';
import { useForm } from 'react-hook-form';
import IconBtn from '../../../../commen/IconBtn';
import toast from 'react-hot-toast';
import { createSubSection, editSubSection } from '../../../../../servicess/operations/CourseDetailApi';
import { useDispatch, useSelector } from 'react-redux';

import { setCourse } from '../../../../../slices/courseSlice';

function SubSectionModal({
  modalData,
  setModalData,
   add = false,
  view = false,
  edit = false,
}) {

  const [loading ,setLoading]=useState(false);
  const {token} = useSelector((state)=>state.auth)
  const {course} = useSelector((state)=>state.course)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors}
  } = useForm()

  const cancleModal =()=>{
    setModalData(null);
  }

    // filling input field with previous value
    useEffect(() => {
      if (view || edit) {
        // console.log("modalData", modalData)
        setValue("lectureTitle", modalData.title)
        setValue("lectureDesc", modalData.description)
        setValue("lectureVideo", modalData.videoUrl)
      }
    }, [])
  //checking form is updated or not

  const isFormUpdated =()=>{
    const currentValues = getValues();
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true
    }
    return false
  }
  // if form is edited

  const handleEditSubSection = async() =>{
    const currentValues = getValues();
    
    const formData = new FormData();
    console.log("modal data ---",modalData)
    formData.append("sectionId",modalData.sectionId)
    formData.append("subSectionId",modalData._id)

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle)
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc)
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo)
    }

    setLoading(true)

    const response = await editSubSection(formData,token);
    
    if(response){
      const updatedCourseContent = 
      course.courseContent.map((section)=>modalData.sectionId === section._id ? response : section)

      dispatch(setCourse({...course,courseContent:updatedCourseContent}))
    } 
    setModalData(null)
    setLoading(false);
  }
  // form submit function

  const formSubmit = async(data)=>{
           if(view) return 

           if(edit){
            if(!isFormUpdated()){
              toast.error("No chanes made to the form")
            } else{
              handleEditSubSection();
            }
            return
           }

           const formData = new FormData();
           formData.append("sectionId",modalData)
           formData.append("title",data.lectureTitle)
           formData.append('description',data.lectureDesc)
           formData.append("video",data.lectureVideo)

           setLoading(true)

           const result = await createSubSection(formData,token)
   
           if(result){
            //update the course content
            const updatedCourseContent = course.courseContent.map((section)=> section._id === modalData ? result :section)

            const updatedCourse ={...course,courseContent:updatedCourseContent}
            console.log("updated course --->",updatedCourse)
            dispatch(setCourse(updatedCourse))
           }
           
           setModalData(null)
           setLoading(false)
  }
  return (
    <div className='fixed z-[2000] inset-0 !mt-0 overflow-auto grid h-screen place-items-center
    bg-white bg-opacity-10 backdrop-blur-sm'>
      <div className='my-10 w-11/12 max-w-[700px]  rounded-lg border border-richblack-400 bg-richblack-800'>

        {/* form header */}
          <div className='flex w-full z-[2000]  items-center justify-between p-5 rounded-t-lg bg-richblack-700'>
              <p className='text-xl font-semibold text-richblack-5'>
                {view && "Viewing"} {edit && "Editing"} {add &&"Adding"} Lecture
              </p>
              <button onClick={cancleModal}>
              <RxCross2 className='text-2xl text-richblack-5'/>
              </button>
          </div>
        {/* form */}
          <form onSubmit={handleSubmit(formSubmit)}
          className='space-y-8 px-8 py-10'>

          {/* vedio upload detail */}
              <Upload
                  name={"lectureVideo"}
                  label="Lecture Video"
                  register={register}
                  setValue ={setValue}
                  errors={errors}
                  video = {true}
                  viewData = {view ? modalData.videoUrl:null}
                  editData = {edit ? modalData.videoUrl:null}
              />

              <div className='flex flex-col space-y-2'>
                <label className='text-sm text-richblack-5' htmlFor='lectureTitle'>Lecture Title {!view && <sup className='text-red '>*</sup>}</label>
                <input
                  id='lectureTitle'
                  disabled={view || loading}
                  placeholder='Please Enter Lecture title'
                  {...register("lectureTitle",{required:true})}
                  className='form-style w-full'
                />
                {
                  errors.lectureTitle && (
                    <span className='mt-2 text=xs tracking-wide text-pink-400'>Lecture Title is required</span>
                  )
                }
              </div>

              <div className='flex flex-col space-y-2'>
                <label className='text-sm text-richblack-5' htmlFor='lectureDesc'>Lecture Description {!view && <sup className='text-red '>*</sup>}</label>
                <textarea
                  id='lectureDesc'
                  disabled={view || loading}
                  placeholder='Please Enter Lecture title'
                  {...register("lectureDesc",{required:true})}
                  className='form-style resize-x-none min-h-[130px] w-full'
                />
                {
                  errors.lectureDesc && (
                    <span className='mt-2 text=xs tracking-wide text-pink-400'>Lecture description is required</span>
                  )
                }
              </div>
              {
                !view && (
                  <div className='w-full flex justify-end'>
                    <IconBtn
                    type={'submit'}
                    disabled={loading}
                    text={loading ? "Loading...": edit ? "Save Changes" :"Save"}
                    />
                  </div>
                )
              }
          </form>
          </div>
    </div>
  )
}

export default SubSectionModal