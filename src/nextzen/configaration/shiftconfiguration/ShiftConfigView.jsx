

import * as React from 'react';
import Box from '@mui/material/Box';
import { BasicTable } from '../../Table/BasicTable';

export default function ShiftConfigView() {
    const TABLE_HEAD = [
      { id: 'shiftName', label: 'Shift Name', type: 'text' , minWidth:180  },
      { id: 'startTime', label: 'Start Time', type: 'text' , minWidth:180},
      { id: 'endTime', label: 'End Time', type: 'text' , minWidth:180},
      { id: 'shiftTerm', label: 'Shift Term', type: 'text', minWidth:180 },
      { id: 'locationName', label: 'Location Name', type: 'text' , minWidth:180},
    ];

    const onClickActions=(rowdata,event)=>{
      if(event?.name==="Edit"){
        handleEditAPICALL(rowdata,event)
      }
      else if(event?.name==="Delete"){
        handleDeleteAPICALL(rowdata,event)
      }
    }

    const handleDeleteAPICALL = async (rowdata,event)=>{
      console.log("iam here ")
      try{
        console.log(rowdata,"rowData:::::")
      const  data= {
        project_id: JSON.stringify( rowdata.project_id),
         
        };
        const response = await instance.post('deleteproject',data);
        // setReportingManagerData(response.data.list)
        console.log("🚀 ~ file: AddTimeProject.jsx:119 ~ getEmployeReport ~ response.data:", response.data)
      }catch(error){
    console.error("Error", error);
    throw error;
      }
    }

    const actions = [
      { name: 'View', icon: 'hh', path: 'jjj' },
      { name: 'Edit', icon: 'hh', path: 'jjj' ,endpoint:'/'},
    ];

    const defaultPayload = 
    {
      "companyId":"COMP2",
      "locationId":32,
      "count":5,
      "search":"",
      "page": 0,
      "limit": 5,
      "externalFilters": {
          "shiftTerm": "",
          "shiftName": "",
          "startTime": "",
          "endTime":""
      },
      "sort": {
          "key": 0,
          "orderBy": ""
      }
      
  };
     
    const [isLargeDevice, setIsLargeDevice] = React.useState(window.innerWidth > 530);
  
    React.useEffect(() => {
      const handleResize = () => {
        setIsLargeDevice(window.innerWidth > 530);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    return (
      
        <BasicTable
          headerData={TABLE_HEAD}
          endpoint="/getALLShiftConfig"
          defaultPayload={defaultPayload}
          rowActions={actions}
          onClickActions={onClickActions}
          filterName='ShiftConfigurationFilterSearch'
        />
      
    );
  }