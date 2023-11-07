import * as React from 'react';
import Box from '@mui/material/Box';
import { BasicTable } from '../../../Table/BasicTable';

export default function WorkWeek() {
    const TABLE_HEAD = [
      { id: 'monday', label: 'Monday', type: 'text' },
      { id: 'tuesday', label: 'Tuesday', type: 'text' },
      { id: 'wednesday', label: 'Wednesday', type: 'text' },
      { id: 'thursday', label: 'Thursday', type: 'text' },
      { id: 'friday', label: 'Friday', type: 'text' },
      { id: 'saturday', label: 'Saturday', type: 'text' },
      { id: 'sunday', label: 'Sunday', type: 'text' },
    ];
    const actions = [
      { name: 'View', icon: 'hh', path: 'jjj' },
      { name: 'Edit', icon: 'hh', path: 'jjj' },
    ];
    const defaultPayload = 
    {
        "company_id": "0001"
    }
     
     

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
          endpoint="/getallWorkWeek"
          defaultPayload={defaultPayload}
          rowActions={actions}
          filterName="WorkWeekFilterSearch"
        />
      
    );
  }