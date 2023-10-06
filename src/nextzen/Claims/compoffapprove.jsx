import { Helmet } from 'react-helmet-async';
// sections
import { BasicTable} from 'src/nextzen/Table/BasicTable';

// ----------------------------------------------------------------------
import { _userList } from 'src/_mock';

export default function CompoffApprove() {
    const TABLE_HEAD = [
        { id: 'name', label: ' Name' },
        { id: 'phoneNumber', label: 'contact', width: 180 },
        { id: 'company', label: 'Company', width: 220 },
        { id: 'role', label: 'Role', width: 180 },
        { id: 'status', label: 'Status', width: 100 },
        { id: '', width: 88 },
      ];
    
  return (
    <>
      <Helmet>
        <title> Dashboard: CompoffApprove</title>
      </Helmet>

      <BasicTable  headdata={TABLE_HEAD} bodydata={_userList}/>
    </>
  );
}
