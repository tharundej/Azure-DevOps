import { Helmet } from "react-helmet-async";
// sections
import { BasicTable } from "src/nextzen/Table/BasicTable";
import Button from '@mui/material/Button';

// ----------------------------------------------------------------------
import { _userList } from "src/_mock";
import { paths } from 'src/routes/paths';

import { useRouter } from 'src/routes/hooks';

import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import { SurendraBasicTable } from "src/nextzen/Table/SurendraBasicTable";


export default function MyCompoff() {

  const TABLE_HEAD = [
    {
      id: "employeename",
      label: " Employee Name",
      width: 180,
      type: "text",
      containesAvatar: false,

      secondaryText: "email",
    },
    { id: "claim_type", label: "Apply Date", width: 180, type: "text" },
    { id: "employee_id", label: "Employee Id", width: 220, type: "text" },
    { id: "from_date", label: "From Date", width: 180, type: "text" },
    { id: "leave_type", label: "Leave Type", width: 100, type: "badge" },
    // { id: '', width: 88 },
  ]



  const defaultPayload={

  
    "employee_id":"",
    "company_id":"COMP2",
    "page":0,
    "search":"",
    "count":5,
    "externalFilters":{
      "start_date":"",
      "end_date":"",
      "status":"",
      "compensantory_policies":"",
      "utilisation":""
    },
    "sort":{
      "key":1,
      "orderBy":""
    }
   
}
  

  const actions = [
    { name: "approve", icon: "hh", path: "jjj" },
    { name: "view", icon: "hh", path: "jjj" },
    { name: "eerr", icon: "hh", path: "jjj" },
  ];
  const bodyContent = [
    {
      name: "Malli",
      email: "Malli@infobellIt.com",
      phoneNumber: "9879876789",
      company: "Infobell",
      role: "UI Developer",
      status: "active",
    },
  ];

  const onclickActions = (event) => {
    console.log( "my claims from to basic table")
    console.log(event)
    if (event && event?.eventData) {
      if (event?.eventData?.type === 'serviceCall') {
        // serviceCall(event.eventData.endpoint,event.rowData)
        
      } else {
          // navigate[event.eventData.route]
      }
    }
  }
  return (
    <>
      <Helmet>
        <title> Dashboard: mycompoff</title>
      </Helmet>
      

      <SurendraBasicTable
         endpoint="/listLeave"
         defaultPayload={defaultPayload}
         headerData={TABLE_HEAD}
         rowActions={actions}
         bodyData = 'data'

      //    button="Apply Claim"
      // buttonFunction={handleOpen}
      // filterContent={dialogConfig}
      // dialogPayload={externalFilter}
        //  filterName="claimSearchFilter"
        //  onclickActions={onclickActions}
      />
    </>
  );
}
