import PropTypes from 'prop-types';
import * as Yup from 'yup';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify/iconify';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// @mui
import dayjs from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import axios from 'axios';

import {ApiHitDepartment,ApiHitDesgniation,ApiHitLocations,ApiHitManager,ApiHitRoles,ApiHitDesgniationGrade,ApiHitDepartmentWithoutLocation} from 'src/nextzen/global/roledropdowns/RoleDropDown';
import { baseUrl } from 'src/nextzen/global/BaseUrl';

import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';

export default function SalaryStructureEdit({ editRowIds,openModalEdit,handleClose,optionsEdit,optionsValueEdit}) {
  // const handleClose=()=>setOpen(false)

  console.log(optionsEdit,optionsValueEdit,'optionsValueEdit')
  const [dropdownOptions,setDropDownOptions]=useState("");
  const [dropdownValues,setDropDownValue]=useState("")
  const [currentUser,setcurrentUser]=useState("")
  useEffect(()=>{
    if( openModalEdit){
      setDropDownValue((prevValue) => ({
        ...prevValue,
        departmentValue: optionsValueEdit?.departmentValue,
        desginationValue: optionsValueEdit?.desginationValue,
        desginationGradeValue: optionsValueEdit?.desginationGradeValue,
      }));
  
        setDropDownOptions(optionsEdit);
        
        setcurrentUser(editRowIds)
        console.log(optionsValueEdit,'optionsValueEditoptionsValueEdit')

    }

  },[openModalEdit])

  const [options,setOptions]=useState({})
  const [optionsValue,setOptionsValue]=useState({})
  const [open, setOpen] = useState(openModalEdit);
  useEffect(()=>{
    const fetchDepartment=async()=>{
      if(open){
        try{
        
          const obj={
            departmentOptions:await ApiHitDepartmentWithoutLocation(),
          }
          setOptions(obj)
          console.log(obj,'objjjjjj')
        }
        catch(error){
  
        }
       
      }
    }
    

    fetchDepartment();
    
  },[open])
 
   const handleOpen = () => setOpen(true);

  const NewUserSchema1 = Yup.object().shape({
    marketRate: Yup.number().required('Market Rate is Required'),
    minimum: Yup.number().required('Minimum is Required'),
    midpoint: Yup.number().required('Midpoint is Required'),
    maximum: Yup.number().required('Maximum is Required'),
  });


  const defaultValues1 = useMemo(
    () => ({
      marketRate: currentUser?.marketRate || null,
      minimum: currentUser?.minimum || null,
      midpoint: currentUser?.midpoint || null,
      maximum: currentUser?.maximum || null,
    }),
    [currentUser]
  );

  const methods1 = useForm({
    resolver: yupResolver(NewUserSchema1),
    defaultValues: defaultValues1, // Use defaultValues instead of defaultValues1
  });


  const {
    setValue:setValue1,
    handleSubmit: handleSubmit1,
    formState: { isSubmitting: isSubmitting1 },
    reset: reset1,
  } = methods1;



  //   const values = watch();

  const ApiHit=(data)=>{
    console.log(data,'ApiHitdata')
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/addSalaryStructure`,
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };
     
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
     
  }

  const onSubmit1 = async () => {
    console.log(optionsValue,currentUser,'optionsValue')
    const obj={...currentUser}
    obj.departmentID=optionsValue?.departmentValue?.departmentID || "";
    obj.designationID=optionsValue?.desginationValue?.designationID || "";
    obj.designationGradeID=optionsValue?.desginationGradeValue?.designationGradeID || "";
    obj.companyID= "JSON.parse(localStorage.getItem('userDetails'))?.companyID,";
    ApiHit(obj)

  };




 
  return (
    <>
     
      <Dialog
        fullWidth
        maxWidth={false}
        open={ openModalEdit }
        onClose={handleClose}
        PaperProps={{
          sx: { maxWidth: 720 },
        }}

      >  
          <FormProvider methods={methods1} onSubmit={onSubmit1}>
           
            <ModalHeader heading="Edit Salary Structure" />
            <DialogContent>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                marginTop={2}
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >

                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                    type="number"
                    name="marketRate"
                    label="Market Rate"
                    variant="outlined"
                    id="motherName"
                    value={currentUser?.marketRate}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        marketRate:parseInt(e?.target.value,10)
                      }))
                    }}
                  />
                  </Grid>
                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                    type="number"
                    name="minimum"
                    label="Minimum"
                    variant="outlined"
                    id="minimum"
                    value={currentUser?.minimum}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        minimum:parseInt(e?.target.value,10)
                      }))
                    }}
                  />
                  </Grid>
                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                
                    name="midpoint"
                    label="Mid Point"
                    type="number"
                    variant="outlined"
                    id="midpoint"
                    value={currentUser?.midpoint}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        midpoint:parseInt(e?.target.value,10)
                      }))
                    }}
                  />
                  </Grid>
                  <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                    type="number"
                    name="maximum"
                    label="Maximum"
                    variant="outlined"
                    id="maximum"
                    value={currentUser?.maximum}
                    onChange={(e) => {
                      
                      setcurrentUser(prev=>({
                        ...prev,
                        maximum:parseInt(e?.target.value,10)
                      }))
                    }}
                  />
                  </Grid>

                  <Grid container >
              
              <Grid item xs={12} md={6}>
              {console.log(dropdownValues,'ploooo')}
                <Autocomplete
                  disablePortal
                  id="departmentOptions"
                  options={dropdownOptions?.departmentOptions || []}
                  value={dropdownValues?.departmentValue}
                  getOptionLabel={(option) => option?.departmentName}
                  onChange={async(e, newvalue) => {
                  
                    var newArr = { ...dropdownValues };
                      newArr.departmentValue=newvalue
                    newArr.designationValue=undefined;
                    newArr.designationGradeValue=undefined;

                    
                    console.log(newArr,'newArr')
                   
                    try{
                      const deptObj={
                        companyID:JSON.parse(localStorage.getItem('userDetails'))?.companyID,
                        departmentID:newvalue?.departmentID
                      }
                      const desgination=await ApiHitDesgniation(deptObj);
                      var optionsArr={...dropdownOptions};
                     
                      optionsArr.desginationGradeOptions=[];
                      optionsArr.desginationOptions=desgination;
                     
                      setDropDownOptions(optionsArr)

                    }
                    catch(error){
                      
                    }

                   
                    
                    setDropDownValue(newArr)
                   }
                  
                }

                 
                  
                  renderInput={(params) => <TextField {...params} label="Department"
                  style={{ paddingLeft: '16px', width: '100%' }} />}
                />
              </Grid>
                  </Grid>

                      <Grid container >
                    <Grid item xs={12} md={6}>
                    
                      <Autocomplete
                        disablePortal
                        id="Desgination"
                        options={dropdownOptions?.desginationOptions  || []}
                        value={dropdownValues?.desginationValue}
                        getOptionLabel={(option) => option.designationName}
                        onChange={async(e, newvalue) => {
                        
                          var newArr = { ...dropdownValues };
                          newArr.desginationValue=newvalue;
                        
                          newArr.desginationGradeValue=undefined
                          
                          console.log(newArr)
                        
                          try{
                            const desgGradeObj={
                              companyID:JSON.parse(localStorage.getItem('userDetails'))?.companyID,
                              designationID:newvalue?.designationID
                            }
                            const desginationGrade=await ApiHitDesgniationGrade(desgGradeObj);
                            var optionsArr={...dropdownOptions};
                            optionsArr.desginationGradeOptions=desginationGrade;
                            
                            
                          
                            setDropDownOptions(optionsArr)

                          }
                          catch(error){
                            
                          }

                        
                          
                          setDropDownValue(newArr)
                        }}
                        renderInput={(params) => <TextField {...params} label="Desgination"
                        style={{ paddingLeft: '16px', width: '100%' }} />}
                      />
                    </Grid>
                      </Grid>

                  <Grid container >
                    <Grid item xs={12} md={6}>
                    
                      <Autocomplete
                        disablePortal
                        id="DesginationGrade"
                        options={dropdownOptions?.desginationGradeOptions  || []}
                        value={dropdownValues?.desginationGradeValue}
                        getOptionLabel={(option) => option.designationGradeName}

                        onChange={async(e, newvalue) => {
                        
                          var newArr = { ...dropdownValues };
                          newArr.desginationGradeValue=newvalue;
                        
                        
                          
                        

                        console.log(newArr,'newArr')
                          
                          setDropDownValue(newArr)
                        }}
                        renderInput={(params) => <TextField {...params} label="Desgination Grade"
                        style={{ paddingLeft: '16px', width: '100%' }} />}
                      />
                    </Grid>
                  </Grid>
               
              </Box>
            </DialogContent>

            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button
               
                variant="contained"
                onClick={onSubmit1}
               
              >
                Save
              </Button>
            </DialogActions>
          </FormProvider>
        )}
      </Dialog>
    </>
  );
}

SalaryStructureEdit.propTypes = {
  currentUser: PropTypes.object,
  openmodal:PropTypes.bool,
  type:PropTypes.string,
  handleClose:PropTypes.func,
  optionsEdit: PropTypes.object,
  optionsValueEdit:PropTypes.object,
  editRowIds:PropTypes.object,
};