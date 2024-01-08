import React, { useContext, useEffect, useState } from 'react'
import instance from 'src/api/BaseURL';
import UserContext from 'src/nextzen/context/user/UserConext';

const PunchINOutTable = (tableData) => {
  const{user}=useContext(UserContext)
  const [punchData , setpunchData]=useState([])
    console.log("🚀 ~ file: PunchINOutTable.jsx:8 ~ PunchINOutTable ~ punchData:", punchData)
    // const punchData = [
    //     { punchIn: ' 09:00:00', punchOut: ' 17:00:00' },
    //     { punchIn: ' 08:30:00', punchOut: ' 16:30:00' },
    //     { punchIn: ' 08:30:00', punchOut: ' 16:30:00' },
    //     { punchIn: ' 08:30:00', punchOut: ' 16:30:00' },
    //     { punchIn: ' 08:30:00', punchOut: ' 16:30:00' },
    //     { punchIn: ' 08:30:00', punchOut: ' 16:30:00' },
    //     { punchIn: ' 08:30:00', punchOut: ' 16:30:00' },
    //     { punchIn: ' 08:30:00', punchOut: ' 16:30:00' },
    //     { punchIn: ' 08:30:00', punchOut: ' 16:30:00' },
    //     { punchIn: ' 08:30:00', punchOut: ' 16:30:00' },
    //     // Add more data as needed
    //   ];
    useEffect(() => {
      console.log("🚀 ~ file: PunchINOutTable.jsx:25 ~ useEffect ~ getPunchDetails:")
      getPunchDetails()
    }, [tableData])
    
    const getPunchDetails= async()=>{
      var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      console.log(timeZone);
      try{
     const data = {
      companyId:(user?.companyID)? user?.companyID : '',
      employeeId:(user?.employeeID)? user?.employeeID : '',
      timeZone:timeZone,
      locationId:(user?.locationID)? user?.locationID : '',
    }
    const response = await instance.post("/getAllPunchesParticular",data)
    const data1 = response?.data?.data || []; // Access expenseName from the API response
    // setExpenseConfigurations(data);
    setpunchData(data1)
   
    if (response.data.code == 200){
    }
      console.log("🚀 ~ file: PunchINOutTable.jsx:40 ~ getPunchDetails ~ response.data?.data:", response.data?.data)
      }catch(error){
        console.error("Error",error)
        throw error 
      }
    }
      return (
<div
 style={{ 
  // overflowX: 'auto',
   maxWidth: '100%' }}>
  <div
    style={{
      // overflowX: 'auto',
      border: '1px solid black',
      position: 'relative',
    }}
  >
    <table
      style={{
        borderCollapse: 'collapse',
        width: '100%',
        tableLayout: 'fixed',
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              textAlign: 'center',
              padding: '8px',
              borderBottom: '1px solid black',
              borderRight: '1px solid black',
              position: 'sticky',
              top: 0,
              zIndex: 1,
              color: 'black',
            }}
          >
            Punch In
          </th>
          <th
            style={{
              textAlign: 'center',
              padding: '8px',
              borderBottom: '1px solid black',
              position: 'sticky',
              top: 0,
              zIndex: 1,
              color: 'black',
              borderRight: '1px solid black', // Apply the borderRight style here
            }}
          >
            Punch Out
          </th>
        </tr>
      </thead>
    </table>
   <div
      style={{
        // overflowY: 'auto',
        // maxHeight: '200px',
        height:'200px',
        // WebkitOverflowScrolling: 'touch',
        // scrollbarWidth: 'thin',
        // scrollbarColor: 'darkgray lightgray',
        background: 'transparent',
        // Hide the scrollbar UI
        // scrollbarWidth: 'none',
        // msOverflowStyle: 'none',
        // '&::-webkit-scrollbar': {
        //   width: '0.4em',
        // },
        // '&::-webkit-scrollbar-thumb': {
        //   backgroundColor: 'transparent',
        // },
      }}
    >
      <table
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          tableLayout: 'fixed',
        }}
      >
        <tbody>
          {punchData?.records?.map((item, index) => (
            <tr key={index}>
              <td style={{ textAlign: 'center', padding: '3px', borderRight: '1px solid black', color: 'black', fontSize: '12px' }}>
                {/* {new Date(item.punchIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} */}
                {item.punchIn}
                </td>
              <td style={{ textAlign: 'center', padding: '3px', fontSize: '12px', color: 'black', borderRight: '1px solid black' }}>
                {/* {new Date(item.punchOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} */}
                {item.punchOut}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

      
      
  )
}

export default PunchINOutTable