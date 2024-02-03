import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {MdClose} from 'react-icons/md'

function TagInput({label,name,placeholder,register,errors,setValue,getValue}) {

    const {editCourse,course} = useSelector((state)=>state.course)
    const [tags ,setTags] = useState([]);

    useEffect(()=>{
        if(editCourse){
            setTags(course?.tag)
        }
        register(name ,{required:true , validate : (value)=>value.length > 0})
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    //
    useEffect(()=>{
        setValue(name,tags)
         // eslint-disable-next-line react-hooks/exhaustive-deps
         console.log(tags)
    },[tags])


    // function to handle user input when tags are add
    const handleKeyDown = (event)=>{
        // check user press "Enter" or ","

        if(event.key === "Enter" || event.key === ","){
            // prevent the default behavior of the element

            event.preventDefault();

            //get the input value and remove any leading/trailing spaces

            const tagValue = event.target.value.trim();

            // check if the input value exist in the array or not

            if(tagValue && !tags.includes(tagValue)){
                // add the tag
                const newTags = [...tags,tagValue]
                setTags(newTags)
            }
            event.target.value=""
        }
    }


    // function to delete the ta
    const handleDeletTag =(tagIndex)=>{
        //remove element from the array
        const newTags = tags.filter((tag,index)=>index !==tagIndex )
        setTags(newTags);
    }

  return (
    <div>
      {/* add label */}
      <label className="text-sm text-richblack-5" htmlFor={name}>
      {label} <sup className='text-pink-200'>*</sup></label>

      {/* rendering tag which is added */}

      <div className='flex flex-wrap gap-x-1 w-full items-center mb-2'>
      { tags.length >0 &&
        tags.map((tag,index)=>{
            return <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
            >
                {tag}

                {/* adding button to remove it */}
                <button
                type='button'
                className='ml-2 focus:outline-none'
                 onClick={()=>handleDeletTag(index)}>
                    <MdClose className='text-sm'/>
                </button>
            </div>

        })
      }
      </div> 

      <input
        id={name}
        name={name}
        type='text'
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        className='form-style w-full'
      />
      {
        errors[name] && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>{label} is required</span>
        )
      }

    </div>
  )
}

export default TagInput