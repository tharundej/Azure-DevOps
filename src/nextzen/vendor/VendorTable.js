import { useEffect, useState, useCallback } from 'react';

import { Helmet } from 'react-helmet-async';

import axios from 'axios';

import { _userList } from '../../_mock';

import { BasicTable } from '../Table/BasicTable';

const VendorTable = () => {
  const actions = [
    { name: 'Edit', icon: 'hh', id: 'edit' },
    { name: 'Delete', icon: 'hh', id: 'delete' },
  ];
  const [filterOptions, setFilterOptions] = useState({
    dates: [
      {
        display: 'Established Date',
        field_name: 'EstablishedDate',
      },
      {
        display: 'Operational Date',
        field_name: 'OperationalDate',
      },
    ],
    dropdowns: [
      {
        display: 'Status',
        options: ['active', 'inactive'],
        field_name: 'status',
      },
      
    ],
  });
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
      url: 'http://192.168.0.222:3001/erp/vendorDetails',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const defaultPayload = {
    count: 5,
    page: 0,
    search: '',
    fcompanyID: 'COMP1',
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
      orderBy: 'FactoryName',
    },
  };
  const [TABLE_HEAD, setTableHead] = useState([
    { id: 'SNo', label: 'S. No', type: 'text', minWidth: '180px' },
    { id: 'VendorName', label: 'Vendor Name', type: 'text', minWidth: '180px' },
    { id: 'VendorEmailID', label: 'Vendor  Email ID', type: 'text', minWidth: '180px' },
    { id: 'VendorPhoneNo', label: 'Vendor Phone No', type: 'text', minWidth: '180px' },
    { id: 'Address', label: 'Address', type: 'text', minWidth: '180px' },
    { id: 'PanNo', label: 'PAN No', type: 'text', minWidth: '180px' },
    { id: 'TanNo', label: 'TAN No', type: 'text', minWidth: '180px' },
    { id: 'GstNo', label: 'GST No', type: 'text', minWidth: '180px' },
    { id: 'BankName', label: 'Bank Name', type: 'text', minWidth: '180px' },
    { id: 'AccHolderName ', label: 'Acc Holder name', type: 'text', minWidth: '180px' },
    { id: 'AccountNo ', label: 'Account No', type: 'text', minWidth: '180px' },
    { id: 'IfscCode', label: 'IFSC Code', type: 'text', minWidth: '180px' },
    { id: 'BankBranch', label: 'Bank Branch', type: 'text', minWidth: '180px' },
    { id: 'OnboardDate', label: 'Onboard Date', type: 'text', minWidth: '180px' },
    { id: 'OffboardDate', label: 'Offboard Date', type: 'text', minWidth: '180px' },
    { id: 'Status', label: 'Status', type: 'text', minWidth: '180px' },
  ]);
  return (
    <>
      <Helmet>
        <title> Accounting: Vendor</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/vendorDetails"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="VendorHead"
      />
    </>
  );
};
export default VendorTable;
