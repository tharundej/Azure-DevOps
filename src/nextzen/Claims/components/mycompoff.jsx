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

export default function UserListPage() {

  const TABLE_HEAD = [
    {
      id: "employee",
      label: " Employee Name",
      width: 180,
      type: "text",
      containesAvatar: false,

      secondaryText: "email",
    },
    { id: "apply_date", label: "Apply Date", width: 180, type: "text" },
    { id: "employee_id", label: "Employee Id", width: 220, type: "text" },
    { id: "from_date", label: "From Date", width: 180, type: "text" },
    { id: "leave_type", label: "Leave Type", width: 100, type: "badge" },
    // { id: '', width: 88 },
  ]



  const defaultPayload={

    "Count": 3,

    "Page": 0,

    "Search": "",

    "Eid": "E1",

    "fFromDate": "",

    "fToDate": "",

    "fLeaveTypeName": "",

    "fStatus": "",

    "order":1,

    "orderBy":"al.apply_date"

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
  return (
    <>
      <Helmet>
        <title> Dashboard: mycompoff</title>
      </Helmet>

      <BasicTable
         endpoint="/listLeave"
         defaultPayload={defaultPayload}
         headerData={TABLE_HEAD}
      />
    </>
  );
}
