import PropTypes from 'prop-types';

import { useState } from 'react';

import { styled } from '@mui/system';

import FormProvider, { RHFSelect, RHFAutocomplete } from 'src/components/hook-form';

import {
  Card,
  TextField,
  InputAdornment,
  Autocomplete,
  Grid,
  Button,
  Drawer,
  IconButton,
  Stack,
  DialogContent,
  DialogActions,
} from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';

import Dialog from '@mui/material/Dialog';

import DialogTitle from '@mui/material/DialogTitle';

import formatDateToYYYYMMDD from '../global/GetDateFormat';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    overflow: 'hidden',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function SearchFilter({ handleFilters, filterOptions }) {
  const [filterData, SetFilterData] = useState([]);
  const [options, setOptions] = useState([]);
  const [dates, setDates] = useState({
    start_date: null,
    end_date: null,
  });

  const [searchText, setSearchText] = useState('');
  const [selectedValues, SetSelectedValues] = useState('');
  const [openFilter, setOpenFilter] = useState(false);
  const [closeFilter, setCloseFilter] = useState(false);
  const handleSelectedValues = (fieldName, option) => {
    SetSelectedValues((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [fieldName]: option,
    }));
  };
  const fieldNames = filterOptions?.map((filterOption) => filterOption.fieldName);

  console.log(fieldNames);
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleOptions = () => {
    const newFilterData = {};

    // Merge the selected values from Autocomplete components into filterData
    Object.keys(selectedValues).forEach((fieldName) => {
      newFilterData[fieldName] = selectedValues[fieldName];
    });

    // Add Date Range values to filterData
    if (dates?.start_date) {
      newFilterData.start_date = formatDateToYYYYMMDD(dates?.start_date);
    }
    if (dates?.end_date) {
      newFilterData.end_date = formatDateToYYYYMMDD(dates?.end_date);
    }

    // Add the "search" value to filterData
    if (searchText) {
      newFilterData.search = searchText;
    }
    const hasFilterCriteria = Object.keys(newFilterData).length > 0;

    //   if (hasFilterCriteria) {
    //     // Call handleFilters with the combined filterData
    //
    //   } else {
    //     // Handle the case when no filter criteria are provided
    //     // You can decide what to do in this case, such as showing a message or doing nothing.
    //     // For example, you can log a message to the console.
    //     alert('No filter criteria provided');
    //   }
    handleFilters(newFilterData);
    setOpen(false);
  };
  const handleClick = (fieldName) => {
    const isPresent = filterOptions.find((filterOption) => filterOption.fieldName === fieldName);
    if (isPresent) {
      setOptions(isPresent?.options);
    }
  };
  const handleFilterCancel = () => {
    setSearchText('');
    SetFilterData([]);
    setDates({
      start_date: null,
      end_date: null,
    });
    SetSelectedValues('');
    handleFilters(filterData);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack
        sx={{ justifyContent: 'flex-end', display: 'flex', float: 'right', alignItems: 'flex-end' }}
      >
        <Button onClick={handleClickOpen} sx={{ width: '80px' }}>
          <Iconify icon="mi:filter" />
        </Button>
      </Stack>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ textAlign: 'center', paddingBottom: 0, paddingTop: 2 }}>
          Filters
          <Button onClick={() => setOpen(false)} sx={{ float: 'right' }}>
            <Iconify icon="iconamoon:close-thin" />
          </Button>
        </DialogTitle>

        <DialogContent sx={{ mt: 0, paddingBottom: 0 }}>
          <Grid container spacing={1} style={{ margin: '1rem' }}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  placeholder="Start Date"
                  value={dates?.start_date}
                  defaultValue={dates?.start_date}
                  onChange={(newValue) => {
                    setDates((prev) => ({
                      ...prev,
                      start_date: newValue,
                    }));
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  placeholder="End Date"
                  value={dates?.end_date}
                  defaultValue={dates?.end_date}
                  onChange={(newValue) => {
                    setDates((prev) => ({
                      ...prev,
                      end_date: newValue,
                    }));
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <>
              {filterOptions?.map((item, index) => (
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={filterOptions[index]?.options}
                    value={selectedValues[filterOptions[index]?.fieldName] || null}
                    onChange={(event, newValue) => {
                      handleSelectedValues(filterOptions[index]?.fieldName, newValue);
                    }}
                    sx={{ zIndex: 9999 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={filterOptions[index]?.fieldName}
                        sx={{ width: '240px' }}
                      />
                    )}
                  />
                </Grid>
              ))}
            </>
          </Grid>
          <div
            style={{
              width: '100%',
              textAlign: 'right',
              display: 'block',
              paddingRight: '2rem',
              paddingBottom: 0,
            }}
          >
            <Button
              onClick={handleOptions}
              style={{ backgroundColor: '#3B82F6', color: 'white', marginRight: 5 }}
            >
              Apply
            </Button>
            <Button
              onClick={handleFilterCancel}
              style={{ backgroundColor: '#cc0000', color: 'white' }}
            >
              Reset
            </Button>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}

SearchFilter.propTypes = {
  handleFilters: PropTypes.any,
};

SearchFilter.propTypes={
    filterOptions: PropTypes.arrayOf(
        PropTypes.shape({
          fieldName: PropTypes.string,
          options: PropTypes.arrayOf(PropTypes.string)
        })
      ),
}