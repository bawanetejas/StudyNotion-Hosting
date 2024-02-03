import React, { useRef, useState } from 'react'
import IconBtn from '../../../commen/IconBtn'
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';

import { updateDisplayPicture } from '../../../../servicess/operations/Settingsapi';
function ChangeProfileImage() {
  const [loading ,setLoading] = useState(false);
  const [imageFile , setImageFile]= useState(null)
  const [previewSource ,setPreviewSource]= useState(null)
  const {user} = useSelector((state)=>state.profile)
  const fileRef = useRef(null)
  const dispatch = useDispatch()
  const {token} = useSelector((state) => state.auth)

  function clickHandler (){
    fileRef.current.click();
  }

  function changeHandler(e){
    const file = e.target.files[0];
    if(file){
      previewHandler(file);
      setImageFile(file);
    }
  }

  function previewHandler(file){
     const fileReader = new FileReader();
     fileReader.readAsDataURL(file);
     fileReader.onloadend = () =>{
          setPreviewSource(fileReader.result);
     }
  }

  function imageUpload (){
    setLoading(true);
    try{
      const formData = new FormData();
      formData.append("displayPicture",imageFile);
      dispatch(updateDisplayPicture(token,formData))
    }catch(error){
      console.log("error while uploading the file");
    }
    setLoading(false)
  }

  return (
    <div className='md:px-[50px] px-4 py-[24px] bg-richblack-800 border-[1px] rounded-md border-richblack-700'>
        <div className='flex flex-row items-center gap-x-4'>
          <div>
          <img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className='aspect-square w-[80px] rounded-full object-fill'
          />
          </div>
          <div className='flex flex-col gap-y-6'>
            <p className='text-xl font-semibold text-richblack-5'>Change Profile Picture</p>
            <div className='flex flex-row gap-x-5 items-center '>
              <input
                type='file'
                ref={fileRef}
                onChange={changeHandler}
                className='hidden'
                
              />
              <button
              onClick={clickHandler}
              disabled={loading}
              className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
              >
                Select
              </button>
              <IconBtn
              text={loading ?"Uploading..." :"Upload"}
              onclick={imageUpload}
              >
              {
                !loading && <FiUpload className='text-lg text-richblack-800'/>
              }
              </IconBtn>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ChangeProfileImage