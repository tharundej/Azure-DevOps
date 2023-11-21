import { useEffect, useState, useCallback } from 'react';

import { Helmet } from 'react-helmet-async';

import axios from 'axios';

import { _userList } from '../../_mock';

import { BasicTable } from '../Table/BasicTable';
import { getVendorListAPI } from 'src/api/Accounts/Vendor';

const VendorTable = () => {
  const actions = [
    { name: 'Edit', icon: 'hh', id: 'edit', type: 'serviceCall', endpoint: '' },
    { name: 'Delete', icon: 'hh', id: 'delete', type: 'serviceCall', endpoint: '' },
  ];
  const [filterOptions, setFilterOptions] = useState({});
  const [bodyContent, setBodyContent] = useState([]);
  const [body_for_employee, setBody] = useState({
    count: 5,
    page: 1,
  });

  const ApiHit = async () => {
    try {
      const response = await getVendorListAPI(defaultPayload);
      console.log('location success', response);
    } catch (error) {
      console.log('API request failed:', error.message);
    }
  };

  useEffect(() => {
    ApiHit();
  }, []);
  const defaultPayload = {
    count: 5,
    page: 0,
    search: '',
    companyID: 'COMP1',
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
