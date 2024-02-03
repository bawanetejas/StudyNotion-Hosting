import React, { useState } from 'react'
import { Chart as ChartJS,registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(...registerables);
function Chart({courseData}) {

    const [chartFlag,setChartFlag] = useState("Student")
    const getRandomColor = (numOfColor)=>{
        const color =[]

        for(let i=0;i<numOfColor;i++){
             const newColor = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`

             color.push(newColor)
        }
       
        return color
    }

    const studentData ={
        labels : courseData?.map((course)=>course.courseName),
        datasets:[
            {
                data:courseData?.map((course)=>course.totalEnrolledStudent),
                backgroundColor : getRandomColor(courseData?.length)
            }

        ]

    }

    const amountData ={
        labels : courseData?.map((course)=>course.courseName),
        datasets:[
            {
                data:courseData?.map((course)=>course.totalAmount),
                backgroundColor : getRandomColor(courseData?.length)
            }

        ]

    }
    const options = {

    };


      

  return (
    <div className='flex flex-col gap-2 w-full md:w-[60%] p-4 bg-richblack-800 rounded-md mt-3'>
    <p className='text-xl font-bold text-richblack-5'>Visualize</p>
    <div className='flex gap-3 items-center'>
        <button
        className={`${chartFlag === "Student" ? "bg-richblack-700 px-4 py-2 rounded-md":""} text-yellow-200`}
        onClick={()=>setChartFlag("Student")}
        >
            Student
        </button>

        <button
        className={`${chartFlag !== "Student" ? "bg-richblack-700 px-4 py-2 rounded-md":""} text-yellow-200`}
        onClick={()=>setChartFlag("Income")}
        >
            Income
        </button>

    </div>
    <div className='lg:w-[70%]  flex items-center mx-auto'>
    <Pie 
  
  data={
      chartFlag === "Student" ? studentData : amountData
  }
  options={options}

/>
    </div>
    </div>
  )
}

export default Chart