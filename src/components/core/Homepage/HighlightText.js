
import React from 'react'

function HighlightText({text}) {
  return (
    // background: linear-gradient(118.19deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%),
// linear-gradient(0deg, #F1F2FF, #F1F2FF);

    <span className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]
    text-transparent bg-clip-text'> 
        {" "}
        {text}
    </span>
  )
}

export default HighlightText