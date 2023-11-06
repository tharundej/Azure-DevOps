import { styled } from '@mui/system';
import { Button, Dialog, Grid, TextField, Typography } from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';
import CreateFactory from './CreateFactory';

const FactoryHead = ({ filterSearch, filterData }) => {
  const router = useRouter();
  const theme = useTheme();
  const [showForm, setShowForm] = useState(false);

  const handleSearch = (e) => {
    filterSearch(e?.target?.value);
  };

  const handleTimeForm = () => {
    setShowForm(true);
    console.log('🚀 ~ file: Time.jsx:36 ~ handleTimeForm ~ handleTimeForm:', showForm);
  };
  const handleClose = () => {
    setShowForm(false);
  };

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
          className="custom-dialog"
        >
          <CreateFactory currentUser={{}} handleClose={handleClose} />
        </Dialog>
      )}
      <Grid container alignItems="center" paddingBottom="10px">
        <Grid md={4} xs={4} item>
          <Typography variant="h4">Factory Details</Typography>
        </Grid>
        <Grid md={4} xs={4} item>
          <TextField
            placeholder="Search...."
            fullWidth
            onChange={(e) => {
              handleSearch(e);
            }}
          />
        </Grid>
        <Grid md={4} xs={4} item>
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Grid item>
              <Button
                variant="outlined"
                onClick=""
                startIcon={<Iconify icon="formkit:downloadcloud" />}
                sx={{ margin: '20px' }}
              >
                Export
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleTimeForm}
                startIcon={<Iconify icon="mingcute:add-line" />}
                sx={{ margin: '20px' }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

FactoryHead.propTypes = {
  filterSearch: PropTypes.func, // A function to handle search filtering.
  filterData: PropTypes.any, // The data to be filtered (modify 'any' with the actual data type if known).
};

export default FactoryHead;
