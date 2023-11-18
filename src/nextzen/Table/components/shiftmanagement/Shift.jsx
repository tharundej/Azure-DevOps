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
        "Shift roaster" , "Assign shift" , "My Shift Details" , "Shift Swap", "Swap Request"
    ]
    const tabContents=[
        <div><ShiftRoast/> </div>,
        <div><AssignShiftComponent/> </div>,
        <div><MyShiftDetails/> </div>,
        <div><ShiftSwap/></div>,
        <div><Swaprequest/></div>,
        

    ]
  return (
    <>
    <ReusableTabs tabContents={tabContents} tabLabels={tabLabels}/>
    </>
  )
}

export default Shift