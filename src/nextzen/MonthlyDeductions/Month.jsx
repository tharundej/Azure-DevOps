import { height } from '@mui/system';
import * as React from 'react';

import ReusableTabs from '../tabs/ReusableTabs';
import Deduction from './Deduction';
import Loans from './loans';
import SalaryAdvace from './SalaryAdvace';
import Requests from './Requests';



export default function Month() {
      const tabLabels = ["Salary Requests" , "Loan Requests" ,"Deductions","My Requests"]
      const tabContents = [
        <div><SalaryAdvace/> </div>,
        <div><Loans/></div>,
        <div><Deduction/></div>,
        <div><Requests/></div>
      ]
  return (
    <>
    <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} tabsSx={{ borderBottom:"3px solid #3b82f6 !important" }}/>
    </>
  );
}