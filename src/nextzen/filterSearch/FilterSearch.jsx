import PropTypes from 'prop-types';

 

import { useState } from 'react';

 

import FormProvider,{ RHFSelect,RHFAutocomplete } from 'src/components/hook-form';

 

import {Card,TextField,InputAdornment,Autocomplete,Grid,Button} from '@mui/material';

 

import Iconify from 'src/components/iconify/iconify';

 

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

 

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

 

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

 

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

 

import dayjs from 'dayjs';

 

 

export default function SearchFilter({handleFilters,filterOptions}){

 

    const [filterData,SetFilterData] = useState([])

    const [dates, setDates] = useState({

        start_date: dayjs(new Date()),

        end_date: dayjs(new Date()),

      });

 

const [searchText,setSearchText] = useState('');

const handleOptions = () =>{

    if (searchText) {

        const newFilter = {'search' :searchText };

        SetFilterData([...filterData, newFilter]);

    }

    handleFilterCallback();

}

 

const handleFilterCallback=()=>{

    if(filterData.length>0){

        handleFilters(filterData)

    }

}

    return (

        <Grid container spacing={1} style={{margin:'1rem'}}>

 

<Grid item xs={12} sm={6} md={6} lg={3}>

         <TextField

         sx={{width:"200px"}}

            placeholder="Search..."

            onChange = {(e)=>setSearchText(e.target.value)}

            InputProps={{

              startAdornment: (

                <InputAdornment position="start">

                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />

                </InputAdornment>

              ),

              border:'none',

            }}

          />

        </Grid>

 

        <Grid item xs={12} sm={6} md={6} lg={3}>

<LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DatePicker

                     

                      placeholder="Start Date"

                    //   value={dates?.start_date}

                    //   defaultValue={dayjs(new Date())}

                      onChange={(newValue) => {

                        setDates((prev) => ({

                          ...prev,

                          start_date: newValue,

                        }));

                      }}

                    />

                </LocalizationProvider>

        </Grid>

   

        <Grid item xs={12} sm={6} md={6} lg={3}>

          <LocalizationProvider dateAdapter={AdapterDayjs}>

                    <DatePicker

                     

                      placeholder="End Date"

                    //   value={dates?.end_date}

                    //   defaultValue={dayjs(new Date())}

                      onChange={(newValue) => {

                        setDates((prev) => ({

                          ...prev,

                          end_date: newValue,

                        }));

                      }}

                    />

          </LocalizationProvider>

          </Grid>

        {filterOptions?.length <= 1?

        <Grid item xs={12} sm={6} md={6} lg={3} >

           <Autocomplete

              disablePortal

              id="combo-box-demo"

              options={filterOptions[0]?.options}

              sx={{zIndex: 9999}}

                renderInput={(params) => <TextField {...params} label={filterOptions[0]?.fieldName} sx={{width:"200px"}}/>}

            />

        </Grid>

        :

           <>

           {filterOptions?.map((item,index)=>(

           <Grid item xs={12} sm={6} md={6} lg={3} >

           <Autocomplete

              disablePortal

              id="combo-box-demo"

              options={filterOptions[index]?.options}

              sx={{zIndex: 9999}}

                renderInput={(params) => <TextField {...params} label={filterOptions[index]?.fieldName} sx={{width:"200px"}}/>}

            />

        </Grid>

           ))}

           </>}

 

         

          <Button onClick={handleOptions}>Apply</Button>

    </Grid>

    )

}

 

SearchFilter.propTypes={

    handleFilters: PropTypes.any,

}

 

SearchFilter.propTypes={

    filterOptions: PropTypes.arrayOf(

        PropTypes.shape({

          fieldName: PropTypes.string,

          options: PropTypes.arrayOf(PropTypes.string)

        })

      ),

}