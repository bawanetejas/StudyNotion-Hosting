
import React from 'react'
import {FaUserFriends} from "react-icons/fa"
import {ImTree}  from "react-icons/im"

function Card({cardData,setcurrentCard,currentCard}) {
  return (
    <div className={`w-[350px] h-[300px]  px-[24px] pt-[32px] ${currentCard === cardData.heading ? 'bg-white shadow-[12px_12px_0px_0px] shadow-[yellow]':'bg-richblack-800'} flex flex-col justify-between`}
    onClick={()=>setcurrentCard(cardData.heading)}
    >
        <div className='flex flex-col gap-3'>
        <div className={`${currentCard === cardData.heading?"text-[20px] font-semibold text-richblue-800":"text-[20px] font-semibold text-richblue-25"} `}>
            {cardData.heading}
        </div>
        <div className={`${currentCard === cardData.heading ?'text-richblack-400':'text-richblack-500'} 
                        font-normal text-[16px] `}>
            {cardData.description}
        </div>
        </div>
        <div className={`flex flex-row justify-between  text-black py-4  border-t-[2px] border-dashed border-[richblack-400]
                       ${currentCard === cardData.heading ? 'text-blue-500':'text-richblack-300'}`}>
            <div className={`flex flex-row gap-2 items-center `} >
             <FaUserFriends/>
             <p>Begginer</p>
            </div>
            <div className={`flex flex-row gap-2 items-center
                            ${currentCard === cardData.heading ? 'text-blue-500':'text-richblack-300'}`} >
            <ImTree />
            <p>{cardData.lessionNumber} Lessons</p>
            </div>
        </div>
    </div>
  )
}

export default Card