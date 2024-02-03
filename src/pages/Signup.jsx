
import React from 'react'
import signupimg from '../assets/Images/signup.webp'
import Template from '../components/core/auth/Template'
function Signup() {
  return (
   <Template
    title='Join the millions learning to code with StudyNotion for free'
    description1 = "Build skills for today, tomorrow, and beyond."
    description2="Education to future-proof your career."
    formType = 'signup'
    image ={signupimg}
   />
  )
}

export default Signup