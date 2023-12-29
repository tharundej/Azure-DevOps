import { height } from '@mui/system';
import * as React from 'react';
import ReusableTabs from '../tabs/ReusableTabs';
import Deduction from './Deductions/Deduction';
import Loans from './Loans/loans';
import SalaryAdvace from './SalaryAdvace';
import Requests from './Requests';
import UserContext from '../context/user/UserConext';
import { useContext,useState,useEffect } from 'react';
import Additions from '././Additions/Additions';
export default function Month() {
  const {user} = useContext(UserContext)
  const [tabLabels, setTabLabels] = useState([]);
  const [tabContents, setTabContents] = useState([]);
  const dataObj = [
    {
      id: 'additions',
      label:"Additions",
      content:<Additions key ="additions"/>
    },
     
    {
      id: 'myDeductions',
      label: 'Deductions',
      content: <Deduction key="myDeductions" />,
    },
  
    {
      id: 'loans',
      label: 'Loans',
      content: <Loans key="loans" />,
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
  
    setTabLabels(arrLabels);
    setTabContents(arrContents);
  }, [user]);
  return (
    <>
    <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} tabsSx={{ borderBottom:"3px solid #3b82f6 !important" }}/>
    </>
  );
}