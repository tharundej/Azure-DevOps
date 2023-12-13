import * as React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { useState, useCallback, useEffect } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import Popover from '@mui/material/Popover';
import DialogContent from '@mui/material/DialogContent';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import Pagination from '@mui/material/Pagination';
// _mock
import { _roles, USER_STATUS_OPTIONS } from 'src/_mock';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// datarange
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import Paper from '@mui/material/Paper';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  // TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
//
// import { DateRangePicker } from 'rsuite';
import axios from 'axios';
import UserTableRow from './components/UserTableRow';
import Style from '../styles/Style.module.css';
import { useSnackbar } from '../../components/snackbar';

import SearchFilter from '../filterSearch/FilterSearch';
// import ClaimSearchFilter from '../claims/ClaimSearchFilter';

import EmployeeTableFilter from '../employeemanagment/employeefilter/EmployeeTableFilter';
import EmployeeFilterSearch from '../employeemanagment/employeestable/EmployeeFilterSearch';
// import EmployeeTableFilter from '../employeemanagment/employeefilter/EmployeeTableFilter';

import TimeSearchFilter from '../TimeSheetManagement/TimeFilter';
import ApprovalSearchFilter from '../TimeSheetManagement/ApprovalSearchFilter';
import ProjectSearchFilter from '../timesheet/components/ProjectSearchFilter';
import ShiftRoastFilter from './components/shiftmanagement/ShiftRoasterFilter';
import MyShiftSearchFilter from './components/shiftmanagement/MyShiftSearchFilter';
import AssignShiftSearchFilter from './components/shiftmanagement/AssignShiftSearchFilter';
import SalarySearchFilter from '../MonthlyDeductions/SalarySearchFilter';
import LoanSearchFilter from '../MonthlyDeductions/LoanSearchFilter';
import DeductionFilter from '../MonthlyDeductions/DeductionFilter';
import LeaveFilter from '../LeaveManagement/LeaveFilter';
import { LoadingScreen } from 'src/components/loading-screen';
import ExpenseClaimFilters from '../configaration/expenseclaimconfiguration/ExpenseClaimFilters';
import PayScheduleFilters from '../Payroll/payschedule/PayScheduleFilters';
import ShiftConfigurationFilters from '../configaration/shiftconfiguration/ShiftConfigurationFilters';
import LeavePeriodFilters from '../configaration/leaveconfiguration/leaveperiod/LeavePeriodFilters';
import LeaveTypeFilters from '../configaration/leaveconfiguration/leavetype/LeaveTypeFilters';
import HolidaysFilters from '../configaration/leaveconfiguration/holidays/HolidaysFilters';
import SwapSearchFilter from './components/shiftmanagement/SwapSearchFilter';
import SalaryStructureFilters from '../employeemanagment/salarystructure/SalaryStructureFilters';
import WorkWeekFilters from '../configaration/leaveconfiguration/workweek/WorkWeekFilters';
import { baseUrl } from '../global/BaseUrl';
import CompoffConfigurationTable from '../configaration/compoffconfiguration/CompoffConfigurationTable';
import ComoffConfigFilters from '../configaration/compoffconfiguration/ComoffConfigFilters';
import FactoryHead from '../factory/FactoryHeader';
import VendorHead from '../vendor/VendorHeader';
import MaterialsHead from '../Materials/MaterialsHeader';
import AssetsHead from '../assets/AssetsHeader';
import ProductsHead from '../Products/ProductsHeader';
import CustomersHead from '../Customers/CustomersHeader';
import PurchaseOrderHead from '../Purchase/PurchaseOrder/PurchaseOrderHeader';
import DesignationGradeSearchFilter from '../configaration/roleconfiguration/searchfilter/DesignationGradeSearchFilter';
import SwapRequestSearchFilter from './components/shiftmanagement/SwapRequestSearchFilter';
import PurchaseInvoiceHead from '../Purchase/PurchaseInvoice/PurchaseInvoiceHeader';
import PurchasePaymentHead from '../Purchase/PurchasePayment/PurchasePaymentHeader';
import SaleInvoiceHead from '../sales/SaleInvoice/SaleInvoiceHeader';
import SalePaymentHead from '../sales/SalePayment/SalePaymentHeader';
import SaleOrderHead from '../sales/SalesOrder/SaleOrderHeader';
import DesignationSearchFilter from '../configaration/roleconfiguration/searchfilter/DesignationSearchFilter';
import DeparrtmentSearchFilter from '../configaration/roleconfiguration/searchfilter/DeparrtmentSearchFilter';
// import BalanceSheetHead from '../balancesheet/BalanceSheetHeader';
// import DeparrtmentSearchFilter from '../configaration/roleconfiguration/searchfilter/DeparrtmentSearchFilter';
// import DesignationSearchFilter from '../configaration/roleconfiguration/searchfilter/DesignationSearchFilter';
// import DesignationGradeSearchFilter from '../configaration/roleconfiguration/searchfilter/DesignationGradeSearchFilter';
// import ClaimSearchFilter from '../claims/ClaimSearchFilter';
import TimeSheetSearchFilter from '../timesheet/components/TimeSheetSearchFilter';
import UserContext from '../context/user/UserConext';
import { useContext } from 'react';
import HrFilter from '../ITDeclaration/hrITDeclaration/hrFilters/HrFilter';
import VendorMaterialsHeader from '../vendorMaterials/VendorMaterialsHeader';
import BalanceSheetHead from '../balancesheet/BalanceSheetHeader';
import LeaveHistoryFilter from '../LeaveManagement/LeaveHistory/LeaveHistoryFilter';
import ApproveFilter from '../timesheet/components/ApproveFilters';
import TaxSectionFilter from '../configaration/taxSectionConfiguration/TaxSectionFilter';
import AddRoleFilter from '../configaration/roleconfiguration/searchfilter/AddRoleFilter';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';

const defaultFilters = {
  name: '',
  role: [],
  status: 'all',
};

// ----------------------------------------------------------------------

const BasicTable = ({
  endpoint,
  onClickActions,
  defaultPayload,
  headerData,
  rowActions,
  bodyData,
  filterName,
  buttonFunction,
  deleteFunction,
  handleEditRowParent,
  handleOpenModal,
  SecondoryTable,
  componentPage,count
}) => {
  const popover = usePopover();
  const { enqueueSnackbar } = useSnackbar();

  const [initialDefaultPayload, setInitialDefaultPayload] = useState(defaultPayload);
  console.log(initialDefaultPayload, 'initialDefaultPayload====================');
  //  console.log(actions,"actions==......")
  //  console.log(onclickActions(),"onclickActions  function --->")
  const [newPage, setNewPage] = useState(initialDefaultPayload?.Page);
  console.log(initialDefaultPayload?.Page, 'page value');
  const countValue = initialDefaultPayload?.Count;
  console.log(countValue, 'initialDefaultPayload count value------');
  const [filterHeaders, setFilterHeaders] = useState([]);
  const pageSize = 1;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalRecordsCount, setTotalRecordsCount] = useState(0);
  // const defaultPayloaddata =defaultPayload;
  //   const endpointdata =endpoint;
  // const [TABLE_HEAD, setTABLE_HEAD] = useState();
  const {user} = useContext(UserContext)
  const empId =  (user?.employeeID)?user?.employeeID:''
  const cmpId= (user?.companyID)?user?.companyID:''
const roleId = (user?.roleID)?user?.roleID:''
const token  =  (user?.accessToken)?user?.accessToken:''
  const TABLE_HEAD = headerData;
  // const[_userList, set_userList] = useState(bodydata);
  const [tableData, setTableData] = useState([]);

  // const [rowActions, setRowActions] = useState(actions);
  // console.log(endpointdata,"endpoint urlll")
  // console.log(defaultPayloaddata,"endpoint urlll")

  // const bodyData = 'appliedLeave';

  useEffect(() => {
    // onclickActions();
    getTableData();
  }, [count]);

  const getTableData = (payload) => {
    setLoading(false);
    let initialDefaultPayloadCopy = initialDefaultPayload;

    console.log(initialDefaultPayload, 'initialDefaultPayload');
    if (payload) {
      initialDefaultPayloadCopy = payload;
    }
    // let initialDefaultPayloadCopy =initialDefaultPayload;
    // if(payload){
    //   initialDefaultPayloadCopy = payload;
    // }
    // if(actionType === 'pageChange'){
    //   initialDefaultPayloadCopy.Page = data;
    // }
    // const baseUrl = 'https://vshhg43l-3001.inc1.devtunnels.ms/erp'
    // const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDI1MjcxMTEsInJhbmRvbSI6Nzk5MjR9.f4v9qRoF8PInZjvNmB0k2VDVunDRdJkcmE99qZHZaDA"
    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      // url: `http://localhost:4001${endpoint}`,
      //   url:`https://3p1h3gwl-3001.inc1.devtunnels.ms/erp${endpoint}`,
      // https://xql1qfwp-3001.inc1.devtunnels.ms/
      // url: `http://192.168.0.184:3001/erp/${endpoint}`,
      // url: `http://192.168.1.192:3001/erp/${endpoint}`,
      // url:`http://192.168.1.79:8080/appTest/GetMycompoffdetails`,
      // url: `https://898vmqzh-3001.inc1.devtunnels.ms/erp/hrapprovals`,
   
      url: baseUrl + `${endpoint}`,
      // url:`https://vshhg43l-3001.inc1.devtunnels.ms/erp/searchSalaryAdvance`,
      // url:`https://vshhg43l-3001.inc1.devtunnels.ms/erp/searchSalaryAdvance`,
      // url:`https://xql1qfwp-3001.inc1.devtunnels.ms/erp/getLoanDetailsHr`,
      // url: `https://xql1qfwp-3002.inc1.devtunnels.ms/erp${endpoint}`,
      // url: `https://xql1qfwp-3002.inc1.devtunnels.ms/erp${endpoint}`,
      // url:`https://898vmqzh-3001.inc1.devtunnels.ms/erp${endpoint}`,
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDI1MjcxMTEsInJhbmRvbSI6Nzk5MjR9.f4v9qRoF8PInZjvNmB0k2VDVunDRdJkcmE99qZHZaDA',
      },
      data: initialDefaultPayload,
    };

    axios
      .request(config)
      .then((response) => {
        setLoading(false);
        // // console.log(response?.data?.bodyContent);
        //setTableData(response?.data?.[bodyData]|| []);
        setTableData(response?.data?.data || []);

        setFilterHeaders(response?.data?.filterHeaders || []);
        setTotalRecordsCount(response?.data?.totalRecords || 0);
        console.log(
          response?.data,
          'total no of records-->',
          response?.count,
          'responsss',
          response
        );

        // leave list api
        console.log('leave list api integration');
        console.log(response);

        // if(actionType === 'pageChange'){
        //   // let initialDefaultPayloadCopy =
        //   setInitialDefaultPayload((prevData)=>({
        //     ...prevData, Page:data
        //   }))
        // }
      })

      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  // const currentPageRecords = tableData.slice(startIndex, endIndex);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const table = useTable();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  const [filters, setFilters] = useState(defaultFilters);
  // const dataFiltered = tableData.slice(startIndex, endIndex);
  const dataFiltered = applyFilter({
    inputData: tableData || [],
    // console.log(inputData,"inputData checkingggggggggggg"),
    comparator: getComparator(table?.order, table?.orderBy),
    filters,
  });

  const denseHeight = table.dense ? 30 : 50;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered?.length && canReset) || !dataFiltered?.length;

  const handleFilters = useCallback(
    (name, value) => {
      table?.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleDeleteRow = (event) => {
    console.log(event);
  };

  const approveLeave = (rowdata, event) => {
    var payload = {
      leave_id: rowdata?.leaveId,
      emp_id: rowdata?.employeeId,
      status: event?.id,
      leave_type_id: rowdata?.leaveTypeId,
      duration: rowdata?.requestedDuration,
    };
    console.log(payload, 'requestedddbodyyy');
    const config = {
      method: 'POST',
      maxBodyLength: Infinity,
      // url: baseUrl + `approveLeave`,
      url: `https://27gq5020-5001.inc1.devtunnels.ms/erp/approveLeave`,
      data: payload,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response, 'responsedata', response.data);
        enqueueSnackbar(response.data.message, { variant: 'success' });
        getTableData();
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: 'Error' });
        console.log(error);
      });
  };

  const handleEditRow = (rowData, eventData) => {
    console.log(rowData, 'handleditt', eventData);
    onClickActions(rowData, eventData);
  };

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  const onPageChangeHandeler = (event, data) => {
    const payload = initialDefaultPayload;
    payload.page = data;
    setInitialDefaultPayload(payload);
    getTableData(payload);
    // getTableData(payload)
  };

  useEffect(() => {
    getTableData(initialDefaultPayload);
  }, [initialDefaultPayload]);

  const onChangeRowsPerPageHandeler = (event) => {
    console.log(event);
    const payload = initialDefaultPayload;
    payload.count = event.target.value;
    payload.page = 0;
    setInitialDefaultPayload(payload);
    getTableData(payload);
  };

  // Search functionality
  const handleSearch = (searchTerm) => {
    const payload = initialDefaultPayload;
    setInitialDefaultPayload((prevPayload) => ({
      ...prevPayload,
      search: searchTerm,
      // Filter_Headers:
    }));
    getTableData(payload);
  };

  // daterange picker
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDateChange = (newValue) => {
    console.log('newValue', newValue);
    setSelectedRange(newValue);
    // handleClose();
  };

  const isValidDate = (date) => date instanceof Date && !Number.isNaN(date);

  const displayValue =
    selectedRange && isValidDate(selectedRange[0]) && isValidDate(selectedRange[1])
      ? `${selectedRange[0].toLocaleDateString()} - ${selectedRange[1].toLocaleDateString()}`
      : '';

  const handleFIlterOptions = (data) => {
    console.log(data, 'filtered data');
    const payload = initialDefaultPayload;
    setInitialDefaultPayload((prevPayload) => ({
      ...prevPayload,
      // Search: searchTerm,
      externalFilters: data,
    }));
    console.log(payload, 'updated payload data');
    getTableData(payload);
  };
  const handleFilterSearch = (searchTerm) => {
    console.log(searchTerm, 'searched dataaaaaaaaaaa');

    const payload = initialDefaultPayload;

    setInitialDefaultPayload((prevPayload) => ({
      ...prevPayload,

      search: searchTerm,

      // Filter_Headers:
    }));

    getTableData(payload);
  };

  // sort

  const [sortColumn, setSortColumn] = useState('');

  const handleSort = (field, order) => {
    console.log(order, 'orderrrrrrrrrrrrr');
    // console.log(field,"for sorting .....")

    const payload = initialDefaultPayload;

    setSortColumn(field);
    setInitialDefaultPayload((prevPayload) => ({
      ...prevPayload,

      sort: {
        key: order === 'asc' ? 1 : 0,
        orderBy: sortColumn,
      },
    }));
    console.log(payload, field, 'sortinglllllllllll');

    table.onSort(field);
    getTableData(payload);
  };

  const getRowActionsBasedOnStatus = (row) => {
    if (
      row?.status === 'pending' ||
      row?.status === '' ||
      row?.status === 'Pending' ||
      row?.status === 'Active' ||
      row?.status === 'InActive' ||
      row?.status === 'active' ||
      row?.status === 'Upcoming' ||
      row?.status === 'Ongoing' ||
      row?.status === 'On Hold'  || "OnHold" 
    ) {
      return rowActions;
    } else if (!row?.status || row?.status === undefined) {
      return rowActions;
    } 
    else if (row?.status === 'Completed') {
      return [rowActions.find(action => action.name === 'View')];
    }
    else {
      return null;
    }
  };

  // table expanded
const [expandedRowId, setExpandedRowId] = useState(null);
const [expandedLoanRow, setExpandedLoanRow] = useState(null);
const handleExpandClick = (rowId, update , rowIndex) => {
  console.log(expandedRowId,"klkl",rowId)
  setExpandedRowId(expandedRowId === rowIndex ? null :rowIndex );
};

const handleLoanExpand=(rowID,rowIndex)=>{
  console.log(rowID,"rowww",rowIndex)
  setExpandedLoanRow(expandedLoanRow===rowIndex?null:rowIndex)
}

const [index, setIndex]=useState(""); // index setting
const [loanIndex,setLoanIndex]=useState("");
{console.log(index,"indexindex",expandedRowId)}
{console.log(loanIndex,"Loan Index",expandedLoanRow)}
  return (
    <>
      {loading ? (
        <LoadingScreen sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
      ) : (
        <Container
          className={Style.MuiContainerRoot}
          maxWidth={settings.themeStretch ? false : 'lg'}
        >
          {filterName === 'SwapRequestSearchFilter' && (
            <SwapRequestSearchFilter
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
            />
          )}
          {/* {filterName === "claimSearchFilter" && <ClaimSearchFilter  filterData={handleFIlterOptions} />} */}
          {filterName === 'TimeSearchFilter' && (
            <TimeSheetSearchFilter
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
            />
          )}
          {filterName === 'ApproveFilters' && (
            <ApproveFilter
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              searchData={handleFilterSearch}
            />
          )}
          {filterName === 'ProjectSearchFilter' && (
            <ProjectSearchFilter
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              getTableData={getTableData}
            />
          )}

          {filterName === 'ApprovalSearchFilter' && (
            <ApprovalSearchFilter
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
            />
          )}
          {filterName === 'ShiftRoastFilter' && (
            <ShiftRoastFilter filterSearch={handleFilterSearch} filterData={handleFIlterOptions} />
          )}
          {filterName === 'MyShiftFilter' && (
            <MyShiftSearchFilter
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
            />
          )}
          {filterName === 'AssignShiftFilter' && (
            <AssignShiftSearchFilter
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
            />
          )}
          {filterName === 'SalaryFilter' && (
            <SalarySearchFilter
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              componentPage = {componentPage}
              getTableData={getTableData}
            />
          )}
          {filterName === 'LoanSearchFilter' && (
            <LoanSearchFilter filterSearch={handleFilterSearch} filterData={handleFIlterOptions} componentPage={componentPage} getTableData={getTableData}/>
          )}
          {filterName === 'LeavelistFilter' && (
            <LeaveFilter filterSearch={handleFilterSearch} filterData={handleFIlterOptions} />
          )}
          {filterName === 'LeaveHistoryFilter' && (
            <LeaveHistoryFilter filterSearch={handleFilterSearch} filterData={handleFIlterOptions} />
          )}

          {filterName === 'EmployeeListFilter' && (
            <EmployeeTableFilter filterData={handleFIlterOptions} />
          )}
          {filterName === 'statuortySearchFilter' && (
            <SearchFilter filterSearch={handleFilterSearch} filterData={handleFIlterOptions} />
          )}
          {filterName === 'EmployeeFilterSearch' && (
            <EmployeeFilterSearch
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
            />
          )}
          {filterName === 'ExpensiveClaimFilterSearch' && (
            <ExpenseClaimFilters
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              searchData={handleFilterSearch}
              getTableData={getTableData}
            />
          )}
          {filterName === 'PayScheduleFilterSearch' && (
            <PayScheduleFilters
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              searchData={handleFilterSearch}
              getTableData={getTableData}
            />
          )}
          {filterName === 'ShiftConfigurationFilterSearch' && (
            <ShiftConfigurationFilters
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              searchData={handleFilterSearch}
              getTableData={getTableData}
            />
          )}
          {filterName === 'LeavePeriodFilterSearch' && (
            <LeavePeriodFilters
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              getTableData={getTableData}
              searchData={handleFilterSearch}
            />
          )}
          {filterName === 'LeaveTypeFilterSearch' && (
            <LeaveTypeFilters filterSearch={handleFilterSearch} filterData={handleFIlterOptions}
            getTableData={getTableData} searchData={handleFilterSearch}/>
            // // <LeaveTypeForm getTableData={getTableData}
            
            // />
          )}
          {filterName === 'SwapSearchFilter' && (
            <SwapSearchFilter filterSearch={handleFilterSearch} filterData={handleFIlterOptions} />
          )}
          {filterName === 'SalaryStructureFilterSearch' && (
            <SalaryStructureFilters
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              searchData={handleFilterSearch}
              onHandleOpen={handleOpenModal}
            />
          )}
          {filterName === 'WorkWeekFilterSearch' && (
            <WorkWeekFilters
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              searchData={handleFilterSearch}
              getTableData={getTableData} 
            />
          )}
          {filterName === 'CompoffFilterSearch' && (
            <ComoffConfigFilters
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              searchData={handleFilterSearch}
              getTableData={getTableData} 
            />
          )}
          {filterName === 'holidaysFilterSearch' && (
            <HolidaysFilters
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              searchData={handleFilterSearch}
              getTableData={getTableData} 
            />
          )}

          {filterName === 'DeductionFilter' && (
            <DeductionFilter filterSearch={handleFilterSearch} filterData={handleFIlterOptions} componentPage={componentPage} getTableData={getTableData}/>
          )}
          {/* accounts  */}
          {filterName === 'FactoryHead' && (
            <FactoryHead filterSearch={handleFilterSearch} filterData={handleFIlterOptions} />
          )}
          {filterName === 'VendorHead' && (
            <VendorHead
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              getTableData={getTableData}
            />
          )}
          {filterName === 'VendorMaterialsHead' && (
            <VendorMaterialsHeader
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              getTableData={getTableData}
            />
          )}
          {filterName === 'MaterialsHead' && (
            <MaterialsHead filterSearch={handleFilterSearch} filterData={handleFIlterOptions} />
          )}
          {filterName === 'AssetsHead' && (
            <AssetsHead
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              getTableData={getTableData}
            />
          )}
          {filterName === 'ProductsHead' && (
            <ProductsHead
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              getTableData={getTableData}
            />
          )}
          {filterName === 'CustomersHead' && (
            <CustomersHead
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              getTableData={getTableData}
            />
          )}
          {filterName === 'PurchaseOrderHead' && (
            <PurchaseOrderHead
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              getTableData={getTableData}
            />
          )}
          {filterName === 'PurchaseInvoiceHead' && (
            <PurchaseInvoiceHead
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              getTableData={getTableData}
            />
          )}
          {filterName === 'PurchasePaymentHead' && (
            <PurchasePaymentHead
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              getTableData={getTableData}
            />
          )}
          {filterName === 'BalanceSheetHead' && (
            <BalanceSheetHead
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              getTableData={getTableData}
            />
          )}
          {filterName === 'SaleInvoiceHead' && (
            <SaleInvoiceHead
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              getTableData={getTableData}
            />
          )}
          {filterName === 'SaleOrderHead' && (
            <SaleOrderHead
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              getTableData={getTableData}
            />
          )}
          {filterName === 'SalePaymentHead' && (
            <SalePaymentHead
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              getTableData={getTableData}
            />
          )}
          {filterName === 'DepartmentFilterSearch' && (
            <DeparrtmentSearchFilter
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              searchData={handleFilterSearch}
            />
          )}
          {filterName === 'DesignationFilterSearch' && (
            <DesignationSearchFilter
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              searchData={handleFilterSearch}
            />
          )}
          {filterName === 'DesignationGradeFilterSearch' && (
            <DesignationGradeSearchFilter
              filterSearch={handleFilterSearch}
              filterData={handleFIlterOptions}
              searchData={handleFilterSearch}
              getTableData={getTableData}
            />
          )}
             {filterName === 'HrTabFilter' && (
            <HrFilter filterSearch={handleFilterSearch} filterData={handleFIlterOptions}  searchData={handleFilterSearch}  getTableData={getTableData}/>
          )}
 {filterName === 'TaxSectionFilter' && (
            <TaxSectionFilter filterSearch={handleFilterSearch} filterData={handleFIlterOptions}  searchData={handleFilterSearch} getTableData={getTableData} />
          )}

{filterName === 'AddRoleFilter' && (
            <AddRoleFilter filterSearch={handleFilterSearch} filterData={handleFIlterOptions}  searchData={handleFilterSearch} getTableData={getTableData} />
          )}
          {/* accounts  */}
          <Card>
            <TableContainer
              sx={{ position: 'relative', overflow: 'unset', padding: '0px !important' }}
            >
              <TableSelectedAction
                dense={table.dense}
                numSelected={table?.selected?.length}
                rowCount={tableData?.length}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    tableData?.map((row) => row.id)
                  )
                }
                action={
                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={confirm.onTrue}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Tooltip>
                }
              />

              <Scrollbar>
                <Table size={table.dense ? 'medium' : 'small'} sx={{ minWidth: 960 }}>
                  {TABLE_HEAD && (
                    <TableHeadCustom
                      order={table.order}
                      orderBy={table.orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={tableData?.length}
                      numSelected={table?.selected?.length}
                      onSort={handleSort}
                      onSelectAllRows={(checked) =>
                        table.onSelectAllRows(
                          checked,
                          tableData?.map((row) => row.id)
                        )
                      }
                      rowActions={rowActions || []}
                    />
                  )}

                  <TableBody>
                    {console.log(tableData)}
                    {tableData &&
                      tableData.length > 0 &&
                      tableData.map((row, index) => (
                        <>
                          <UserTableRow
                            key={row.id}
                            row={row}
                            // onHandleEditRow={(id) => 
                            //   {
                            //     if(handleEditRowParent)
                              
                            //   handleEditRowParent(id)
                            //   }
                            // }
                            onHandleEditRow={(row, clickedElementId) => {
                              
                              if (handleEditRowParent) {
                                handleEditRowParent(row)
                              }
                              else if (clickedElementId === 'reciept'){
                                handleButtonClick(row.reciept);
                                console.log(row, "iddd");
                              }
                              else if (clickedElementId === 'projectId') {
                                setIndex(index);
                                handleExpandClick(row.projectId, null, index)
                                // console.log(row, "iddd");
                              }
                              else if (clickedElementId==="employeeID"){
                                setIndex(index)
                                handleLoanExpand(row.employeeID,index)
                              }
                            }}
                            selected={table.selected.includes(row.id)}
                            onSelectRow={() => table.onSelectRow(row.id)}
                            onDeleteRow={() => handleDeleteRow(row.id)}
                            onEditRow={(event) => {
                              handleEditRow(row, event);
                            }}
                            headerContent={TABLE_HEAD}
                            rowActions={getRowActionsBasedOnStatus(row)}
                            SecondoryTable={(event)=>{SecondoryTable(row,event  )}}
                          />

{expandedRowId === index && (
                    <TableRow>
                      
                      <TableCell colSpan={TABLE_HEAD.length + 1}>
                      {/* <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" margin={1}> */}
                      {Object.entries(row).map(([day, details]) => (
            (day === "monday" || day === "tuesday" || day === "wednesday" || day === "thursday" || day === "friday" || day === "saturday" || day === "sunday"  ) && ( // Exclude status from the loop
            <Box key={day} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" margin={1}>
            <div>
              
              <Typography variant="h6" gutterBottom component="div">
                {day}
              </Typography>
              <Grid container flexDirection={row}  columnGap={8}>
              <Grid item >
              <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography sx={{ color: "#1B1B1B", marginRight: '10px' }}>
                         Hours:
                 </Typography>
                 <Typography >
                     {details?.hours}
                 </Typography>
              </Box>

              
              </Grid>
              <Grid item >
              <Typography>
                Task: {details?.task}
              </Typography>
              </Grid>
              <Grid item >
              <Typography>
                Comments: {details?.comments}
              </Typography>
              </Grid>
              </Grid>
            </div>
            {/* Add more fields as needed */}
          </Box>
            )
          ))}
           {/* </Box> */}
                      </TableCell>
                    </TableRow>
                  )}
   {expandedLoanRow === loanIndex && (
                    <TableRow>
                      <TableCell colSpan={TABLE_HEAD.length + 1}>
                     
                          <Typography>Loan {row?.loanID}</Typography>
                    
                      </TableCell>
                    </TableRow>
                  )}
                        </>
                      ))}
                    {console.log(rowActions, 'rowActionss')}
                    <TableNoData notFound={notFound} />
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>

           { filterName!=='a' && <TablePaginationCustom
              count={totalRecordsCount}
              // count={countValue}

              page={initialDefaultPayload?.page}
              rowsPerPage={initialDefaultPayload?.count}
              // rowsPerPage={25}
              onPageChange={onPageChangeHandeler}
              onRowsPerPageChange={onChangeRowsPerPageHandeler}
              // dense={table.dense}
              onChangeDense={table.onChangeDense}
            />}
            {/* <Grid container spacing={1} height="60px" sx={{alignItems:"center",alignSelf:"center"}}>
            <Grid item xs={1.5} >
              <Typography className={Style.textlightcolor} sx={{textAlign:"center", fontSize:"14px"}}>{tableData.length } Records</Typography>

            </Grid >
            <Grid xs={10.5} item container flex justifyContent="flex-end" style={{ marginLeft: 'auto' }} >
            <Pagination
            count={Math.ceil(tableData.length / pageSize)}
            // count={10}
            page={page}
            onChange={handleChange}
            shape="rounded"
            />

            </Grid>

            </Grid> */}
          </Card>
        </Container>
      )}
    </>
  );
};

function applyFilter({ inputData, comparator, filters }) {
  console.log(inputData, 'inputData checkingggggggggggg');
  const { name, status, role } = filters;
  var stabilizedThis;

  if (inputData) stabilizedThis = inputData?.map((el, index) => [el, index]);

  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis?.map((el) => el[0]);

  if (name) {
    inputData = inputData?.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData?.filter((user) => user?.status === status);
  }

  if (role.length) {
    inputData = inputData?.filter((user) => role?.includes(user.role));
  }

  return inputData;
}

BasicTable.propTypes = {
  endpoint: PropTypes.string,
};

BasicTable.propTypes = {
  onClickActions: PropTypes.any,
};

BasicTable.propTypes = {
  defaultPayload: PropTypes.object,
};
BasicTable.propTypes = {
  headerData: PropTypes.any,
};

BasicTable.propTypes = {
  bodyData: PropTypes.func,
};
BasicTable.propTypes = {
  SecondoryTable: PropTypes.func,
};
BasicTable.propTypes = {
  rowActions: PropTypes.func,
  handleOpenModal: PropTypes.func,
};
BasicTable.propTypes = {
  filterName: PropTypes.any,
};
// buttonFunction

BasicTable.propTypes = {
  buttonFunction: PropTypes.any,
};

BasicTable.propTypes = {
  deleteFunction: PropTypes.any,
  handleEditRowParent: PropTypes.any,
};

export { BasicTable };
