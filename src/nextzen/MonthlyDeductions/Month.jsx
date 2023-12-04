import { height } from '@mui/system';
import * as React from 'react';

import ReusableTabs from '../tabs/ReusableTabs';
import Deduction from './Deduction';
import Loans from './loans';
import SalaryAdvace from './SalaryAdvace';
import Requests from './Requests';
import UserContext from '../context/user/UserConext';
import { useContext,useState,useEffect } from 'react';

export default function Month() {
  const {user} = useContext(UserContext)
  const [tabLabels, setTabLabels] = useState([]);
  const [tabContents, setTabContents] = useState([]);
  const dataObj = [
    {
      id: 'salaryAdvance',
      label: 'Salary Requests',
      content: <SalaryAdvace key="salaryAdvance" />,
    },
    {
      id: 'loans',
      label: 'Loan Requests',
      content: <Loans key="loans" />,
    },
    {
      id: 'myDeductions',
      label: 'Deductions',
      content: <Deduction key="myDeductions" />,
    },
    {
      id: 'myRequest',
      label: 'My Requests',
      content: <Requests key="myRequest" />,
    },
  ];
    
  useEffect(() => {
    const arrLabels = [];
    const arrContents = [];

    dataObj?.forEach((item) => {
      const permission = user?.rolePermissions.monthlyAdditionalDeductions;
      if (
        permission &&
        permission.hasOwnProperty('mainHeading') &&
        permission.mainHeading &&
        permission[item.id]
      ) {
        arrLabels.push(item.label);
        arrContents.push(item.content);
      }
     
    });
    arrLabels.push('My Requests');
    arrContents.push(<Requests key="myRequest" />)
    setTabLabels(arrLabels);
    setTabContents(arrContents);
  }, [user]);

  return (
    <>
    <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} tabsSx={{ borderBottom:"3px solid #3b82f6 !important" }}/>
    </>
  );
}