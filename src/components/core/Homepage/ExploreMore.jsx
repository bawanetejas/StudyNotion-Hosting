import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import { useEffect } from 'react'
import Card from './Card';

const tab = [
    'Free',
    'New to coding',
    'Most popular',
    'Skills paths',
    'Career paths',
]


export default function ExploreMore() {

const [currentTab ,setcurrentTab] = useState(tab[0]);
const [courses ,setCourses] = useState(HomePageExplore[0].courses);
const [currentCard ,setcurrentCard] = useState(HomePageExplore[0].courses[0].heading);

function setNewTab(ele){
    setcurrentTab(ele);
    const result = HomePageExplore.filter((course) => course.tag === ele);
    setCourses(result[0].courses);
    setcurrentCard(result[0].courses[0].heading);
}

  return (
    <div className='w-full mx-auto mt-3'>
           <div className='flex flex-row gap-2 items-center md:gap-4 bg-richblack-700 p-1 rounded-full w-fit mx-auto'>
           {
            tab.map((ele,index)=>{

                return <div key={index}

                className={`${currentTab === ele ? 'text-white bg-richblack-900':'text-richblack-25 bg-transparent'}
                md:rounded-full rounded-lg py-2 px-2 md:px-6 hover:text-white hover:bg-richblack-900`}
                onClick={()=>{setNewTab(ele)}}
                >
                  {ele}
                </div>

            })
           }

           </div>
         {/* cards */}
           <div className='flex flex-row flex-wrap  justify-center w-full gap-[2rem] relative top-[4rem]'>

           {
              courses.map((ele,index)=>{
                return <Card
                    key={index}
                    setcurrentCard={setcurrentCard}
                    cardData ={ele}
                    currentCard={currentCard}
                />
              })
           }

           </div>
    </div>
  )
}
