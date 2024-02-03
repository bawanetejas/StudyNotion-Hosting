import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {HiOutlineCurrencyRupee} from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { addCourseApi, getAllCategories, editCourseDetails } from '../../../../../servicess/operations/CourseDetailApi';
import TagInput from './TagInput';
import RequirementsField from './RequirementsField'
import Upload from '../Upload'
import IconBtn from '../../../../commen/IconBtn'
import {setCourse ,setStep} from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from '../../../../../utils/constants'
import {toast} from 'react-hot-toast'

function CourseInformationForm() {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
    } = useForm();
    const dispatch = useDispatch()
    const {token} = useSelector((state)=> state.auth)
    const {course , editCourse ,step} = useSelector((state)=>state.course)
    const [loading , setLoading] = useState(false);
    const [courseCategory , setCourseCategory] = useState();

    // fetching all the category

    useEffect(()=>{
      const getCategories = async () =>{
        setLoading(true)
        const categories = await getAllCategories();
        // console.log("catory form --->",categories)
        if(categories.length>0){
          setCourseCategory(categories);
        }
        setLoading(false);
      }
      // if form is in edit mode

      if(editCourse){
        setValue("courseTitle",course.courseName)
        setValue("courseShortDesc",course.courseDescription)
        setValue("coursePrice",course.price)
        setValue("courseTags",course.tag)
        setValue("courseBenefits",course.whatYouWillLearn)
        setValue("courseRequirements",course.instructions)
        setValue("courseImage",course.thumbnail)
      }
      getCategories()
    },[])

    // checking form is updated or not 
    const isFormUpdated = () => {
      const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      if (
        currentValues.courseTitle !== course.courseName ||
        currentValues.courseShortDesc !== course.courseDescription ||
        currentValues.coursePrice !== course.price ||
        currentValues.courseTags.toString() !== course.tag.toString() ||
        currentValues.courseBenefits !== course.whatYouWillLearn ||
        currentValues.courseCategory._id !== course.category._id ||
        currentValues.courseRequirements.toString() !==
          course.instructions.toString() ||
        currentValues.courseImage !== course.thumbnail
      ) {
        return true
      }
      return false
    }
  async  function onSubmitHandler (data){

    if (editCourse) {
    
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("courseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          )
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }
        // console.log("Edit Form data: ", formData)
        setLoading(true)
        
        const result = await editCourseDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

        // appending data when course is created
        //  console.log("data of the form --->",data)
        const formData = new FormData();
        formData.append("courseName",data.courseTitle)
        formData.append("courseDescription",data.courseShortDesc)
        formData.append("category",data.courseCategory)
        formData.append("price",data.coursePrice)
        formData.append("tag",JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn",data.courseBenefits)
        formData.append("instructions",JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage",data.courseImage)
        formData.append("status",COURSE_STATUS.DRAFT)
        
      const response =  await  addCourseApi(formData ,token)
      // console.log("response-->",response)
      if(response){

        dispatch(setCourse(response))
        dispatch(setStep(2))

      }
      // console.log("Step of the compo",step)
      // console.log("front end course set --->",course)
    }
   
  return (
    <form
    onSubmit={handleSubmit(onSubmitHandler)}

    className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'
    >
    {/* course title */}
      <div className='flex flex-col space-y-2'>
        <label className='text-sm text-richblack-5' htmlFor='courseTitle'>Course Title <sup>*</sup></label>
        <input
          id='courseTitle'
          placeholder='Enter Course Title'
          {...register("courseTitle",{required:true})}
          className='w-full form-style'

        />
        {
          errors.courseTitle &&(
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
              Course Title is required
            </span>
          )
        }
      </div>

       {/* course descreption */}
       <div className='flex flex-col space-y-2'>
        <label className='text-sm text-richblack-5' htmlFor='courseShortDesc'>Course Short descreption <sup>*</sup></label>
        <textarea
          id='courseShortDesc'
          placeholder='Enter Course Title'
          {...register("courseShortDesc",{required:true})}
          className='w-full form-style min-h-[130px] resize-x-none'></textarea>

        {
          errors.courseShortDesc &&(
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
              Course short descreption is required
            </span>
          )
        }
      </div>

       {/* course price */}
       <div className='flex flex-col space-y-2'>
        <label className='text-sm text-richblack-5' htmlFor='coursePrice'>Course Price <sup>*</sup></label>
        <div className='relative'>
            <input
              id='coursePrice'
              placeholder='Enter Course Title'
              {...register("coursePrice",{
                required:true,
                valueAsNumber:true,
                pattern:{
                  value: /^(0|[1-9]\d*)(\.\d+)?$/,
                },
                })}
              className='w-full form-style !pl-12'

            />
            <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {
          errors.coursePrice &&(
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
              Course Price is required
            </span>
          )
        }
      </div>

       {/* course category */}
       <div className='flex flex-col space-y-2'>
        <label className='text-sm text-richblack-5' htmlFor='courseCategory'>Course Category <sup>*</sup></label>
        <select className='form-style w-full'
        id='courseCategory'
        {...register("courseCategory",{required:true})}
        defaultValue={''}
        >
            <option value={''} className='form-style disabled'>Choose Category</option>
            {!loading &&
              courseCategory?.map((category,index)=>{
                return <option 
                 key={index} value={category?._id}>{category.name}</option>
              })
            }
        </select>
        {
          errors.courseCategory &&(
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
              Course Category is required
            </span>
          )
        }
      </div>

      {/* add a tag  */}

      <TagInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and Press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue ={setValue}
        errors ={errors}
        editData={editCourse ? (course?.thumbNail):null}
      />

       {/* Benefits of the course */}
       <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>
      {/* Requirements/Instructions */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />
      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Wihout Saving
          </button>
        )}
        <IconBtn
        type='submit'
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}




export default CourseInformationForm