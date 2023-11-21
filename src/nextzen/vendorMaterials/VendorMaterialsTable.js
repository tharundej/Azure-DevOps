import { useEffect, useState, useCallback } from 'react';

import { Helmet } from 'react-helmet-async';

import axios from 'axios';

import { _userList } from '../../_mock';

import { BasicTable } from '../Table/BasicTable';
import { getVendorListAPI } from 'src/api/Accounts/Vendor';

const VendorMaterialsTable = () => {
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
    companyId: 'COMP1',
    search: '',
    externalFilters: {
      materialName: '',
      hsnId: '',
      gstRate: 0,
      operationalDate: {
        from: '',
        to: '',
      },
      closeDate: {
        from: '',
        to: '',
      },
      status: '',
      vendorId: 0,
      vendorName: '',
    },
    sort: {
      key: 1,
      orderBy: 'hsnId',
    },
    page: 0,
    count: 5,
  };
  const [TABLE_HEAD, setTableHead] = useState([
    { id: 'vendorName', label: 'Vendor Name', type: 'text', minWidth: '180px' },
    { id: 'materialName', label: 'Material Name', type: 'text', minWidth: '180px' },
    { id: 'hsnId', label: 'HSN ID', type: 'text', minWidth: '180px' },
    { id: 'materialType', label: 'Material Type', type: 'text', minWidth: '180px' },
    { id: 'gstRate', label: 'GST Rate', type: 'text', minWidth: '180px' },
    { id: 'operationalDate', label: 'Operational Date', type: 'text', minWidth: '180px' },
    { id: 'closeDate', label: 'Close Date', type: 'text', minWidth: '180px' },
    { id: 'status', label: 'Status', type: 'text', minWidth: '180px' },
  ]);
  return (
    <>
      <Helmet>
        <title> Accounting: Vendor Material</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/getMaterialss"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="VendorMaterialsHead"
      />
    </>
  );
};
export default VendorMaterialsTable;
