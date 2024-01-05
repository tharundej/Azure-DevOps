import React,{useContext, useEffect, useState} from 'react'

import ReusableTabs from 'src/nextzen/tabs/ReusableTabs';

import { BasicTable } from 'src/nextzen/Table/BasicTable';
import EmployeeTable from '../employeestable/Employeestable';
import { StatouryTable } from '../statoury/StatouryTable';
import SalaryStructure from '../salarystructure/SalaryStructure';
import RoleAndResponsiblity from '../roleandresponsiblity/RoleAndResponsiblity';
import PreOnboardTable from '../preonboard/preonboardtable/PreOnboardTable';

import UserContext from 'src/nextzen/context/user/UserConext';
import { forEach } from 'lodash';
import Applicants from '../applicants/Applicants';


function EmployeeManagementHome  () {
  const {user}=useContext(UserContext)
  console.log(user,'from contest')
  const [tabLabels,setTabLabels]=useState([])
  const [tabContents,setTabContents]=useState([])
   // const tabLabels = ['EmployeeTable', 'Statoury','Salary Structure',"Roles"];
    const dataObj=[
      {
        id:'employees',
        label:'Employees',
        content: <EmployeeTable/>
      },
      {
        id:'statutory',
        label:'Statutory',
        content: <StatouryTable/>
      },
      {
        id:'salaryStructure',
        label:'Salary Structure',
        content: <SalaryStructure/>
      },
      {
        id:'applicants',
        label:'Applicants',
        content:<Applicants/>
      },
      {
        id:'preonboard',
        label:'Pre Onboard',
        content:<PreOnboardTable/>
      }


    ]

    useEffect(()=>{
      var arr = [];
      var arr1=[]

      dataObj?.forEach((item) => {
        const permission = user?.rolePermissions.employeeManagement;
        //console.log( typeof permission?.mainHeading,  permission?.mainHeading)
      if (permission && permission.hasOwnProperty('mainHeading') && permission.mainHeading && permission[item.id]) {
        console.log(`User Permission for ${item?.key}:`, permission);
        console.log(`mainHeading for ${item?.key}:`, permission.mainHeading);

        arr.push(item.label);
        arr1.push(item.content)
      }
      });
      arr.push("Permissions")
      arr1.push(<RoleAndResponsiblity/>)
      arr.push('Applicants')
      arr1.push(<Applicants/>)
      arr.push('Pre Onboard')
      arr1.push(<PreOnboardTable/>)
      console.log(arr,'arrrr')
      
      setTabLabels(arr);
      setTabContents(arr1)
      
    },[user])

    
  const tabContents1 = [
    <div>

     <EmployeeTable/>
    </div>,
    <div>
     <StatouryTable/>
    </div>,
    <div>
      <SalaryStructure/>
    </div>,
    <div>
      <RoleAndResponsiblity/>
    </div>
  ];
  const [TABLE_HEAD,setTableHead] =React.useState( [
    {
      id: 'employee_id',
      label: ' Employee id',
      type: 'text',
      containesAvatar: true,

      secondaryText: 'name',
    },
    { id: 'first_name', label: 'First Name', width: 250, type: 'text' },
    { id: 'last_name', label: 'Last name', width: 220, type: 'text' },
    { id: 'contact_number', label: 'Contact Number', width: 300, type: 'text' },
    { id: 'employment_type', label: 'Employment Type', width: 100 ,  type: 'text'},
   
    { id: 'department_name', label: 'Department Name', width: 280, type: 'text' },
    { id: 'working_location', label: 'Working Location', width: 220, type: 'text' },
    { id: 'reporting_manager_name', label: 'Reporting Manager Name', width: 180, type: 'text' }
    
  ]);

  const actions = [
    { name: 'approve', icon: 'hh', path: 'jjj' },
    { name: 'view', icon: 'hh', path: 'jjj' },
    { name: 'eerr', icon: 'hh', path: 'jjj' },
  ];
  // const bodyContent = [
  //   {
  //     name: 'ssurendra',
  //     email: 'suri@infobellIt.com',
  //     phoneNumber: '9879876789',
  //     company: 'Infobell',
  //     role: 'UI Developer',
  //     status: 'active',
  //   },
  // ];
  return (
    <>
    <ReusableTabs
        tabLabels={tabLabels}
        tabContents={tabContents}
        tabsSx={{ borderBottom:"3px solid #3b82f6 !important" }}
      />
      </>
  )
}

export default EmployeeManagementHome