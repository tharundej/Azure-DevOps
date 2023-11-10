import * as React from 'react';
import Box from '@mui/material/Box';
import { BasicTable } from 'src/nextzen/Table/BasicTable';

export default function LeavePeriod() {
    const TABLE_HEAD = [
      { id: 'leavePeriodType', label: 'Leave Period Type', type: 'text', minWidth:280  },
      { id: 'startDate', label: 'Start Date', type: 'text', minWidth:280  },
      { id: 'endDate', label: 'End date', type: 'text', minWidth:180  },
    ];
    const actions = [
      { name: 'View', icon: 'hh', path: 'jjj' },
      { name: 'Edit', icon: 'hh', path: 'jjj' ,endpoint:'/'},
    ];

    const defaultPayload = 
    {
      "companyID":"COMP1"
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
          endpoint="/getAllLeavePeriod"
          defaultPayload={defaultPayload}
          rowActions={actions}
          filterName='LeavePeriodFilterSearch'
        />
      
    );
  }