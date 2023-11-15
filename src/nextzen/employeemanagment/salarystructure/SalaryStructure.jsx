import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import SalaryStructureForm from './SalaryStructureForm';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import axios from 'axios';
import {ApiHitDepartment,ApiHitDesgniation,ApiHitLocations,ApiHitManager,ApiHitRoles,ApiHitDesgniationGrade, ApiHitDepartmentWithoutLocation} from 'src/nextzen/global/roledropdowns/RoleDropDown';
import SalaryStructureEdit from './SalaryStructureEdit';

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

  const [options,setOptions]=useState({});
  const [optionsValue,setOptionsValue]=useState({})

  const handleClose=()=>{setOpenModal(false);setOpenModalEdit(false)}
  const [editRowIds,setEditRowIds]=useState("")
  const [openModalEdit,setOpenModalEdit]=useState("")

  const funcDropDownValue=(arr,field,id)=>{
    var retValueArray={}
    console.log(arr,field,id,"designationID")
    for(var i=0;arr?.length;i++){
      if(arr[i][field]===id){
        return arr[i];
      }
    }
    return {};
  }


  useEffect(() => {
    if(editRowIds){
    const fetchLocations = async () => {
      
      const desgObj={
        companyID:'COMP1',
        departmentID:editRowIds?.departmentID
      }
      const desgGradeObj={
        companyID:'COMP1',
        designationID:editRowIds?.designationID
      }
      try {
        const department = await ApiHitDepartmentWithoutLocation();
      
        const desgination=await ApiHitDesgniation(desgObj)
        const desginationGrade=await ApiHitDesgniationGrade(desgGradeObj)
        

        const arr={
          
          departmentOptions:department,
          desginationOptions:desgination,
          desginationGradeOptions:desginationGrade,
         


        }
        setOptions(arr);

       
        const departmentValue=funcDropDownValue(department,'departmentID',editRowIds?.departmentID)
        const desginationValue=funcDropDownValue(desgination,'designationID',editRowIds?.designationID)
        const desginationGradeValue=funcDropDownValue(desginationGrade,'designationGradeID',editRowIds?.designationGradeID)
       

        const arrValue={
          
          departmentValue:departmentValue,
          desginationValue:desginationValue,
          desginationGradeValue:desginationGradeValue,
          

        }


        setOptionsValue(arrValue);
        console.log(arrValue, 'locationsdepartmentarr');

        setOpenModalEdit(true)
       
       
        
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
  
    fetchLocations();
  }
  }, [editRowIds]);

  const ApiHit=(id)=>{
    let data = JSON.stringify({
      "salaryStructureID": id
    });
     
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/getSingleSalaryStructure`,
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };
     
    axios.request(config)
    .then((response) => {
      console.log(response.data.data,'response.data.data');
      setEditRowIds(response.data.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }
  const onClickActions=(rowData,event)=>{
    console.log(rowData,event,'aaaaabbb');
    if(event.name==="Edit"){
      // setCellData(rowData);
      // setType("edit");
     
      

      ApiHit(rowData.salaryStructureID)

      // setOpenModalEdit(true);



    }

  }
    
     
     
    // const tabLabels = ['Tab 1', 'Tab 2', 'Tab 3'];
    // const tabContents = [
    //   <div>Tab 1 Content</div>,
    //   <div>Tab 2 Content</div>,
    //   <div>Tab 3 Content</div>,
    // ];
    const [isLargeDevice, setIsLargeDevice] = React.useState(window.innerWidth > 530);
    const handleOpenModal=()=>setOpenModal(true);
  
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
      <SalaryStructureEdit editRowIds={editRowIds} openModalEdit={openModalEdit}handleClose={handleClose}  optionsEdit={options} optionsValueEdit={optionsValue}/>
        <SalaryStructureForm currentUserData={cellData} openModal={openModal}  type={type} handleClose={handleClose}/>
        <BasicTable
          headerData={TABLE_HEAD}
          endpoint="/getallSalaryStructure"
          defaultPayload={defaultPayload}
          rowActions={actions}
          filterName='SalaryStructureFilterSearch'
          onClickActions={onClickActions}
          handleOpenModal={handleOpenModal}
        />

        </>
      
    );
  }