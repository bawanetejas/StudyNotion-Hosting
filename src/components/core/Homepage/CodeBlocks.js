import React from 'react'
import CTAButton from './CTAButton'
import { TypeAnimation } from 'react-type-animation'

function CodeBlocks( {position ,title,subheading,ctabtn1,ctabtn2,codeblocks,bgshape}) {
  return (
    
        <div className={`flex md:flex-row flex-col ${position} justify-center items-center md:justify-between my-20  gap-[4rem]`}>
        {/* heading sec */}
        <div className='lg:w-[500px] w-full md:w-[50%] flex flex-col gap-2 '>

        <div >
            {title}
        </div>
        <div className='text-richblack-300 font-medium'>
            {subheading}
        </div>

       <div className='flex flex-row gap-8 mt-12'>
                <CTAButton
                    linkto={ctabtn1.linkto}
                    yellowflag={ctabtn1.yellowflag}
                   
                >
                   {ctabtn1.text}
               </CTAButton>

                <CTAButton
                    linkto={ctabtn2.linkto}
                    yellowflag={ctabtn2.yellowflag}
                    
                >
                {ctabtn2.text}
               </CTAButton>
       </div>


        </div>
        {/* code blocks */}
        <div className={`flex flex-row w-[100%] lg:w-[500px] md:ml-12 p-4 h-fit  relative z-50 
        ${bgshape ? 'bgShape1' : 'bgShape2'}
         Gradients`}>
            <div className='w-[10%]' >
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
                <div>11</div>
            </div>
         <div className='w-[90%]'>
            <TypeAnimation
                sequence={[codeblocks,2000,'']}
                repeat={Infinity}
                omitDeletionAnimation={true}
                cursor={true}
                style={
                   {
                     width:'100%',
                     whiteSpace: "pre-line",
                     display:"block"
                    }
                }
            />
         </div>
        </div>
    </div>
    
  )
}

export default CodeBlocks