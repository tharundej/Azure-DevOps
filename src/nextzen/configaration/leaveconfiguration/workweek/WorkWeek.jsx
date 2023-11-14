import * as React from 'react';
import Box from '@mui/material/Box';
import { BasicTable } from '../../../Table/BasicTable';

export default function WorkWeek() {
    const TABLE_HEAD = [
      { id: 'day', label: 'Day', type: 'text',minWidth:280 },
      { id: 'action', label: 'Action', type: 'text',minWidth:280 },
      { id: 'locationName', label: 'Location', type: 'text',minWidth:280 },
    ];
    const actions = [
      { name: 'View', icon: 'hh', path: 'jjj' },
      { name: 'Edit', icon: 'hh', path: 'jjj' },
    ];
    const defaultPayload = 
    {
      "count":5,
      "page": 0,
      "search": "",
      "companyId": "COMP1",
      "externalFilters": {
        "locationName":""
      },
      "sort": {
        "key": 1,
        "orderBy": ""
      }
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