import React from 'react'

import ReusableTabs from 'src/nextzen/tabs/ReusableTabs'

import EmployeeTable from '../employeestable/Employeestable';
import { BasicTable } from 'src/nextzen/Table/BasicTable';

function EmployeeManagementHome  () {
    const tabLabels = ['EmployeeTable', 'Statoury'];
  const tabContents = [
    <div>

     <EmployeeTable/>
    </div>,
    <div>
     <h2>1222</h2>
    </div>
  ];
  const [TABLE_HEAD,setTableHead] =useState( [
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
      />
      <BasicTable headerData={TABLE_HEAD} endpoint="/listLeave"/>
      </>
  )
}

export default EmployeeManagementHome