import PropTypes from 'prop-types';

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  TextField,
  Button,
  Card,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Autocomplete,
  Chip,
} from '@mui/material';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PhotoCamera from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/system';

export default function PreviousWorkDetails({ currentUser }) {
  const [value, setValue] = React.useState(dayjs(new Date()));
  const [defaultValues, setDefaultValues] = useState([
    {
      previous_company: '',
      desgination: '',
      from: dayjs(new Date()),
      to: dayjs(new Date()),
      employement_type: '',
      primary_skills: [],
      releving_letter: '',
    },
  ]);

  const obj = {
    previuos_company: '',
    desgination: '',
    from: dayjs(new Date()),
    to: dayjs(new Date()),
    employement_type: '',
    primary_skills: [],
    releving_letter: '',
  };
  function formatDateToYYYYMMDD(newValue) {
    const date = new Date(newValue.$d);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}/${month}/${day}`;
  }

  const handleAdd = () => {
    setDefaultValues((prev) => [...prev, obj]);
  };
  const handleChange = (e, index, field) => {
    const newObj = defaultValues;
    newObj[index][field] = e?.target?.value || '';

    setDefaultValues(newObj);
  };

  const handleChangeDate = (newValue, index, name) => {
    const newObj = defaultValues;
    newObj[index][name] = new Date(newValue);
    setDefaultValues(newObj);
  };

  const handleSubmit = () => {
    console.log(defaultValues);
  };
  const handleChangeMultiple = (event, values, index, name) => {
    const newObj = defaultValues;
    newObj[index][name] = values;
    setDefaultValues(newObj);
  };
  return (
    <Stack>
      <form style={{ padding: '40px' }}>
        <>
          {defaultValues?.map((item, index) => (
            <Grid sx={{ padding: '40px' }}>
              <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>
                <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                    type="text"
                    name="previous_company"
                    label="Previous_Company"
                    variant="outlined"
                    onChange={(e) => {
                      handleChange(e, index, 'previous_company');
                    }}
                  />
                </Grid>
                <Grid md={6} xs={12} item>
                  <TextField
                    fullWidth
                    type="text"
                    name="desgination"
                    label="Desgination"
                    onChange={(e) => {
                      handleChange(e, index, 'desgination');
                    }}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>
                <Grid md={6} xs={12} item>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        sx={{ width: '100%', paddingLeft: '3px' }}
                        label="From"
                        onChange={(newValue) => {
                          handleChangeDate(newValue, index, 'from');
                        }}
                        value={item?.from}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid md={6} xs={12} item>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        sx={{ width: '100%', paddingLeft: '3px' }}
                        label="To"
                        value={item?.to}
                        onChange={(newValue) => {
                          handleChangeDate(newValue, index, 'to');
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>
                <Grid md={6} xs={12} item>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Employement Type</InputLabel>
                    <Select
                      labelId="Employement Type"
                      id="Employement Type"
                      value={item?.employement_type}
                      name="employmen_type"
                      label="Employement Type"
                      onChange={(e) => {
                        handleChange(e, index, 'employmen_type');
                      }}
                    >
                      <MenuItem value={1}>Primary</MenuItem>
                      <MenuItem value={2}>Contract</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12} item>
                  <Autocomplete
                    multiple
                    id="Primary Skills"
                    options={top100Films.map((option) => option.title)}
                    freeSolo
                    onChange={(e, values) => {
                      handleChangeMultiple(e, values, index, 'primary_skills');
                    }}
                    renderTags={(value1, getTagProps) =>
                      value1.map((option, index1) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index1 })} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        label="Primary Skills"
                        placeholder="Favorites"
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid spacing={2} sx={{ paddingBottom: '10px' }} container flexDirection="row" item>
                <Grid md={6} xs={12} item>
                  <FormControl fullWidth>
                    <InputLabel id="Employement Type" label="Employement Type">
                      Employement Type
                    </InputLabel>
                    <Select
                      labelId="Employement Type"
                      id="demo-simple-select"
                      value="1"
                      label="Employement Type"
                      //   onChange={handleChange}
                    >
                      <MenuItem value={1}>Primary</MenuItem>
                      <MenuItem value={2}>Contract</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid md={6} xs={12} item>
                  <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" />
                    {/* <PhotoCamera /> */}Upload File
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleAdd();
          }}
        >
          Add
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </Button>
      </form>
    </Stack>
  );
}
PreviousWorkDetails.propTypes = {
  currentUser: PropTypes.object,
};

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];
