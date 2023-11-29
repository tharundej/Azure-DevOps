import React, { useState, useEffect,useCallback } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { BasicTable } from 'src/nextzen/Table/BasicTable';
import {
  ApiHitDepartment,
  ApiHitDesgniation,
  ApiHitLocations,
  ApiHitManager,
  ApiHitRoles,
  ApiHitDesgniationGrade,
  ApiHitDepartmentWithoutLocation,
} from 'src/nextzen/global/roledropdowns/RoleDropDown';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import axios from 'axios';
import SnackBarComponent from 'src/nextzen/global/SnackBarComponent';
import RolePage from './RolePage';

const RoleAndResponsibility = () => {

  const [openRoleModal,setOpenRoleModal]=useState(false);
  const [type,setType]=useState("create")
  const [data,setData]=useState("")

  const handleModalClose=()=>{
    setOpenRoleModal(false);
  }

  const [userdropDownOptions, setUserDropDownOptions] = useState('');
  const [userdropDownvalue, setUserDropDownValue] = useState('');
  const [groupname, setGroupname] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snacbarMessage, setSnacbarMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const defaultPayload={
    "companyId": "COMP1"
}

const [TABLE_HEAD,setTableHead] =useState( [
  {
    id: 'mainHeading',
    label: 'Group Name',
    type: 'text',
    containesAvatar: true,
    minWidth:'180px',
    secondaryText: 'name',
  },
  { id: 'configurations', label: 'Configurations',  type: 'badge', minWidth:'180px' },
  { id: 'claims', label: 'Claims',  type: 'badge', minWidth:'180px' },
  { id: 'employeeManagement', label: 'Employee Management',  type: 'badge', minWidth:'180px' },
  { id: 'itDeclaration', label: 'IT Declaration',  type: 'badge', minWidth:'180px' },
  { id: 'leaveManagement', label: 'Leave Management',  type: 'badge', minWidth:'180px' },
  { id: 'monthlyAdditionalDeductions', label: 'MonthlyAdditional Deductions',  type: 'badge', minWidth:'180px' },

  { id: 'payroll', label: 'payroll',  type: 'badge', minWidth:'180px' },
  { id: 'shiftManagement', label: 'Shift Management',  type: 'badge', minWidth:'180px' },
  { id: 'timeSheetManagement', label: 'Time Sheet Management',  type: 'badge', minWidth:'180px' },
  
 
  
]);

const handleEditRowParent = (data)=>{
  console.log(data,'pdata')
  setData(data)

  setType("edit");setOpenRoleModal(true)
}
  // (id) => {
  //   console.log('called',paths.dashboard.employee.userview(id))
  //   router.push(paths.dashboard.employee.userview(id));
  // },
  // [router]
  


const actions = [

    
   
    
];
const [filterOptions,setFilterOptions]=useState({
  dates:[
    {
    display:'Joining Date',
    field_name:'joining_date'
  },
  {
    display:'Offer Date',
    field_name:'offer_date'
  }
],
dropdowns:[
  {
    display:'Status',
    options:["active","inactive"],
    field_name:'status'
  },
  {
    display:'Employement Type',
    options:["Permanent","Contract"],
    field_name:'employement_type'
  }
]
})







  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const department = await ApiHitDepartmentWithoutLocation();

        const arr = {
          departmentOptions: department,
        };
        setUserDropDownOptions(arr);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);
  const formatLabel = (label) => {
    // Convert camel case to space-separated with capitalization
    return label.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (str) => str.toUpperCase());
  };
  const [pageNames, setPageNames] = useState({});
  const [checkedState, setCheckedState] = useState({
   

    // Add more entries for other checkboxes as needed
  });

  const handleCheckboxChange = (group, key) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [group]: {
        ...prevState[group],
        [key]: !prevState[group][key],
      },
    }));
  };

  const handleMainHeadingChange = (group) => {
    setCheckedState((prevState) => ({
      ...prevState,
      [group]: {
        ...prevState[group],
        mainHeading: !prevState[group].mainHeading,
      },
    }));
  };

  const ApiHitSavePages = (obj) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/setGroups`,
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE',
        'Content-Type': 'application/json',
      },
      data: obj,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setGroupname('');
        setCheckedState("")
        handleCallSnackbar(response.data.message,"success")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSave = () => {
    const obj = {
      groupName: groupname,
      companyId: 'COMP1',
      pages: checkedState,
    };
    ApiHitSavePages(obj);
    console.log(checkedState);
    // You can perform other actions here based on the state
  };

  const APiHitGetList = () => {
    let data = '';

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/getAllPages`,
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE',
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setCheckedState(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    APiHitGetList();
  }, []);

  const handleCallSnackbar = (message, severity) => {
    console.log('handleCallSnackbar');
    setOpenSnackbar(true);
    setSnacbarMessage(message);
    setSeverity(severity);
  };
  const HandleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <SnackBarComponent
        open={openSnackbar}
        snacbarMessage={snacbarMessage}
        severity={severity}
        onHandleCloseSnackbar={HandleCloseSnackbar}
      />
      
      <Grid sx={{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-end',
        justifyContent:'flex-end'
      }}>
      <Button 
      onClick={()=>{setType("create");setOpenRoleModal(true)}}
      
      >
        Create View
      </Button>

      </Grid>
      <RolePage data={data} open={openRoleModal}  handleModalClose={handleModalClose} type={type} />

     
      

      <BasicTable headerData={TABLE_HEAD} endpoint="/getGroupMains"  defaultPayload={defaultPayload} filterOptions={filterOptions}

      rowActions={actions} filterName="a"  handleEditRowParent={handleEditRowParent}/>
    </div>
  );
};

export default RoleAndResponsibility;
