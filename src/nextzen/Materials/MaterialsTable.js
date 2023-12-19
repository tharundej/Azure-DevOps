import { useEffect, useState, useCallback, useContext } from 'react';

import { Helmet } from 'react-helmet-async';

import axios from 'axios';

import { _userList } from '../../_mock';

import { BasicTable } from '../Table/BasicTable';
import UserContext from '../context/user/UserConext';

const MaterialsTable = () => {
  const {user} = useContext(UserContext);
  const actions = [
    { name: 'Edit', icon: 'basil:edit-outline', id: 'edit', type: 'serviceCall', endpoint: '' },
    {
      name: 'Delete',
      icon: 'fluent:delete-28-regular',
      id: 'delete',
      type: 'serviceCall',
      endpoint: '',
    },
  ];
  const [filterOptions, setFilterOptions] = useState({});
  const [bodyContent, setBodyContent] = useState([]);
  const [body_for_employee, setBody] = useState({
    count: 5,
    page: 1,
  });
  const ApiHit = () => {
    const data1 = body_for_employee;
    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: 'http://192.168.0.222:3001/erp/MaterialsDetails',
      // headers: {
      //   'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTcwMjY5MTN9.D7F_-2424rGwBKfG9ZPkMJJI2vkwDBWfpcQYQfTMJUo'
      // },
      data: data1,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.data));
        setBodyContent(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    ApiHit();
    
  }, []);
  const defaultPayload = {
    count: 5,
    page: 0,
    search: '',
    fcompanyID: user?.companyID ? user?.companyID : '',
    externalFilters: {
      fMaritalStatus: '',
      fBloodGroup: '',
      fPState: '',
      fPEmployementType: '',
      fPdepartmentName: '',
      fPDesignation: '',
      fPDesignationGrade: '',
      fWorkingLocation: '',
      fjoiningDate: {
        from: '',
        to: '',
      },
      fDOB: {
        from: '',
        to: '',
      },
      fofferDate: {
        from: '',
        to: '',
      },
    },
    sort: {
      key: 1,
      orderBy: 'MaterialsName',
    },
  };
  const [TABLE_HEAD, setTableHead] = useState([
    { id: 'SNo', label: 'Sl.No', type: 'text', minWidth: '180px' },
    { id: 'Vendor Name', label: 'Vendor Name', type: 'text', minWidth: '180px' },
    { id: 'HSN ID', label: 'HSN ID', type: 'text', minWidth: '180px' },
    { id: 'Material Name', label: 'Material Name', type: 'text', minWidth: '180px' },
    { id: 'Material Category', label: 'Material Category', type: 'text', minWidth: '180px' },
    { id: 'OperationalDate ', label: 'Operational Date', type: 'text', minWidth: '180px' },
    { id: 'CloseDate', label: 'Close Date', type: 'text', minWidth: '180px' },
    { id: 'Status', label: 'Status', type: 'text', minWidth: '180px' },
  ]);
  return (
    <>
      <Helmet>
        <title> Dashboard: Materials</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/MaterialsDetails"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="MaterialsHead"
        handleEditRowParent={() => {}}
      />
    </>
  );
};
export default MaterialsTable;
