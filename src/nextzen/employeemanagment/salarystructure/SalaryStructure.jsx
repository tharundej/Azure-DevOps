import React,{useState} from 'react';
import Box from '@mui/material/Box';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import SalaryStructureForm from './SalaryStructureForm';

export default function SalaryStructure() {
    const TABLE_HEAD = [
      { id: 'departmentName', label: 'Department Name', type: 'text',minWidth:'150px' },
      { id: 'designationName', label: 'Designation Name', type: 'text',minWidth:'150px' },
      { id: 'designationGradeName', label: 'Designation Grade Name', type: 'text',minWidth:'150px' },

      { id: 'marketRate', label: 'Market Rate', type: 'text',minWidth:'150px' },
      { id: 'minimum', label: 'Minimum', type: 'text',minWidth:'150px' },
      { id: 'midpoint', label: 'Midpoint', type: 'text',minWidth:'150px' },
      { id: 'maximum', label: 'Maximum', type: 'text' ,minWidth:'150px'},
      { id: 'spread', label: 'Spread', type: 'text',minWidth:'150px' },
      { id: 'range', label: 'Range', type: 'text' ,minWidth:'150px'},

    ];
    const actions = [
      { name: 'View', icon: 'hh', path: 'jjj' },
      { name: 'Edit', icon: 'hh', path: 'jjj' ,endpoint:'/'},
    ];

    const defaultPayload = 
    {
      "count": 5,
      "page": 0,
      "search": "",
      "companyId": "COMP1",
      "externalFilters": {
          "departmentName": "",
          "designationName": "",
          "designationGradeName": "",
          "marketRate": "",
          "minimum": "",
          "midpoint": "",
          "maximum": "",
          "spread": "",
          "ranges": ""
      },
      "sort": {
          "key": 1,
          "orderBy": ""
      }
  }
  const[cellData,setCellData]=useState("")
  const[openModal,setOpenModal]=useState(false)
  const[type,setType]=useState("create")

  const handleClose=()=>setOpenModal(false)
  const onClickActions=(rowData,event)=>{
    console.log(rowData,event,'aaaaabbb');
    if(event.name==="Edit"){
      setCellData(rowData);
      setType("edit");
      setOpenModal(true);


    }

  }
    
     
     
    // const tabLabels = ['Tab 1', 'Tab 2', 'Tab 3'];
    // const tabContents = [
    //   <div>Tab 1 Content</div>,
    //   <div>Tab 2 Content</div>,
    //   <div>Tab 3 Content</div>,
    // ];
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
      <>
        <SalaryStructureForm currentUserData={cellData} openModal={openModal}  type={type} handleClose={handleClose}/>
        <BasicTable
          headerData={TABLE_HEAD}
          endpoint="/getallSalaryStructure"
          defaultPayload={defaultPayload}
          rowActions={actions}
          filterName='SalaryStructureFilterSearch'
          onClickActions={onClickActions}
        />

        </>
      
    );
  }