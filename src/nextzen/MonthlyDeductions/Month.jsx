import { height } from '@mui/system';
import * as React from 'react';
import ReusableTabs from '../tabs/ReusableTabs';
import Deduction from './Deduction';
import Loans from './loans';
import SalaryAdvace from './SalaryAdvace';
import Requests from './Requests';
import UserContext from '../context/user/UserConext';
import { useContext,useState,useEffect } from 'react';
<<<<<<< HEAD
import Additions from './Additions/Additions';
=======
import Additions from '././Additions/Additions';
>>>>>>> 9d098eab4c239c7e73a1cb809096f8b9d725d184
export default function Month() {
  const {user} = useContext(UserContext)
  const [tabLabels, setTabLabels] = useState([]);
  const [tabContents, setTabContents] = useState([]);
  const dataObj = [
    // {
    //   id: 'salaryAdvance',
    //   label: 'Salary Requests',
    //   content: <SalaryAdvace key="salaryAdvance" />,
    // },
    {
      id: 'loans',
      label: 'Loans',
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
    arrLabels.push('Additions')
    arrContents.push(<Additions/>)
    setTabLabels(arrLabels);
    setTabContents(arrContents);
  }, [user]);
  return (
    <>
    <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} tabsSx={{ borderBottom:"3px solid #3b82f6 !important" }}/>
    </>
  );
}