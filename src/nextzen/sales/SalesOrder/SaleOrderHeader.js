import { styled } from '@mui/system';
import { Button, Dialog, Grid, TextField, Typography, Stack } from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';
import CreateSaleOrder from './CreateSaleOrder';
import Badge from '@mui/material/Badge';

const SaleOrderHead = ({ filterSearch, filterData }) => {
  const router = useRouter();
  const theme = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [badgeContent, setBadgeContent] = useState(false);

  const handleApply=async()=>{
    // setDatesData([]);
    setBadgeContent(true);





    filterData(data);




  }

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
            sx: { maxWidth: 1300,},
          }}
          className="custom-dialog"
        >
          <CreateSaleOrder currentData={{}} handleClose={handleClose} />
        </Dialog>
      )}
      {/* <Grid container alignItems="center" paddingBottom="10px">
        <Grid md={4} xs={4} item>
          <Typography variant="h4">Sales Order Details</Typography>
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
      </Grid> */}
         <Grid container alignItems="center" marginBottom='10px' marginTop='20px' >
          <Grid md={8} xs={12} lg={8} item>
  <TextField
    placeholder='Search....'
    fullWidth
    onChange={e => { handleSearch(e) }}

    size="small"
  />
</Grid>

            <Grid md={4} xs={12} lg={4} item>
          <Grid sx={{display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>

      <Grid item>
      <Button

        variant="contained"
        onClick={handleTimeForm}
        startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{color:'white',backgroundColor:'#3B82F6'}}>Add Sales Order</Button>


      </Grid>
      <Grid item>
        <Stack  >
        {badgeContent ===  true?(
               <Badge badgeContent={""} color="success" variant="dot"

               anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}

              >
                        <Button onClick={handleTimeForm} style={{width:"80px"}}   >
                       <Iconify icon="mi:filter"/>
                       Filters
                  </Button>
                  </Badge >
          ):( <Button onClick={handleTimeForm} style={{width:"80px"}}  >
          <Iconify icon="mi:filter"/>
          Filters
     </Button>)}


      </Stack>
             </Grid>
      </Grid>
      </Grid>
         </Grid>
    </>
  );
};

SaleOrderHead.propTypes = {
  filterSearch: PropTypes.func, // A function to handle search filtering.
  filterData: PropTypes.any, // The data to be filtered (modify 'any' with the actual data type if known).
};

export default SaleOrderHead;
