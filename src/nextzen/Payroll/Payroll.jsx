import { useState, useEffect } from 'react';
import * as React from 'react';
import * as Yup from 'yup';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Iconify from 'src/components/iconify';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import { _userList } from 'src/_mock';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import ReusableTabs from '../tabs/ReusableTabs';
import SearchFilter from '../filterSearch/FilterSearch';
import PaySchedule from './payschedule/PaySchedule';
import Payrun from './Payrun/Payrun';
import CreatePayRun from './CreatePayRun/CreatePayRun';
import CalculateEarningsAndDeductions from './CalculateEarningsAndDeductions/CalculateEarningsAndDeductions';
import GeneralForminfo from './payschedule/GeneralForminfo';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

// export default function BasicCard() {
//   const TABLE_HEAD = [
//     { id: 'employeeType', label: 'Employee Type' },
//     { id: 'payscheduleType', label: 'Pay schedule Type', width: 60 },
//     { id: 'payType', label: 'Pay Type', width: 60 },
//     { id: 'leavetype', label: 'Leave Type', width: 90 },
//     { id: 'startdate', label: 'start Date', width: 90 },
//     { id: 'enddate',label:'End Date', width: 90 },
//     {id: 'requestedduration', label: 'Requested Duration', width: 80},
//     { id: 'status',label:'Status',width:80}
//   ];
//   const tabLabels = ['Tab 1', 'Tab 2', 'Tab 3'];
//   const tabContents = [
//     <div>Tab 1 Content</div>,
//     <div>Tab 2 Content</div>,
//     <div>Tab 3 Content</div>,
//   ];
//   return (
//     <Card sx={{ minWidth: 275 }}>
//       <CardContent>
//         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//           Pay Schedule

//         </Typography>
//         <BasicTable headdata={TABLE_HEAD} bodydata={_userList}/>
//       </CardContent>
//       </Card>
//   );
// }
export default function BasicCard(currentUser) {
  const [show, setShow] = useState(true);
  const [payRunView, setPayRunView] = useState(1);
  const handleCreatePayrun = (value) => {
    setShow(false);
    setPayRunView(value);
  };
  const [value, setValue1] = useState(0);

  const handleChange = (event, newValue, changeOfTab) => {
    setValue1(newValue);
    if (typeof changeOfTab === 'function') {
      changeOfTab(newValue);
    }
    setPayRunView(1);
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const changeOfTabHandeler = () => {
    setPayRunView(1);
  };
  useEffect(() => {
    console.log(' i am called in useEffect');
    setShow(true);
  }, [show]);
  const tabLabels = ['Pay Schedule', 'Pay Run', 'Pay Schedule History'];
  const tabContents = [
    <div>
      <PaySchedule />
    </div>,
    <div>
      {payRunView === 1 && <Payrun handleCreatePayrun={() => handleCreatePayrun(2)} />}
      {payRunView === 2 && <CreatePayRun moveToPageFunction={() => handleCreatePayrun(3)} />}
      {payRunView === 3 && <CalculateEarningsAndDeductions />}
      {/* <CreatePayRun/> */}
    </div>,
    <div>
      <CalculateEarningsAndDeductions />
    </div>,
  ];
  // --- filter
  const FilterValues = [
    {
      id: '1',

      fieldName: 'Gender',

      options: ['Male', 'Female'],
    },

    {
      id: '2',

      fieldName: 'Leave Type',

      options: ['Annual Leave', 'Sick Leave', 'Paid Leave', 'Casual Leave'],
    },
  ];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    height: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  // form related data

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    employee_type: Yup.string().required('Employee Type is Required'),
    payschedule_type: Yup.string().required('Payschedule Type is Required'),
    basic_pay: Yup.number().required('Basic Pay is Required'),
    hra: Yup.number().required('HRA is Required'),
    da: Yup.number().required('DA is Required'),
    employee_pf: Yup.number().required('Employee PF is Required'),
    employer_pf: Yup.number().required('Employer PF is Required'),
  });

  const defaultValues = React.useMemo(
    () => ({
      employee_type: currentUser?.employee_type || '',
      payschedule_type: currentUser?.payschedule_type || '',
      basic_pay: currentUser?.basic_pay || null,
      hra: currentUser?.hra || null,
      da: currentUser?.da || null,
      employee_pf: currentUser?.employee_pf || null,
      employer_pf: currentUser?.employer_pf || null,
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const payscheduleTypes = [{ type: 'Weekly' }, { type: 'Monthly' }];
  //   const m2 = useForm();
  const payTypes = [
    { type: 'CTC' },
    {
      type: 'CTCs                                                                                ',
    },
  ];
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.log('uyfgv');
  });
  const handleFilters = (data) => {
    console.log(data);
  };
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    // <ReusableTabs
    //   tabLabels={tabLabels}
    //   tabContents={tabContents}
    //   handleCreatePayrun={handleCreatePayrun}
    //   changeOfTab={changeOfTabHandeler}
    //   tabsSx={{ borderBottom:"3px solid #3b82f6 !important" }}
    // />
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="#3B82F6"
          indicatorColor="#3B82F6"
          aria-label="secondary tabs example"
        >
          <Tab label="Pay Schedule" {...a11yProps(0)} />
          <Tab label="Pay Run" {...a11yProps(1)} />
          <Tab label="Pay Schedule History" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <PaySchedule />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {payRunView === 1 && <Payrun handleCreatePayrun={() => handleCreatePayrun(2)} />}
        {payRunView === 2 && <CreatePayRun moveToPageFunction={() => handleCreatePayrun(3)} />}
        {payRunView === 3 && <CalculateEarningsAndDeductions />}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CalculateEarningsAndDeductions />
      </CustomTabPanel>
    </Box>
  );
}
BasicCard.prototype = {
  currentUser: PropTypes.object,
};
