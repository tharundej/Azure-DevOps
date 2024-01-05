import React from 'react'
import ReusableTabs from 'src/nextzen/tabs/ReusableTabs'
import AssignShiftComponent from './AssignShiftComponent'
import MyShiftDetails from './MyShiftDetails'
import ShiftRoast from './ShiftRoast'
import ShiftSwap from './ShiftSwap'
import Swaprequest from './SwapRequest'

const Shift = () => {
    const funtion =()=>{

    }
  const  tabLabels=[
        "Shift Roaster" ,  "My Shift Details" , "Manager Swap", " Requested Swap"
    ]
    const tabContents=[
        <div><ShiftRoast/> </div>,
        // <div><AssignShiftComponent/> </div>,
        <div><MyShiftDetails/> </div>,
        <div><ShiftSwap/></div>,
        <div><Swaprequest/></div>,
        

    ]
  return (
    <>
    <ReusableTabs tabContents={tabContents} tabLabels={tabLabels} tabsSx={{ borderBottom:"3px solid #3b82f6 !important" }}/>
    
    </>
  )
}

export default Shift