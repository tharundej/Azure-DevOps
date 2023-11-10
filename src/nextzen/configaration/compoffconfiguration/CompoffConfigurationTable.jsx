import * as React from 'react';
import Box from '@mui/material/Box';
import { BasicTable } from 'src/nextzen/Table/BasicTable';

export default function CompoffConfigurationTable() {
    const TABLE_HEAD = [
      { id: 'compensatory', label: 'Compensatory', type: 'text', minWidth:180 },
      { id: 'type', label: 'Type', type: 'text' , minWidth:180},
    ];
    const actions = [
      { name: 'View', icon: 'hh', path: 'jjj' },
      { name: 'Edit', icon: 'hh', path: 'jjj' ,endpoint:'/'},
    ];
    // const bodyContent = [
    //   {
    //     employeeType: 'Permanent',
    //     payscheduleType: 'Weekly',
    //     payType: 'CTC',
    //     basicPay: '40',
    //     hra: '20',
    //     da: '8',
    //     employeePf: '6',
    //     employerPf: '6',
    //     tds: '20',
    //   },
    // ];
    const defaultPayload = 
    {
      "count":3,
      "page": 2,
      "search": "",
      "companyId": "COMP1",
      "externalFilters": {
        "holidayName":"",
        "holidayDate": "",
        "repeatAnnualy": "",
        "fulldayHalfday": "",
        "locationName":""
      },
      "sort": {
        "key": 1,
        "orderBy": ""
      }
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
          endpoint="/"
          defaultPayload={defaultPayload}
          rowActions={actions}
          filterName="CompoffFilterSearch"
        />
      
    );
  }