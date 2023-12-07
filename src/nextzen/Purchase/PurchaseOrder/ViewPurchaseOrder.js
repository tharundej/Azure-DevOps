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
  const gridStyle = { paddingTop: '10px', alignItems: 'center' };
  const StyledTableCell = { padding: '5px' };
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
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell style={StyledTableCell}>Order ID</TableCell>
                    <TableCell style={StyledTableCell}>{currentData?.purchaseOrderID}</TableCell>
                    <TableCell style={StyledTableCell}>PO Number</TableCell>
                    <TableCell style={StyledTableCell}>{currentData?.poNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={StyledTableCell}>PO Date</TableCell>
                    <TableCell style={StyledTableCell}>{currentData?.poDate}</TableCell>
                    <TableCell style={StyledTableCell}>Expected Delivery Date</TableCell>
                    <TableCell style={StyledTableCell}>
                      {currentData?.expectedDeliveryDate}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={StyledTableCell}>Payment Term</TableCell>
                    <TableCell style={StyledTableCell}>{currentData?.paymentTerm}</TableCell>
                    <TableCell style={StyledTableCell}>Grand Total Amount</TableCell>
                    <TableCell style={StyledTableCell}>{currentData?.grandTotalAmount}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={StyledTableCell}>Advance Amount</TableCell>
                    <TableCell style={StyledTableCell}>{currentData?.advanceAmount}</TableCell>
                    <TableCell style={StyledTableCell}>Balance Amount</TableCell>
                    <TableCell style={StyledTableCell}>{currentData?.balanceAmount}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={StyledTableCell}>CGST</TableCell>
                    <TableCell style={StyledTableCell}>{currentData?.CGST}</TableCell>
                    <TableCell style={StyledTableCell}>SGST</TableCell>
                    <TableCell style={StyledTableCell}>{currentData?.SGST}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={StyledTableCell}>IGST</TableCell>
                    <TableCell style={StyledTableCell}>{currentData?.IGST}</TableCell>
                    <TableCell style={StyledTableCell}>GST Amount</TableCell>
                    <TableCell style={StyledTableCell}>{currentData?.gstAmount}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabPanel>
            <TabPanel value="2">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell style={StyledTableCell}>Company Name</TableCell>
                    <TableCell style={StyledTableCell}>{currentData?.companyName}</TableCell>
                    <TableCell style={StyledTableCell}>Company Billing GST</TableCell>
                    <TableCell style={StyledTableCell}>{currentData?.companyBillingGST}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={StyledTableCell}>Company Billing PAN</TableCell>
                    <TableCell style={StyledTableCell}>{currentData?.companyBillingPAN}</TableCell>
                    <TableCell style={StyledTableCell}>Company Billing Address</TableCell>
                    <TableCell style={StyledTableCell}>
                      {currentData?.companyBillingAddress}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={StyledTableCell}>Factory Shipping Address</TableCell>
                    <TableCell style={StyledTableCell}>
                      {currentData?.factoryShippingAddress}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabPanel>
            <TabPanel value="3">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={2} style={StyledTableCell}>
                      Vendor / Location Name
                    </TableCell>
                    <TableCell style={StyledTableCell}>
                      <b>{currentData?.vendorName}</b>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={StyledTableCell}>PAN</TableCell>
                    <TableCell style={StyledTableCell}>{currentData?.vendorPAN}</TableCell>
                    <TableCell style={StyledTableCell}>GST</TableCell>
                    <TableCell style={StyledTableCell}>{currentData?.vendorGST}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={StyledTableCell}>Email</TableCell>
                    <TableCell style={StyledTableCell}>{currentData?.emailID}</TableCell>
                    <TableCell style={StyledTableCell}>Phone Number</TableCell>
                    <TableCell style={StyledTableCell}>{currentData?.contactNo}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={StyledTableCell}>Address</TableCell>
                    <TableCell style={StyledTableCell}>{currentData?.vendorAddress}</TableCell>
                    <TableCell style={StyledTableCell}>Location</TableCell>
                    <TableCell style={StyledTableCell}>{currentData?.vendorLocation}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
