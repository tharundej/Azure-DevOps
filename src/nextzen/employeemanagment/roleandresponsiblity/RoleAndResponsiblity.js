import React, { useState ,useEffect} from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {Autocomplete,Grid,TextField } from '@mui/material'
import {ApiHitDepartment,ApiHitDesgniation,ApiHitLocations,ApiHitManager,ApiHitRoles,ApiHitDesgniationGrade,ApiHitDepartmentWithoutLocation} from 'src/nextzen/global/roledropdowns/RoleDropDown';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import axios from 'axios';


const RoleAndResponsibility = () => {
    const [userdropDownOptions,setUserDropDownOptions]=useState('')
    const [userdropDownvalue ,setUserDropDownValue]=useState("")
    const[groupname,setGroupname]=useState("")
    useEffect(() => {
     
        const fetchLocations = async () => {
         
          try {
            const department = await ApiHitDepartmentWithoutLocation();
            
    
            const arr={
                departmentOptions:department,
             
              
    
    
            }
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
      const [pageNames,setPageNames]=useState({})
  const [checkedState, setCheckedState] = useState({
    employeeManagement: {
      mainHeading: false,
      employeesTable: false,
      statoury: false,
      salaryStructure:false,
      roles:false
    },
    leaveManagement: {
      mainHeading: false,
      approveLeave: false,
      leaveCalendar: false,
    },
   
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

  const ApiHitSavePages=(obj)=>{
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/setGroups`,
      headers: { 
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
        'Content-Type': 'application/json'
      },
      data : obj
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const handleSave = () => {
    const obj={
      groupName:groupname,
      companyId:'COMP1',
      pages:checkedState
    }
    ApiHitSavePages(obj)
    console.log(checkedState);
    // You can perform other actions here based on the state
  };

const APiHitGetList=()=>{
  let data = '';

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: `${baseUrl}/getAllPages`,
  headers: { 
    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  setCheckedState(response.data.data)
})
.catch((error) => {
  console.log(error);
});
}
  useEffect(()=>{
    APiHitGetList()
  },[])

  return (
    <div>
      <h2>Role and Responsibility- under constrution...</h2>
      <Grid container marginTop="10px" spacing={2}>
                <Grid item xs={12} md={3} lg={4}  >
                {/* {console.log(typeof userdropDownOptions?.departmentOptions,userdropDownOptions,'ppppp')} */}
                  <TextField
                  label="Group Name"
                  id="groupname"
                  value={groupname}
                  onChange={(e)=>{
                      setGroupname(e?.target?.value)
                  }} >

                  </TextField>
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
    </div>
  );
};

export default RoleAndResponsibility;
