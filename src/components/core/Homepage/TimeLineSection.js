import React from 'react'
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineimage from '../../../assets/Images/TimelineImage.png'
const data =[
    {
        logo:logo1,
        heading:'Leadership',
        description:'Fully committed to the success company'
    },
    
    {
        title:"dottedline"
    },

    {
        logo:logo2,
        heading:'Leadership',
        description:'Fully committed to the success company'
    },

    {
        title:"dottedline"
    },

    {
        logo:logo3,
        heading:'Leadership',
        description:'Fully committed to the success company'
    },

    {
        title:"dottedline"
    },

    {
        logo:logo4,
        heading:'Leadership',
        description:'Fully committed to the success company'
    },
];
function TimeLineSection() {

  return (
    <div className='max-w-maxContent w-11/12 mx-auto gap-y-4 flex flex-col md:flex-row pb-12 overflow-hidden'>
        <div className='flex flex-col gap-5 md:w-[45%] ml-6  justify-center'>

        {
            data.map((element ,index) =>{
                return (
                    <div key={index}>
                    {
                        element.title ==="dottedline"?(
                            <div className='w-[32px] border-dashed border-richblack-100 border-[1px] rotate-90 ml-2'>

                            </div>):
                        (
                            <div  className='flex flex-row  gap-4 items-center'>

                                    <div className='flex items-center justify-center w-[50px] h-[50px] bg-white rounded-full'>
                                        <img src={element.logo} alt={"logo"}/>
                                    </div>
                                    <div className='flex flex-col '>
                                        <p className='font-medium text-richblack-800'>{element.heading}</p>
                                        <p className='font-normal text-richblack-400'>{element.description}</p>
                                    </div>
                                    
                    </div>
                        )
                    }
                    </div>
                )
            })
        }

        </div>
        <div className='timeline-bg md:w-[45%] relative z-10'>
          
          <img src={timelineimage} alt="timelineimage"  className='w-fit object-cover'/>

          <div className='flex flex-row w-[300px] md:w-[70%] items-center gap-[20px] p-4 md:p-[32px]  absolute bg-[#014A32] left-[50%] -translate-y-[50%] -translate-x-[50%]'>
            <div className='flex flex-row items-center gap-2 md:gap-[24px] '>
                <div className=' text-3xl md:text-[36px] text-white font-[700]'>
                    10
                </div>
                <div className='text-[14px] text-#05A77B font-medium uppercase'>
                    years experiece
                </div>
            </div>
            <div className='w-[44px] h-[1px] -rotate-90 bg-[#037957]'></div>
            <div className='flex flex-row items-center gap-4 md:gap-[24px]'>
                <div className='text-3xl md:text-[36px] text-white font-[700]'>
                    250
                </div>
                <div className='text-[14px] text-#05A77B font-medium uppercase'>
                TYPES OF COURSES
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default TimeLineSection