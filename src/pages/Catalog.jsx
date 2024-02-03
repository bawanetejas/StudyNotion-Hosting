import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getCatalogPageData } from '../servicess/operations/CatalogPageDatail';
import { apiConnector } from '../servicess/apiConnector';
import { categories } from '../servicess/apis';
import Error from './Error'
import CourseSlider from '../components/core/Catalog/CourseSlider';

import CourseCard from '../components/core/Catalog/CourseCard';
export const Catalog = () => {
    const dispatch = useDispatch();
    const {categoryName} = useParams();
    const {loading} = useSelector((state)=> state.profile)
    const [categoryID , setCategoryID] = useState();
    const [active ,setActive] = useState(1);
    const [catalogPageData , setCatalogPageData] = useState(null)
    useEffect(()=>{
       const getRes=async()=>{
        const res = await apiConnector("GET",categories.CATEGORIES_API);
        // console.log("all categories--->",res.data.allCategory)
        let categoryId = res?.data?.allCategory?.filter((categoryData) => categoryData.name.split(" ").join("-").toLowerCase() === categoryName)[0]._id
        setCategoryID(categoryId)
       }
       getRes()
    },[categoryName])

    useEffect(()=>{
      const getCategoryDetail = async()=>{
        const response = await getCatalogPageData(categoryID)
        console.log("response of getCatalogPage Data --->",response)
        setCatalogPageData(response);
      }
      if(categoryID){
        getCategoryDetail()
      }
    },[categoryID])

    if(loading || !catalogPageData){
      return (
        <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
          <div className='loader'></div>
        </div>
      )
    }

    // if(!loading || !catalogPageData){
    //   return <Error/>
    // }
  return (
    <>
    {/* hero section */}
       <div className='bg-richblack-800 px-[120px] py-[32px] flex flex-col gap-6'>
           <p className='font-[400] text-[14px] text-richblack-300'> 
           Home / Catalog / <span className='text-yellow-300'>{catalogPageData.selectedCategory.name}</span>
           </p>

           <p className='font-medium uppercase text-[30px] text-richblack-5'>{catalogPageData.selectedCategory.name}</p>
   
           <p className='font-normal text-richblack-200 text-[14px]'>{catalogPageData.selectedCategory.description}</p>

       </div>

       {/* section 1 */}

       <div className='mx-auto w-full max-w-maxContentTab py-12 px-4 lg:max-w-maxContent'>
           <p className='text-[30px] text-richblack-5 font-medium'>Courses to get you started</p>

           <div className='flex gap-4 border-b-[1px] border-b-richblack-700'>

            <button
            onClick={()=> setActive(1)}
            className={`px-[12px] py-[8px]  text-[16px]
             ${active === 1 ? 'text-yellow-300 border-b-[yellow-300] border-b-[1px]':'text-richblack-200 '}
            `}
            >
              Most Popular
            </button>

            <button
             onClick={()=> setActive(2)}
            className={`px-[12px] py-[8px]  text-[16px]
             ${active === 2 ? 'text-yellow-400 border-b-[yellow-300] border-b-[1px]':'text-richblack-200'}
            `}
            >
              New
            </button>
           </div>

           <div className='mt-[40px]'>
              <CourseSlider courses={catalogPageData.selectedCategory.course} />
           </div>
       </div>

      {/* section 2 */}
       <div className='mx-auto w-full max-w-maxContentTab py-12 px-4 lg:max-w-maxContent'>
         <p className='text-semibold text-[30px] text-richblack-5 pb-5'>
         Top courses in {catalogPageData.differentCategory.name}</p>
        
        <div>
          <CourseSlider courses={catalogPageData.differentCategory.course}/>
        </div>
       </div>

       <div className='mx-auto w-full max-w-maxContentTab py-12 px-4 lg:max-w-maxContent'>
         <p className='text-semibold text-[30px] text-richblack-5 pb-5'> Frequently Bought</p>

         <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
         {
          catalogPageData.bestSellingCourses.map((Course)=>{
            return <CourseCard course={Course} key={Course._id} height={'h-[300px]'}/>}
          )
         }
         </div>
       </div>

    </>
  )
}
