import React, { useState ,useEffect} from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {Autocomplete,Grid,TextField } from '@mui/material'
import {ApiHitDepartment,ApiHitDesgniation,ApiHitLocations,ApiHitManager,ApiHitRoles,ApiHitDesgniationGrade,ApiHitDepartmentWithoutLocation} from 'src/nextzen/global/roledropdowns/RoleDropDown';


const RoleAndResponsibility = () => {
    const [userdropDownOptions,setUserDropDownOptions]=useState('')
    const [userdropDownvalue ,setUserDropDownValue]=useState("")
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

  const handleSave = () => {
    console.log(checkedState);
    // You can perform other actions here based on the state
  };

  return (
    <div>
      <h2>Role and Responsibility-- under constrution...</h2>
      <Grid container marginTop="10px" spacing={2}>
                <Grid item xs={12} md={3} lg={4}  >
                {/* {console.log(typeof userdropDownOptions?.departmentOptions,userdropDownOptions,'ppppp')} */}
                  <Autocomplete
                    disablePortal
                    id="departmentName"
                    options={userdropDownOptions?.departmentOptions || []}

                    value={userdropDownvalue?.departmentValue}

                    getOptionLabel={(option) => option.departmentName}
                    onChange={async(e, newvalue) => {
                    
                      var newArr = { ...userdropDownvalue };
                      newArr.departmentValue=newvalue;
                      newArr.desginationValue=undefined;
                      newArr.desginationGradeValue=undefined
                      
                      console.log(newArr)
                     
                      try{
                        const desgObj={
                          companyID:'COMP1',
                          departmentID:newvalue?.departmentID
                        }
                        const desgination=await ApiHitDesgniation(desgObj);
                        var optionsArr={...userdropDownOptions};
                        optionsArr.desginationOptions=desgination;
                        optionsArr.desginationGradeOptions=[];
                        
                        setUserDropDownOptions(optionsArr)
                      }
                      catch(error){                    
                      }
                     setUserDropDownValue(newArr)
                    }}
                    renderInput={(params) => <TextField {...params} label="Department"
                    style={{  width: '100%' }} />}
                  />
                </Grid>

                <Grid item xs={12} md={3} lg={4}  >
                 
                  <Autocomplete
                    disablePortal
                    id="Desgination"
                    options={userdropDownOptions?.desginationOptions  || []}
                    value={userdropDownvalue?.desginationValue}
                    getOptionLabel={(option) => option.designationName}
                    onChange={async(e, newvalue) => {
                    
                      var newArr = { ...userdropDownvalue };
                      newArr.desginationValue=newvalue;
                    
                      newArr.desginationGradeValue=undefined
                      
                      console.log(newArr)
                     
                      try{
                        const desgGradeObj={
                         
                          desginationID:newvalue?.designationID
                        }
                        const desdesginationGradegination=await ApiHitDesgniationGrade(desgGradeObj);
                        var optionsArr={...userdropDownOptions};
                        optionsArr.desginationGradeOptions=desdesginationGradegination;
                        
                        
                       
                        setUserDropDownOptions(optionsArr)

                      }
                      catch(error){
                        
                      }

                     
                      
                      setUserDropDownValue(newArr)
                    }}
                    renderInput={(params) => <TextField {...params} label="Desgination"
                    style={{  width: '100%' }} />}
                  />
                </Grid>

                <Grid item xs={12} md={3} lg={4}  >
                
                  <Autocomplete
                    disablePortal
                    id="DesginationGrade"
                    options={userdropDownOptions?.desginationGradeOptions  || []}
                    value={userdropDownvalue?.desginationGradeValue}
                    getOptionLabel={(option) => option.designationGradeName}

                    onChange={async(e, newvalue) => {
                    
                      var newArr = { ...userdropDownvalue };
                      newArr.desginationGradeValue=newvalue;
                    
                    
                      
                    

                     
                      
                      setUserDropDownValue(newArr)
                    }}
                    renderInput={(params) => <TextField {...params} label="DesginationGrade"
                    style={{ width: '100%' }} />}
                  />
                </Grid>


            </Grid>
      <FormGroup>
        {Object.entries(checkedState).map(([group, values], index) => (
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
