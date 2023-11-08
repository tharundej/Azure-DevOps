import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Dialog,Grid,TextField,InputAdornment} from '@mui/material';
import { Container } from '@mui/system';
import { BasicTable } from '../../../Table/BasicTable';
import Iconify from 'src/components/iconify/iconify';

export default function LeaveType() {
    const TABLE_HEAD = [
      { id: 'leaveName', label: 'Leave Name', type: 'text' , minWidth:180},
      { id: 'totalNumberOfLeaves', label: 'Total Number Of Leaves', type: 'text', minWidth:180 },
      { id: 'termType', label: 'Term Type', type: 'text', minWidth:180 },
      { id: 'elUpperCapLimit', label: 'EL Upper Cap Limit', type: 'text', minWidth:180 },
      { id: 'elTakenRange', label: 'EL Taken Range', type: 'text' , minWidth:180},
    ];
    const actions = [
      { name: 'View', icon: 'hh', path: 'jjj' },
      { name: 'Edit', icon: 'hh', path: 'jjj' ,endpoint:'/'},
    ];
    const defaultPayload = 
    {
      "companyID":"COMP4"
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
          endpoint="/getLeaveType"
          defaultPayload={defaultPayload}
          rowActions={actions}
          filterName="LeaveTypeFilterSearch"
        />
    );
  }