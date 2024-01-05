import { styled } from '@mui/system';
// import { Button, Dialog, Grid,, Stack } from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useTheme } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import {formatDateToYYYYMMDD,formatDate} from 'src/nextzen/global/GetDateFormat';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CreateVendor from './CreateVendor';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {
  TextField,
  Grid,
  Button,
  MenuItem,
  Stack,
  Badge,
  DialogContent,
  Dialog,
  DialogTitle,
  Typography,
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const VendorHead = ({ filterSearch, filterData, getTableData }) => {
  const router = useRouter();
  const [leaveType, SetLeaveType] = useState();
  const theme = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [datesData,setDatesData]=useState([])
  const [badgeContent, setBadgeContent] = useState(false);
  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  const [dates, setDates] = useState({
    applyDatefrom: '',
    applyDateto: '',
    fromDatefrom: '',
    fromDateto: '',
    toDatefrom: '',
    toDateto: '',
    status: '', // Add default value for "status"
  });
  const [dropdown, setDropdown] = useState({});
  const [dropdownLeaveType, setDropdownLeaveType] = useState([]);
  const [dropdownstatus, setDropdownStatus] = useState([]);
  const [datesFiledArray, setDatesFiledArray] = useState([
    {
      field: 'onboardingDate',
      startDate: 'applyDatefrom',
      endDate: 'applyDateto',
    },
    {
      field: 'offboardingDate',
      startDate: 'fromDatefrom',
      endDate: 'fromDateto',
    },
  ]);
  const [dropdownFiledArray, setDropdownFiledArray] = useState([
    {
      field: 'status',
      options: [],
    },
  ]);
  function formDateDataStructure(){
    return new Promise((resolve) => {
     
      const arr1={};
       datesFiledArray.forEach((item,index)=>{  
         
        arr1[item.field]={
          startDate:dates[item?.startDate],
          endDate:dates[item?.endDate]
        }
         
        })
        setDatesData(arr1);
        console.log(arr1.length,"arrr",arr1)
        resolve(arr1)
        
    })
    
  }
  const handleCancel = async () => {
    setDropdownStatus([]);
    setDates({
      applyDatefrom: '',
      applyDateto: '',
      fromDatefrom: '',
      fromDateto: '',
      toDatefrom: '',
      toDateto: '',
      status: '',
    });
    setBadgeContent(false);
    setOpen(false);
  };
  function formWithDropdown(data){
    return new Promise((resolve) => {
     
      const arr1 = {
        status: "",
        leave_type_name: "",
      };
  
       dropdownFiledArray.forEach((item,index)=>{  
         
        if(dropdown[item.field]?.length>0){
          const arrayOfStrings = dropdown[item.field];
          const commaSeparatedString = arrayOfStrings.join(',');
          data[item.field]=commaSeparatedString;
        }
         
        })
        arr1.status = data.status;
        arr1.leave_type_name = data.leave_type_name;
        resolve(arr1)
        
    })
    
  }
  const handleApply = async () => {
     setDatesData([]);
    setBadgeContent(true);
    const data = await formDateDataStructure();
    const data1=await formWithDropdown(data);
    filterData(data);
    setOpen(false);
  };

  const handleSearch = (e) => {
    filterSearch(e?.target?.value);
  };

  const handleTimeForm = () => {
    setShowForm(true);
    console.log('🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:', showForm);
  };
  const handleClose = () => {
    setShowForm(false);
  };
  const handleChangeDropDown = (event,field) => {
    const {
      target: { value },
    } = event;
     if(field==="status"){
      setDropdownStatus(value)
      const obj=dropdown;
      obj[field]=value;
      setDropdown(obj);
    }
  };
  return (
    <>
      {showForm && (
        <Dialog
          fullWidth
          maxWidth={false}
          open={showForm}
          onClose={handleClose}
          PaperProps={{
            sx: { maxWidth: 1200 },
          }}
          className="custom-dialog"
        >
          <CreateVendor currentData={{}} handleClose={handleClose} getTableData={getTableData} />
        </Dialog>
      )}
      {/* <Grid container alignItems="center" paddingBottom="10px">
        <Grid md={4} xs={4} item>

        </Grid>
        <Grid md={4} xs={4} item>
          <TextField
            placeholder="Search...."
            fullWidth
            onChange={(e) => {
              handleSearch(e);
            }}
          />
        </Grid>
        <Grid md={4} xs={4} item>
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Grid item>
              <Button
                variant="outlined"
                startIcon={<Iconify icon="formkit:downloadcloud" />}
                sx={{ margin: '20px' }}
              >
                Export
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleTimeForm}
                startIcon={<Iconify icon="mingcute:add-line" />}
                sx={{ margin: '20px' }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
      <Grid container alignItems="center" marginBottom="10px" marginTop="20px">
        <Grid md={8} xs={12} lg={8} item>
          <TextField
            placeholder="Search...."
            fullWidth
            onChange={(e) => {
              handleSearch(e);
            }}
            size="small"
          />
        </Grid>

        <Grid md={4} xs={12} lg={4} item>
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Grid item>
              <Button
                variant="contained"
                onClick={handleTimeForm}
                startIcon={<Iconify icon="mingcute:add-line" />}
                sx={{ color: 'white', backgroundColor: '#3B82F6' }}
              >
                Add Vendor
              </Button>
            </Grid>
            <Grid md={4} xs={4} item>
              <Stack sx={{ display: 'flex', alignItems: 'flex-end' }}>
                {badgeContent === true ? (
                  <Badge
                    badgeContent={''}
                    color="success"
                    variant="dot"
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <Button onClick={handleClickOpen} style={{ width: '80px' }}>
                      <Iconify icon="mi:filter" />
                      Filters
                    </Button>
                  </Badge>
                ) : (
                  <Button onClick={handleClickOpen} style={{ width: '80px' }}>
                    <Iconify icon="mi:filter" />
                    Filters
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        onClose={handleClickClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          sx: { maxWidth: 500 },
        }}
      >
        <DialogTitle sx={{ paddingBottom: 0, paddingTop: 2 }}>
          Filters
          <CancelOutlinedIcon sx={{ cursor: 'pointer', float: 'right' }} onClick={handleCancel} />
        </DialogTitle>
        <DialogContent sx={{ mt: 0, paddingBottom: 0, marginTop: 2 }}>
          <Grid container>
            <Grid container flexDirection="row">
              <Typography>Onboarding Date</Typography>
              <Grid container flexDirection="row">
                <Grid item md={6} xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        sx={{ width: '100%', paddingLeft: '3px' }}
                        label="From Date"
                        value={dates?.applyDatefrom ? dayjs(dates.applyDatefrom) : null}
                        defaultValue={dayjs(new Date())}
                        onChange={(newValue) => {
                          setDates((prev) => ({
                            ...prev,
                            applyDatefrom: newValue ? formatDateToYYYYMMDD(newValue) : '',
                          }));
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item md={6} xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        sx={{ width: '100%', paddingLeft: '3px' }}
                        label="To Date"
                        value={dates?.applyDateto ? dayjs(dates.applyDateto) : null}
                        defaultValue={dayjs(new Date())}
                        onChange={(newValue) => {
                          setDates((prev) => ({
                            ...prev,
                            applyDateto: newValue ? formatDateToYYYYMMDD(newValue) : '',
                          }));
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>
            <Grid container flexDirection="row" sx={{ marginTop: 2 }}>
              <Typography>Off boarding Date</Typography>
              <Grid container flexDirection="row">
                <Grid item md={6} xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        sx={{ width: '100%', paddingLeft: '3px' }}
                        label="From Date"
                        value={dates?.fromDatefrom ? dayjs(dates.fromDatefrom) : null}
                        defaultValue={dayjs(new Date())}
                        onChange={(newValue) => {
                          setDates((prev) => ({
                            ...prev,
                            fromDatefrom: newValue ? formatDateToYYYYMMDD(newValue) : '',
                          }));
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item md={6} xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        sx={{ width: '100%', paddingLeft: '3px' }}
                        label="To Date"
                        value={dates?.fromDateto ? dayjs(dates.fromDateto) : null}
                        defaultValue={dayjs(new Date())}
                        onChange={(newValue) => {
                          setDates((prev) => ({
                            ...prev,
                            fromDateto: newValue ? formatDateToYYYYMMDD(newValue) : '',
                          }));
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>
            <Grid container flexDirection="row" spacing={1}>
              <Grid item marginTop="10px" xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel fullWidth id="status">
                    status
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-multiple-name-status_1"
                    id="demo-multiple-status_1"
                    multiple
                    value={dropdownstatus}
                    onChange={(e) => handleChangeDropDown(e, 'status')}
                    input={<OutlinedInput label="status" />}
                    MenuProps={MenuProps}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="In Active">In Active</MenuItem>
                    {/* <MenuItem value="rejected">Rejected</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <div style={{ marginBottom: 12, marginTop: 4 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ float: 'right', marginRight: 2 }}
            onClick={() => {
              handleApply();
            }}
          >
            Apply
          </Button>
          <Button
            sx={{ float: 'right', right: 15 }}
            variant="outlined"
            onClick={() => {
              handleCancel();
            }}
          >
            Reset
          </Button>
        </div>
      </Dialog>
    </>
  );
};

VendorHead.propTypes = {
  filterSearch: PropTypes.func, // A function to handle search filtering.
  filterData: PropTypes.any, // The data to be filtered (modify 'any' with the actual data type if known).
};

export default VendorHead;
