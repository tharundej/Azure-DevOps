import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { _userList } from 'src/_mock';
import { useState, useEffect  ,useContext} from 'react';
import { Container } from '@mui/system';
import {  Alert,
  Autocomplete,
  
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField, } from '@mui/material';
import instance from 'src/api/BaseURL';
// import { BasicTable } from '../Table/BasicTable';
// import TimeForm from './TimeForm';
// import ReusableTabs from '../tabs/ReusableTabs';
// import './Time.css';
// import AddTimeProject from './AddTimeProject';



// import AddTimeProject from 'Frontend/src/nextzen/TimeSheetManagement/AddTimeProject';

import FormProvider from 'src/components/hook-form/form-provider';

import axios from 'axios';
import UserContext from 'src/nextzen/context/user/UserConext';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import AddDesignationGradeConfig from 'src/nextzen/configaration/roleconfiguration/AddDesignationGradeConfig';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function HrITTab() {
const baseUrl = " https://vshhg43l-3001.inc1.devtunnels.ms/erp"
  const {user}=useContext(UserContext)
  console.log(user ,"userDetails ")
  const empId = localStorage.getItem('employeeID')
  const cmpId= localStorage.getItem('companyID')
  const token = localStorage.getItem('accessToken')
  const TABLE_HEAD = [
  
 
    { id: 'employeeID', label: 'Employee Id ', width: 180, type: 'text' },


    { id: 'employeeName', label: 'Employee Name', width: 180, type: 'text' },
    
    { id: 'declaration', label: 'Declaration', width: 220, type: 'bool' },
    { id: 'rentDetails', label: 'Rent Details', width: 220, type: 'bool' },
    { id: 'licPremium', label: 'Lic Details', width: 220, type: 'bool' },
    { id: 'housingDetails', label: 'Housing Property', width: 220, type: 'bool' },
    { id: 'medicalDetails', label: 'Medical Insurance', width: 220, type: 'bool' },
    { id: 'status', label: 'Status', width: 220, type: 'bool' },
    // { id: '', width: 88 },
  ];

  const actions = [
    { name: 'View', icon: 'carbon:view', path: 'jjj' },

    // { name: 'Delete', icon: 'hh', path: 'jjj' },

   
  ];
    // State for Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const [itDetailsFromApi, setItDetailsFromApi] = useState(null);
  const [itDetails, setItDetails] = useState(null);
  const [editData, setEditData] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const [valueSelected, setValueSelected] = useState();
  const [openAddRoleConfig ,setOpenAddRoleConfig] = useState(false)
  const [open, setOpen] = useState(false);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const buttonFunction = (rowdata) => {
    setShowEdit(true);
    setEditData(rowdata);
    console.log(rowdata, 'rowdataaaaaaaaaaaaaa');
  };
  const onClickActions = (rowdata, event) => {
    if (event?.name === 'View') {
      setEditData(rowdata);
      setValueSelected(rowdata);
      handleOpenEdit();
      buttonFunction(rowdata, event);
    } else if (event?.name === 'Delete') {
      deleteFunction(rowdata, event);
    }
  };
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const [showForm, setShowForm] = useState(false);
  const handleClose = () => setShowForm(false);
  const handleTimeForm = () => {
    setShowForm(true);
    setOpenAddRoleConfig(true)
    console.log('🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:', showForm);
  };

  const handleCloseAddRoleDilog = () =>{
    setOpenAddRoleConfig(false)
    setShowForm(false);
  }

  const [tableData, SetTableData] = useState({});
  console.log('🚀 ~ file: TimeProject.jsx:113 ~ TimeProject ~ tableData:', tableData);

  const defaultPayload = 
  {
    count: 5,
    page: 0,
    search: "",
companyID: "COMP1",
    financialYear: "2023-2024",
     externalFilters: {
        fPDesignationName: "",
        fDepartmentName: ""
    }
}
  const handleSelectChange = (field, value ,e) => {
    // console.log('values:', value);
    // console.log('event', event.target.value);
    // setSelectedOption(value);
    console.log(field, value, 'valllllllllll');
    setValueSelected((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const onSubmit1 = (async (data) => {

    // data.locationID = formData?.Location?.locationID;
    console.log('submitted data111', data);

  });

  const updateDepartment = async (data) => {
    const payload = {
      departmentID: valueSelected?.departmentID,
      departmentName: valueSelected?.departmentName,
      designationName: valueSelected?.designationName,
      designationGradeName: valueSelected?.designationGradeName,
    
 
      designation_id:valueSelected?.designationID,
    
      designation_grade_id:valueSelected?.designationGradeID,
     
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      //    url: baseUrl + '/updateSingleDepartmentInfo ',
      url: baseUrl +'/updateSingleDepartmentInfo',
      headers: {
        Authorization:
      token ,  'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
             setSnackbarSeverity('success');
             setSnackbarMessage('Designation Added successfully!');
             setSnackbarOpen(true);
            //  setHitGetDepartment(!hitGetDepartment)
          console.log('success',response);
        }
      })
      .catch((error) => {
         setOpen(true);
         setSnackbarSeverity('error');
         setSnackbarMessage('Error Designation Adding . Please try again.');
         setSnackbarOpen(true);
        console.log(error);
      });
  
  };
  const getEmpItDetails = async (data) => {
    const payload = {
        employeeID:"INFO57",
        companyID:"COMP1",
        financialYear:"2023-2024",
     
    };
   
   
  
  
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      //    url: baseUrl + '/updateSingleDepartmentInfo ',
      url: baseUrl +'/getAllDeclarationDetails',
      headers: {
        Authorization:
      token ,  'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        console.log('successresponse1',response);
        setItDetailsFromApi(response?.data)
        if (response.status === 200) {
             setSnackbarSeverity('success');
             setSnackbarMessage('Designation Added successfully!');
             setSnackbarOpen(true);
            //  setHitGetDepartment(!hitGetDepartment)
          console.log('successresponse',response);
        }
        console.log('successresponse2',response);
      })
      .catch((error) => {
         setOpen(true);
         setSnackbarSeverity('error');
         setSnackbarMessage('Error Designation Adding . Please try again.');
         setSnackbarOpen(true);
        console.log(error);
      });
  
  };
  const handleOpen = () => setOpen(true);
 
  const handleCloseEdit = () => setOpenEdit(false);
  useEffect(()=>{
    getEmpItDetails()
  },[])
  useEffect(() => {
    const responseData = itDetailsFromApi;
    setItDetails(responseData);
  }, [itDetailsFromApi]); 
  
//   if (!itDetails) {
//     return <div>Loading...</div>; 
//   }

function camelCaseToSentence(camelCase) {
    // Add a space before all capital letters, then convert to lowercase
    return camelCase.replace(/([A-Z])/g, ' $1').toLowerCase();
  }
 
  return (
    <>
      {showForm && (
        <Dialog
          fullWidth
          maxWidth={false}
          open={showForm}
          onClose={handleClose}
          PaperProps={{
            sx: { maxWidth: 770, overflow: 'hidden' },
          }}
          style={{ overflow: 'hidden' }}
          className="custom-dialog"
        >
          <AddDesignationGradeConfig currentUser={{}} handleCloseAddRoleDilog={handleCloseAddRoleDilog} openAddRoleConfig={openAddRoleConfig} />
        </Dialog>
      )}
      <Dialog
        fullWidth
        maxWidth={false}
        open={openEdit}
        onClick={handleOpen}
        onClose={handleClose}
        // PaperProps={{
        //   sx: { maxWidth: 720 },
        // }}
      >
        {/* <FormProvider methods={methods1} onSubmit={onSubmit1}> */}
        <FormProvider >
          
          <ModalHeader  heading="IT Declaration "/>
          <DialogContent>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              marginTop={2}
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
                md: 'repeat(1, 1fr)', // Add this line for three items in a row
              }}
            >
     {/* <TextField
                label="Department "
                name="department"
                value={valueSelected?.departmentName ||  null}
                onChange={(e, newValue) =>
                  handleSelectChange('departmentName', newValue ,e || null)
                }
                variant="outlined"
                fullWidth
              />

              <TextField
                label="Designation"
                name="designation"
                value={valueSelected?.designationName || null}
                onChange={(e, newValue) =>
                  handleSelectChange('designationName', newValue  ,e|| null)
                }
                variant="outlined"
                fullWidth
              />
          
          <TextField
                label="Designation Grade"
                name="designationGrade"
                value={valueSelected?.designationGradeName || null}
                 onChange={(e, newValue) =>
                  handleSelectChange('designationGradeName', newValue , e|| null)
                }
                variant="outlined"
                fullWidth
              />
           */}

       
<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Declaration</Typography>
        </AccordionSummary>
        <AccordionDetails>
       
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Rend Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Lic Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
           <Typography>Housing Property Details</Typography>
  </AccordionSummary>
  <AccordionDetails>
    {/* {itDetails.housingPropertyDetails.map((property, index) => (
      <div key={index}>
        <Typography>{`Address: ${property.addressOfProperty}`}</Typography>
        <Typography>{`Loan Amount: ${property.amountOfHousingloanTakenFromTheProperty}`}</Typography>
       
      </div>
    ))} */}

{itDetails?.housingPropertyDetails[0] &&
  Object.entries(itDetails.housingPropertyDetails[0]).map(([key, value]) => (
    // Exclude 'documents' key
    key !== 'documents' && (
      <div key={key}>
        <Typography>{`${camelCaseToSentence(key)}: ${value}`}</Typography>
      </div>
    )
  ))
}

  </AccordionDetails>

      </Accordion>

      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Medical Insurance Permium Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
  
      
          <Button onClick={updateDepartment}>Approve</Button>
            </Box>
          </DialogContent>
 
          <DialogActions>
            <Button variant="outlined" onClick={handleCloseEdit}>
              Cancel
            </Button>
            {/* <Button
              type="submit"
              variant="contained"
              onClick={onSubmit1}
              // loading={isSubmitting1}
            >
              Save
            </Button> */}
          </DialogActions>
        </FormProvider>
      </Dialog>
   
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          marginBottom: '10px ',
        }}
      >
        {/* <div>Content Here</div> */}
        {/* <Button className="button" onClick={handleTimeForm}>
          Add Designation Grade
        </Button> */}
      </Container>
    
      <BasicTable
        headerData={TABLE_HEAD}
        defaultPayload={defaultPayload}
        endpoint="/ItDeclarationDetailsHr"
        bodyData="data"
        rowActions={actions}
        onClickActions={onClickActions}
        filterName="HrTabFilter"
      />
    </>
  );
}
