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

const RoleAndResponsibility = () => {
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
    label: 'Main Heading',
    type: 'text',
    containesAvatar: true,
    minWidth:'180px',
    secondaryText: 'name',
  },
  { id: 'configurations', label: 'Configurations',  type: 'badge', minWidth:'180px' },
  { id: 'claims', label: 'Claims',  type: 'text', minWidth:'180px' },
  { id: 'employeeManagement', label: 'Employee Management',  type: 'badge', minWidth:'180px' },
  { id: 'itDeclaration', label: 'IT Declaration',  type: 'text', minWidth:'180px' },
  { id: 'leaveManagement', label: 'Leave Management',  type: 'text', minWidth:'180px' },
  { id: 'monthlyAdditionalDeductions', label: 'MonthlyAdditional Deductions',  type: 'text', minWidth:'180px' },

  { id: 'payroll', label: 'payroll',  type: 'text', minWidth:'180px' },
  { id: 'shiftManagement', label: 'Shift Management',  type: 'text', minWidth:'180px' },
  { id: 'timeSheetManagement', label: 'Time Sheet Management',  type: 'text', minWidth:'180px' },
  
 
  
]);

const handleEditRowParent = useCallback(
  // (id) => {
  //   console.log('called',paths.dashboard.employee.userview(id))
  //   router.push(paths.dashboard.employee.userview(id));
  // },
  // [router]
  
);

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

      <h2>Role and Responsibility- under constrution...</h2>
      <Grid container marginTop="10px" spacing={2}>
        <Grid item xs={12} md={3} lg={4}>
          {/* {console.log(typeof userdropDownOptions?.departmentOptions,userdropDownOptions,'ppppp')} */}
          <TextField
            label="Group Name"
            id="groupname"
            value={groupname}
            onChange={(e) => {
              setGroupname(e?.target?.value);
            }}
          ></TextField>
        </Grid>
      </Grid>
      <FormGroup>
        {checkedState &&
          Object.entries(checkedState).map(([group, values], index) => (
            <Box key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    id={`main-heading-${group}`}
                    checked={values.mainHeading}
                    onChange={() => handleMainHeadingChange(group)}
                    style={{ color: '#3B82F6' }}
                  />
                }
                label={`${formatLabel(group)}`}
              />
              {values.mainHeading &&
                Object.keys(values).map((key) =>
                  key !== 'mainHeading' ? (
                    <FormControlLabel
                      key={key}
                      control={
                        <Checkbox
                          id={`checkbox-${group}-${key}`}
                          checked={values[key]}
                          onChange={() => handleCheckboxChange(group, key)}
                        />
                      }
                      label={`${formatLabel(key)}`}
                    />
                  ) : null
                )}
            </Box>
          ))}
      </FormGroup>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>

      <BasicTable headerData={TABLE_HEAD} endpoint="/getGroupMains"  defaultPayload={defaultPayload} filterOptions={filterOptions}

      rowActions={actions} filterName=""  handleEditRowParent={handleEditRowParent}/>
    </div>
  );
};

export default RoleAndResponsibility;
