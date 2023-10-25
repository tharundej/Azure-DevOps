import { Helmet } from 'react-helmet-async';
// sections
import { BasicTable} from 'src/nextzen/Table/BasicTable';
import { _userListTwo } from 'src/_mock';
// ----------------------------------------------------------------------

export default function UserListPages() {
    const TABLE_HEAD = [
        { id: 'name', label: 'First Name' },
        { id: 'phoneNumber', label: 'Mobile', width: 180 },
        { id: 'company', label: 'Company', width: 220 },
        { id: 'role', label: 'Role', width: 180 },
        { id: 'status', label: 'Status', width: 100 },
        { id: '', width: 88 },
      ];
    
  return (
    <>
      <Helmet>
        <title> Dashboard: reusetable</title>
      </Helmet>

      <BasicTable  headdata={TABLE_HEAD} bodydata={_userListTwo}/>
    </>
  );
}