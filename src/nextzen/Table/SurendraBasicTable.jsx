import React from 'react';
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

// import CustomPopover, { usePopover } from 'src/components/custom-popover';

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

import Style from "../styles/Style.module.css";
import { baseUrl } from '../global/BaseUrl';

import Box from '@mui/material/Box';

 

 

import SearchFilter from '../filterSearch/FilterSearch';
import TimeSearchFilter from '../TimeSheetManagement/TimeFilter';
import ClaimSearchFilter from '../claims/ClaimSearchFilter';
import TimeSheetSearchFilter from '../timesheet/components/TimeSheetSearchFilter';

const defaultFilters = {

  name: '',

  role: [],

  status: 'all',

};

 

 

// ----------------------------------------------------------------------

 

const SurendraBasicTable = ({ endpoint,onclickActions, defaultPayload ,headerData, rowActions,bodyData,filterName,button,buttonFunction, filterContent,dialogPayload,count}) => {

  // const popover = usePopover();

 

 

  const [initialDefaultPayload, setInitialDefaultPayload] = useState(defaultPayload);

 console.log(initialDefaultPayload,"initialDefaultPayload====================")

//  console.log(actions,"actions==......")

//  console.log(onclickActions(),"onclickActions  function --->")

  const [newPage, setNewPage]=useState(initialDefaultPayload?.Page);

  console.log(initialDefaultPayload?.Page,"page value")

  // const countValue = initialDefaultPayload?.Count;

  // console.log(countValue,"initialDefaultPayload count value------")

const [filterHeaders, setFilterHeaders]=useState([])

  const pageSize = 1;

  const [page, setPage] = useState(1);

 

  const [totalRecordsCount, setTotalRecordsCount] = useState(0)

  // const defaultPayloaddata =defaultPayload;

  //   const endpointdata =endpoint;

  // const [TABLE_HEAD, setTABLE_HEAD] = useState();

 

   const TABLE_HEAD = headerData;

  // const[_userList, set_userList] = useState(bodydata);

  const [tableData, setTableData] = useState([]);

 
  // const [rowActions, setRowActions] = useState(actions);

  // console.log(endpointdata,"endpoint urlll")

  // console.log(defaultPayloaddata,"endpoint urlll")

 

 

  // const bodyData = 'appliedLeave';

 

  useEffect(() => {


    // onclickActions();

    getTableData(initialDefaultPayload);
    
  }, [initialDefaultPayload,count])

 

  const getTableData = (payload) => {

    let initialDefaultPayloadCopy =initialDefaultPayload;
    if(payload){
      initialDefaultPayloadCopy = payload;
    }
    // let initialDefaultPayloadCopy =initialDefaultPayload;
    // if(payload){
    //   initialDefaultPayloadCopy = payload;
    // }
    // if(actionType === 'pageChange'){
    //   initialDefaultPayloadCopy.Page = data;
    // }

    const config = {

      method: 'POST',

      maxBodyLength: Infinity,

      // url:`http://192.168.1.79:8080/appTest/GetMycompoffdetails`,
      // http://192.168.1.26:3001/erp/getAllClaims,
      // url: `http://192.168.1.199:3001/erp/${endpoint}`,
      url: baseUrl+`${endpoint}`,

      headers: {

        // 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE'

      },
      data:  initialDefaultPayload

    };

 

 

 

    axios.request(config).then((response) => {

      // // console.log(response?.data?.bodyContent);

      // setTableData(response?.data?.[bodyData]|| []);

      setTableData(response?.data[bodyData]|| []);

     

      setFilterHeaders(response?.data?.filterHeaders || []);

      setTotalRecordsCount(response?.data?.totalRecords || 0)

      console.log(response?.data?.data,"total no of records-->")

      
 

      // leave list api

      console.log("leave list api integration")

      console.log(response)

 

 

    })

 

      .catch((error) => {

 

        console.log(error);

 

      });

  }

 

 

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

  // const dataFiltered = applyFilter({

  //   inputData: tableData,

  //   // console.log(inputData,"inputData checkingggggggggggg"),

  //   comparator: getComparator(table?.order, table?.orderBy),

  //   filters,

  // });

 

  const denseHeight = table.dense ? 30 : 72;

 

  const canReset = !isEqual(defaultFilters, filters);

 

  const notFound = (!tableData?.length && canReset) || !tableData?.length;

 

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

    console.log(event)

  }
  const getRowActionsBasedOnStatus = (row) => {
    if (
      row?.status === 'pending' ||
      row?.status === '' ||
      row?.status === 'Pending' ||
      row?.status === 'Active' ||
      row?.status === 'InActive' ||
      row?.status === 'active' ||
      row?.status === 'Upcoming' ||
      row?.status === 'Ongoing'  ||
      row?.status === 'On Hold'  
    ) {
      return rowActions;
    } else if (!row?.status || row?.status === undefined) {
      return rowActions;
    } else {
      return null;
    }
  };

 

 

 

  const handleEditRow = (rowData,eventData) => {
    onclickActions(rowData,eventData)
   
    console.log(rowData, eventData)

    if (eventData?.type === "serviceCall"){

      console.log("servce call will called ")

    }

    else if (eventData?.type === "edit"){
   
      // buttonFunction();
      
      
      // eventData?.handleOpen()
      // if (eventData.function) {
      //   // Call the function
      //   eventData?.function();
      // }
 
      
      console.log("edit part will called for")

    }

    else{
      console.log(eventData,"eventData----")
      console.log("else part..")

    }

 

 

   

 

  }

 

  const handleFilterStatus = useCallback(

    (event, newValue) => {

      handleFilters('status', newValue);

    },

    [handleFilters]

  );

 

 

  const onPageChangeHandeler = (event, data) =>{

 

    const payload = initialDefaultPayload;

    payload.page = data;

    setInitialDefaultPayload(payload)
    getTableData(payload)

    // getTableData(payload)

 

   

   

  }

  // useEffect(()=>{
  //   getTableData(initialDefaultPayload);

  //    
  // },[initialDefaultPayload])
  const onChangeRowsPerPageHandeler = (event) => {

    console.log(event)

    const payload = initialDefaultPayload;

    payload.count = event.target.value;

    payload.page = 0;

    setInitialDefaultPayload(payload)
    getTableData(payload)
  }

 

  // Search functionality
  // const handleFilterSearch = (searchTerm) => {

  // console.log(searchTerm,"searched dataaaaaaaaaaa")


  //   const payload = initialDefaultPayload;

  //   setInitialDefaultPayload(prevPayload => ({

  //     ...prevPayload,

  //     search: searchTerm,

  //     // Filter_Headers:

     

  //   }));
  //   getTableData(payload)
  // }

  const [timer, setTimer] = useState(null);

  const handleFilterSearch = (searchTerm) => {
    console.log(searchTerm, "searched data");

    if (timer) {
      clearTimeout(timer); 
    }

    const newTimer = setTimeout(() => {
      const payload = initialDefaultPayload;
      setInitialDefaultPayload(prevPayload => ({
        ...prevPayload,
        search: searchTerm,
      }));
      getTableData(payload);
    }, 300); 

    setTimer(newTimer);
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

    console.log("newValue", newValue);

    setSelectedRange(newValue);

    // handleClose();

  };

 

  const isValidDate = (date) => date instanceof Date && !Number.isNaN(date);

 

  const displayValue = selectedRange && isValidDate(selectedRange[0]) && isValidDate(selectedRange[1])

    ? `${selectedRange[0].toLocaleDateString()} - ${selectedRange[1].toLocaleDateString()}`

    : '';

  


    // useEffect(()=>{
    //      getTableData(initialDefaultPayload)
    //      
    // },[initialDefaultPayload])


  const handleFilterOptions=(data)=>{
    
    console.log(data,"filtered data  from claim search")
    

    const payload = initialDefaultPayload;

    setInitialDefaultPayload(prevPayload => ({

      ...prevPayload,

      
      externalFilters:data
     
    }));
    
    getTableData(payload);
    console.log(payload,"after filter effected")
    

  }

  // sort 
 
  
const [sortColumn, setSortColumn]=useState("")


// useEffect(()=>{
//   getTableData(payload)
// },[sortColumn])


  const handleSort = (field,order) => {
  // console.log(order,"orderrrrrrrrrrrrr")
  // console.log(field,"for sorting .....")
  

  const payload = initialDefaultPayload;

    setSortColumn(field);
    setInitialDefaultPayload(prevPayload => ({

      ...prevPayload,

      sort: {
        key: order === "asc"? 1:0, 
        orderBy: sortColumn 
      }

      
    }));
    console.log(payload,field,"sortinglllllllllll")
    

  table.onSort(field); 
  getTableData(payload)
};




// file view and download
const handleButtonClick = (file) => {
  // Replace 'YOUR_SERVER_BASE_URL' and 'YOUR_FILE_PATH' with the actual server base URL and file path
  const serverBaseUrl = 'http://192.168.1.199:3001/erp';
  const filePath = file;

  // Encode the file path component
  const encodedFilePath = encodeURIComponent(filePath);

  // Construct the full file URL
  const fileUrl = `${serverBaseUrl}/servefile?filepath=${encodedFilePath}`;

  // Open the file URL in a new browser tab or window
  window.open(fileUrl, '_blank');
};

// table expanded
const [expandedRowId, setExpandedRowId] = useState(null);

const handleExpandClick = (rowId, update , rowIndex) => {
  console.log(expandedRowId,"klkl",rowId)
  setExpandedRowId(expandedRowId === rowIndex ? null :rowIndex );
};


const [index, setIndex]=useState(""); // index setting
{console.log(index,"indexindex",expandedRowId)}

// table expansion Icon code
const IconOpen =()=>{
  setOpen(!open)
}

  return (

    <>

     

     

      <Container className={Style.MuiContainerRoot} maxWidth={settings.themeStretch ? false : 'lg'}>
         
      {filterName === "claimSearchFilter" && <ClaimSearchFilter  filterData={handleFilterOptions} searchData={handleFilterSearch}  
     addButton={button}  buttonFunction={buttonFunction} 
     dialogConfig={filterContent} dialogPayload={dialogPayload}
  />}

{/* addButton={button}  buttonFunction={buttonFunction} 
      dialogConfig={filterContent}  */}

{/* {filterName === "claimSearchFilter" && <ClaimSearchFilter  filterData={handleFilterOptions} searchData={handleFilterSearch} />} */}
    
        <Card>

       

          <TableContainer   component={Paper} sx={{position:"sticky",top: 0, overflow: "unset", padding:'0px !important' ,  width: '100%', height:300, maxHeight:300, }}>

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
            {/* <div style={{ height: '200px', overflowY: 'auto' }}> */}
              <Table  stickyHeader={true} aria-label="sticky table" size={table.dense ? 'medium' : 'small'} sx={{ minWidth: 960,}} >

                {TABLE_HEAD && 
                <TableHeadCustom
                // component={Paper}
                // style={{ height: 400, width: '100%', position:"sticky",top: 0 }}
                
                
                  order={table.order}

                  orderBy={table.orderBy}

                  headLabel={TABLE_HEAD}

                  rowCount={tableData?.length}

                  numSelected={table?.selected?.length}

                  // onSort={table.onSort}

                  onSort={handleSort}

                  onSelectAllRows={(checked) =>

                    table.onSelectAllRows(

                      checked,

                      tableData?.map((row) => row.id)

                    )

                  }



                  rowActions={rowActions || []}

                />}

 

             

 

                  <TableBody>

                 

                         

       

                    {console.log(tableData)}

                    {tableData && tableData.length > 0 && tableData

                     

                      .map((row, index) => (

                        <>
                          <React.Fragment key={row.id}>

                        <UserTableRow

                          key={row.id}

                          row={row}

                          selected={table.selected.includes(row.id)}

                          onSelectRow={() => table.onSelectRow(row.id)}

                          onDeleteRow={() => handleDeleteRow(row.id)}

                          onEditRow={(event) => { handleEditRow(row, event) }}

                          headerContent={TABLE_HEAD}
                          onHandleEditRow={(row, clickedElementId) => {
                            if (clickedElementId === 'reciept') {
                              handleButtonClick(row.reciept);
                              console.log(row, "iddd");
                            }
                            else if (clickedElementId === 'claimType') {
                              setIndex(index);
                              handleExpandClick(row.expenseClaimId, null, index)
                              // console.log(row, "iddd");
                            }
                          }}

                          rowActions={getRowActionsBasedOnStatus(row)|| []}

                          // expandable
          // onExpandClick={() => handleExpandClick(index)}
          // isExpanded={expandedRowId === index}
           
                        />
{console.log(expandedRowId,row.id,row,"table expanded")}
                        
         {/* Expanded Row */}
         {expandedRowId === index && (
                    <TableRow>
                      
                      <TableCell colSpan={TABLE_HEAD.length + 1}>
                        <Box margin={1}>
                          <Typography variant="h6" gutterBottom component="div">
                            Expanded Content for :
                          </Typography>
                          {/* Add your expanded row content here */}
                          {/* For example, display additional information about the user */}
                          <Typography>
                            Employee ID: 
                          </Typography>
                          <Typography>
                            Department:
                          </Typography>
                          {/* Add more fields as needed */}
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
{/* {tableData.map((headCell) => (
      <TableCell key={headCell.id}>
        {row[headCell.id] || '-'}
      </TableCell>
    ))} */}

                        

                       

 
</React.Fragment>
 

                        </>

                      ))}
                    <TableNoData notFound={notFound} />
                  </TableBody>
              </Table>
            {/* </div> */}
            </Scrollbar>
          </TableContainer>
          <TablePaginationCustom
            count={totalRecordsCount}
            // count={countValue}
            page={initialDefaultPayload?.page}
            rowsPerPage={initialDefaultPayload?.count}
            // rowsPerPage={25}
            onPageChange={onPageChangeHandeler}
            onRowsPerPageChange={onChangeRowsPerPageHandeler}
          // dense={table.dense}
          onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>
    </>

  );

};

SurendraBasicTable.propTypes = {
  endpoint: PropTypes.string,
};
SurendraBasicTable.propTypes = {
  defaultPayload: PropTypes.object,
};
SurendraBasicTable.propTypes = {
  headerData: PropTypes.any,
};
SurendraBasicTable.propTypes = {
  bodyData: PropTypes.any,
};
SurendraBasicTable.propTypes = {
   rowActions: PropTypes.func
};
SurendraBasicTable.propTypes = {
  buttonFunction: PropTypes.func
};
SurendraBasicTable.propTypes = {
  filterContent: PropTypes.any
};
SurendraBasicTable.propTypes = {
  filterName: PropTypes.any
};
SurendraBasicTable.propTypes = {
  button: PropTypes.any
};
SurendraBasicTable.propTypes = {
  dialogPayload: PropTypes.any
};
SurendraBasicTable.propTypes = {
  onclickActions: PropTypes.any
};
// dialogPayload
// SurendraBasicTable.propTypes = {
//   searchFilterheader: PropTypes.any
// };
export { SurendraBasicTable };