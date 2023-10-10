import { Helmet } from 'react-helmet-async';
// sections
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import Button from '@mui/material/Button';
// ----------------------------------------------------------------------
import { _userList } from 'src/_mock';
import { paths } from 'src/routes/paths';

import { useRouter } from 'src/routes/hooks';

import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';

export default function UserListPage() {
  const TABLE_HEAD = [
    {
      id: "name",
      label: " Name",
      type: "text",
      containesAvatar: false,

      secondaryText: 'email',
    },
    { id: 'phoneNumber', label: 'contact', width: 180, type: 'text' },
    { id: 'company', label: 'Company', width: 220, type: 'text' },
    { id: 'role', label: 'Role', width: 180, type: 'text' },
    { id: 'status', label: 'Status', width: 100, type: 'badge' },
    // { id: '', width: 88 },
  ];

  const actions = [
    { name: 'approve', icon: 'hh', path: 'jjj' },
    { name: 'view', icon: 'hh', path: 'jjj' },
    { name: 'eerr', icon: 'hh', path: 'jjj' },
  ];
  const bodyContent = [
    {
      name: 'Surendra',
      email: 'suri@infobellIt.com',
      phoneNumber: '9879876789',
      company: 'Infobell',
      role: 'UI Developer',
      status: 'active',
    },
  ];
  return (
    <>
      <Helmet>
        <title> Dashboard: reusetable</title>
      </Helmet>
      <Button
        component={RouterLink}
        href={paths.dashboard.employee.onboardform}
        variant="contained"
        startIcon={<Iconify icon="mingcute:add-line" />}
      >
        Add New Employee
      </Button>
      <BasicTable headdata={TABLE_HEAD} bodydata={bodyContent} rowActions={actions} />
    </>
  );
}
