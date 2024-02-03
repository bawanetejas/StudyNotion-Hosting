import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../components/core/DashboardCompo/Sidebar'
import { Outlet } from 'react-router-dom'

function Dashboard() {

  const {loading:profileLoading} = useSelector((state)=> state.profile)
  const {loading:authLoading} = useSelector ((state)=> state.auth)
  if(profileLoading || authLoading){
    return (
      <div className='place-items-center mx-auto'>
        <div>Loading...</div>
      </div>
    )
  }
  return (
    <div className='relative z-[900] flex flex-col md:flex-row min-h-[calc(100vh-3.5rem)]'>
      <Sidebar/>
      <div className='min-h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
      <div className='mx-auto w-11/12 max-w-[1000px] py-10 relative z-[1000] min-h-[calc(100vh-3.5rem)]'>
        <Outlet/>
      </div>
      </div>
    </div>
  )
}

export default Dashboard