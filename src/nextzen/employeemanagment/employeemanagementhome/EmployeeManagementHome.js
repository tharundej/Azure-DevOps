import React from 'react'

import ReusableTabs from 'src/nextzen/tabs/ReusableTabs'

import EmployeeTable from '../employeestable/Employeestable';

function EmployeeManagementHome  () {
    const tabLabels = ['EmployeeTable', 'Statoury'];
  const tabContents = [
    <div>

     <EmployeeTable/>
    </div>,
    <div>
     <h2>12</h2>
    </div>
  ];
  return (
    <>
    
    <ReusableTabs tabContents={tabContents} tabLabels={tabLabels} />
    
    
    
    
    </>
  )
}

export default EmployeeManagementHome