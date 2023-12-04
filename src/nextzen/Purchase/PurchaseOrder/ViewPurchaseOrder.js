import PropTypes from 'prop-types';

import { useContext, useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import UserContext from 'src/nextzen/context/user/UserConext';
import { TabContext, TabList, TabPanel } from '@mui/lab';

export default function ViewPurchaseOrder({ currentData, handleClose, getTableData }) {
  const { user } = useContext(UserContext);
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const gridStyle = { paddingTop: '10px' };
  return (
    <div>
      <DialogContent>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Basic Details" value="1" />
                <Tab label="Company Details" value="2" />
                <Tab label="Vendor Details" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Grid container spacing={2}>
                <Grid item xs={6} style={gridStyle}>
                  <Typography variant="subtitle2">
                    Order ID : {currentData?.purchaseOrderID}
                  </Typography>
                </Grid>
                <Grid item xs={6} style={gridStyle}>
                  <Typography variant="subtitle2">PO Number : {currentData?.poNumber}</Typography>
                </Grid>
                <Grid item xs={6} style={gridStyle}>
                  <Typography variant="subtitle2">PO Date : {currentData?.poDate}</Typography>
                </Grid>
                <Grid item xs={6} style={gridStyle}>
                  <Typography variant="subtitle2">
                    Expected Delivery Date : {currentData?.expectedDeliveryDate}
                  </Typography>
                </Grid>
                <Grid item xs={6} style={gridStyle}>
                  <Typography variant="subtitle2">
                    Payment Term : {currentData?.paymentTerm}
                  </Typography>
                </Grid>
                <Grid item xs={6} style={gridStyle}>
                  <Typography variant="subtitle2">
                    Grand Total Amount : {currentData?.grandTotalAmount}
                  </Typography>
                </Grid>
                <Grid item xs={6} style={gridStyle}>
                  <Typography variant="subtitle2">
                    Advance Amount : {currentData?.advanceAmount}
                  </Typography>
                </Grid>
                <Grid item xs={6} style={gridStyle}>
                  <Typography variant="subtitle2">
                    Balance Amount : {currentData?.balanceAmount}
                  </Typography>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="2">
              <Grid container spacing={2}>
                <Grid item xs={4} style={gridStyle}>
                  <Typography variant="subtitle2">
                    Company Name : {currentData?.companyName}
                  </Typography>
                </Grid>

                <Grid item xs={4} style={gridStyle}>
                  <Typography variant="subtitle2">
                    Company Billing GST : {currentData?.companyBillingGST}
                  </Typography>
                </Grid>
                <Grid item xs={4} style={gridStyle}>
                  <Typography variant="subtitle2">
                    Company Billing PAN : {currentData?.companyBillingPAN}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={gridStyle}>
                  <Typography variant="subtitle2">
                    Company Billing Address : {currentData?.companyBillingAddress}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={gridStyle}>
                  <Typography variant="subtitle2">
                    Factory Shipping Address : {currentData?.factoryShippingAddress}
                  </Typography>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="3">
              <Grid container spacing={2}>
                <Grid item xs={4} style={gridStyle}>
                  <Typography variant="subtitle2">
                    Vendor Name : {currentData?.vendorName}
                  </Typography>
                </Grid>
                <Grid item xs={4} style={gridStyle}>
                  <Typography variant="subtitle2">PAN : {currentData?.vendorPAN}</Typography>
                </Grid>
                <Grid item xs={4} style={gridStyle}>
                  <Typography variant="subtitle2">GST : {currentData?.vendorGST}</Typography>
                </Grid>
                <Grid item xs={4} style={gridStyle}>
                  <Typography variant="subtitle2">Email : {currentData?.emailID}</Typography>
                </Grid>
                <Grid item xs={4} style={gridStyle}>
                  <Typography variant="subtitle2">
                    Phone Number : {currentData?.contactNo}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={gridStyle}>
                  <Typography variant="subtitle2">
                    Address : {currentData?.vendorAddress}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={gridStyle}>
                  <Typography variant="subtitle2">
                    Location : {currentData?.vendorLocation}
                  </Typography>
                </Grid>
              </Grid>
            </TabPanel>
          </TabContext>
        </Box>
        <Box
          marginTop={2}
          display="flex"
          sx={{ marginTop: '0px' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <h2>Purchase Material Details</h2>
        </Box>
        <Box
          marginTop={2}
          display="flex"
          sx={{ marginTop: '0px' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Units</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Rate</TableCell>
                  <TableCell>GST Rate</TableCell>
                  <TableCell>GST Amount</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>Total Amount</TableCell>
                  <TableCell>Comments</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData?.purchaseMaterial &&
                  currentData?.purchaseMaterial.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.itemName}
                      </TableCell>
                      <TableCell>{row.unitOfMeasure}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>{row.rate}</TableCell>
                      <TableCell>{row.gstRate}</TableCell>
                      <TableCell>{row.gstAmount}</TableCell>
                      <TableCell>{row.discount}</TableCell>
                      <TableCell>{row.totalAmount}</TableCell>
                      <TableCell>{row.comments}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <LoadingButton type="submit" color="primary" variant="contained" loading="">
          Edit
        </LoadingButton>
      </DialogActions>
    </div>
  );
}

ViewPurchaseOrder.propTypes = {
  currentData: PropTypes.object,
  handleClose: PropTypes.any,
};
