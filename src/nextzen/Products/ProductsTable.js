import { useEffect, useState, useCallback } from 'react';

import { Helmet } from 'react-helmet-async';

import axios from 'axios';

import { _userList } from '../../_mock';

import { BasicTable } from '../Table/BasicTable';

const ProductsTable = () => {
  const actions = [
    { name: 'Edit', icon: 'hh', id: 'edit' },
    { name: 'Delete', icon: 'hh', id: 'delete' },
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
      url: 'http://192.168.0.222:3001/erp/ProductsDetails',
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
      orderBy: 'ProductsName',
    },
  };
  const [TABLE_HEAD, setTableHead] = useState([
    { id: 'SNo', label: 'S. No', type: 'text', minWidth: '180px' },
    { id: 'ProductCategory', label: 'Product Category', type: 'text', minWidth: '180px' },
    { id: 'ProductName', label: 'Product Name', type: 'text', minWidth: '180px' },
    { id: 'HSNID', label: 'HSN ID', type: 'text', minWidth: '180px' },
    { id: 'Status', label: 'Status', type: 'text', minWidth: '180px' },
  ]);
  return (
    <>
      <Helmet>
        <title> Dashboard: Products</title>
      </Helmet>
      <BasicTable
        headerData={TABLE_HEAD}
        endpoint="/ProductsDetails"
        defaultPayload={defaultPayload}
        filterOptions={filterOptions}
        rowActions={actions}
        filterName="ProductsHead"
      />
    </>
  );
};
export default ProductsTable;