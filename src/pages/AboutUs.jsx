import React from 'react'
import HighlightText from '../components/core/Homepage/HighlightText'
import aboutus1 from '../assets/Images/aboutus1.webp'
import aboutus2 from '../assets/Images/aboutus2.webp'
import aboutus3 from '../assets/Images/aboutus3.webp'
import FoundingStory from '../assets/Images/FoundingStory.png'
import LearningGrid from '../components/core/About/LearningGrid'
import Contactus from '../components/core/About/Contactus'
import Footer from '../components/commen/Footer'
import ReviewModal from '../components/commen/ReviewModal'
function AboutUs() {

    const data =[
        {
            number:'5k',
            description:"Active Students"
        },
        {
            number:'10+',
            description:"Mentors"
        },
        {
            number:'200+',
            description:"Courses"
        },
        {
            number:'50+',
            description:"Awards"
        }
    ]
  return (
    <div>
       {/* section 1 */}
       <section className='bg-richblack-800 flex flex-col items-center gap-3 pt-[80px] lg:px-[120px] relative'>
        <p className='text-center text-richblack-600 font-medium'>About Us</p>
        <div className='flex flex-col justify-center  gap-2 px-[16px] w-11/12 max-w-[900px]'>
            <p className='text-center text-[36px] text-richblack-5 leading-[44px] -tracking-[2%]'>Driving Innovation in Online Education for a
            <HighlightText  text={'Brighter Future'}/>
            </p>
            <p className='text-center font-medium leading-[24px] text-richblack-300'>Studynotion is at the forefront of driving innovation in online education.
             We're passionate about creating a brighter future by offering cutting-edge 
             courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
        </div>
        <div className='flex flex-col lg:flex-row gap-4 relative z-40 top-[56px] lg-px-4'>
             <img src={aboutus1}
             className='max-w-[400px]' alt='aboutus1'/>
             <img src={aboutus2} 
             className='max-w-[400px]' alt='aboutus2'/>
             {/* <div className='aboutus'><img src={aboutus2} alt='aboutus2'/></div> */}
             <img src={aboutus3} 
             className='max-w-[400px]' alt='aboutus3'/>
        </div>
       </section>

       {/* section 2 */}
       <section className='lg:px-[120px] lg:py-[90px] flex flex-col justify-center items-center  w-11/12 max-w-maxContent mt-3 mx-auto '>
        <div className='text-center border-b-[1px] pt-14 lg:pt-0 pb-[45px] border-[richback-700] max-w-maxContent text-richblack-100 w-11/12 text-xl  font-semibold md:text-4xl  -tracking-[2%]'>
        We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text={'combines technology'}/>,
         <span className='bg-gradient-to-b from-[#ff5125] to-[#f09819]
    text-transparent bg-clip-text'>expertise</span>, and community to create an <span className='bg-gradient-to-b from-[#e65c00] to-[#f9d423]
    text-transparent bg-clip-text '>unparalleled educational experience.</span>
        </div>

        <div className='flex lg:flex-row flex-col w-full justify-center items-center gap-x-3 gap-y-3 mt-[45px] '>
            <div className='md:max-w-[480px] '>
                <h1 className='bg-gradient-to-b from-[#833ab4] via-[#fd1d1d] to-[#fcb045]
    text-transparent bg-clip-text font-medium text-[36px] leading-[44px] pb-8'>Our Founding Story</h1>
                <div className='flex flex-col gap-2'>
                    <p className='font-medium text-[16px] leading-6 text-richblack-300'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists,
                     and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                    <p className='font-medium text-[16px] leading-6 text-richblack-300'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that
                     education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                </div>
            </div>
            <div className='foundingstory relative z-40 max-w-[500px] md:p-[32px]'><img src={FoundingStory} alt='founding story'/></div>
        </div>

        <div className='flex flex-col lg:flex-row lg:justify-between items-start gap-11  mt-[45px] mx-auto pb-4'>
            <div className='flex flex-col gap-3 max-w-[500px]'>
                <p className='bg-gradient-to-b from-[#e65c00] to-[#f9d423] text-transparent bg-clip-text text-[36px]'>Our Vision</p>
                <p className='font-medium text-[16px] leading-6 text-richblack-300'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize
                 the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform 
                 that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
            </div>
            <div className='flex flex-col gap-3 max-w-[500px]'>
                <p className='text-[36px]'><HighlightText text={'Our Mission'}/></p>
                <p className='font-medium text-[16px] leading-6 text-richblack-300'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners,
                 where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an
                  environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
            </div>
        </div>
       </section>

       {/* Number section */}
       <section className='  bg-richblack-700'>
        {
            <div className='w-11/12 md:px-[120px] md:py-[80px] mx-auto max-w-maxContent flex flex-col gap-4 py-6  md:flex-row justify-between '>
                {
                    data.map((data,index)=>{
                return (
                    <div key={index} className='flex flex-col gap-2 items-center'>
                        <p className='text-richblack-5 text-[30px] font-semibold'>{data.number}</p>
                        <p className='text-richblack-500 font-medium'>{data.description}</p>
                    </div>
                )
            })
                }
            </div>
        }
       </section>

       <section className='mt-[100px]'>
        <LearningGrid/>
        <Contactus/>
       </section>
       <div className='w-11/12 mx-auto max-w-maxContent'>
       <ReviewModal/>
       </div>
       <Footer/>
    </div>
  )
}

export default AboutUs