import { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { _userList } from '../../_mock';
import { BasicTable } from '../Table/BasicTable';

export default function OtherExpenses() {
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
		  url: '/fuelDetails',
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
		fcompanyID: JSON.parse(localStorage.getItem('userDetails'))?.companyID,
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
		  orderBy: 'Vehicle No.',
		},
	  };
	  const [TABLE_HEAD, setTableHead] = useState([
		{ id: 'SNo', label: 'S. No', type: 'text', minWidth: '180px' },
		{ id: 'Date', label: 'Date', type: 'text', minWidth: '180px' },
		{ id: 'Item Name', label: 'Item Name', type: 'text', minWidth: '180px' },
		{ id: 'Invoice No.', label: 'Invoice No.', type: 'text', minWidth: '180px' },
		{ id: 'Invoice Date', label: 'Invoice Date', type: 'text', minWidth: '180px' },
		{ id: 'Total Amount', label: 'Total Amount', type: 'text', minWidth: '180px' },
		{ id: 'Advance Amount', label: 'Advance Amount', type: 'text', minWidth: '180px' },
		{ id: 'Balance Amount', label: 'Balance Amount', type: 'text', minWidth: '180px' },
		{ id: 'Status', label: 'Status', type: 'text', minWidth: '180px' },
		{ id: 'Actions', label: 'Action', type: 'text', minWidth: '180px' },
	  ]);
	  return (
		<>
		  <Helmet>
			<title> Dashboard: Other Expenses</title>
		  </Helmet>
		  <BasicTable
			headerData={TABLE_HEAD}
			endpoint="/otherexpenses"
			defaultPayload={defaultPayload}
			filterOptions={filterOptions}
			rowActions={actions}
			filterName="OtherExpensesHead"
		  />
		</>
	  );
}
