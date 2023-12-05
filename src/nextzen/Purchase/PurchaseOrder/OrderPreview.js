import React from 'react';
import {
  Paper,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  DialogActions,
  Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import './style.css';

const OrderPreview = ({ currentData, handleClose }) => {
  const handlePrint = () => {
    window.print();
  };
  return (
    <div style={{ padding: 20, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
        Purchase Order Details
      </Typography>
      <Grid container spacing={3} style={{ marginBottom: 20, marginTop: 10 }}>
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            Vendor Details
          </Typography>
          <Typography variant="body1">Name: {currentData?.vendorName}</Typography>
          <Typography variant="body1">PAN: {currentData.vendorPAN}</Typography>
          <Typography variant="body1">GST: {currentData.vendorGST}</Typography>
          <Typography variant="body1">Email: {currentData.emailID}</Typography>
          <Typography variant="body1">Phone: {currentData.contactNo}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            Company Details
          </Typography>
          <Typography variant="body1">Name: {currentData.companyName}</Typography>
          <Typography variant="body1">GST: {currentData.companyBillingGST}</Typography>
          <Typography variant="body1">PAN: {currentData.companyBillingPAN}</Typography>
          <Typography variant="body1">
            Billing Address: {currentData.companyBillingAddress}
          </Typography>
          <Typography variant="body1">
            Shipping Address: {currentData.factoryShippingAddress}
          </Typography>
        </Grid>
      </Grid>
      <div style={{ marginBottom: 20 }}>
        <Typography variant="h5" gutterBottom>
          Basic Details
        </Typography>
        <Grid container spacing={3} style={{ marginBottom: 20 }}>
          <Grid item xs={6}>
            <Typography variant="body1">Order ID: {currentData.purchaseOrderID}</Typography>
            <Typography variant="body1">PO No: {currentData.poNumber}</Typography>
            <Typography variant="body1">Order Date: {currentData.poDate}</Typography>
            <Typography variant="body1">
              Delivery Date: {currentData.expectedDeliveryDate}
            </Typography>
            <Typography variant="body1">Payment Term: {currentData.paymentTerm}</Typography>
            <Typography variant="body1">Advance Amount: {currentData.advanceAmount}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              Grand Total Amount: {currentData.grandTotalAmount}
            </Typography>
            <Typography variant="body1">Balance Amount: {currentData.balanceAmount}</Typography>
            <Typography variant="body1">CGST: {currentData.CGST}</Typography>
            <Typography variant="body1">SGST: {currentData.SGST}</Typography>
            <Typography variant="body1">IGST: {currentData.IGST}</Typography>
            <Typography variant="body1">gstAmount: {currentData.gstAmount}</Typography>
          </Grid>
        </Grid>
      </div>
      <div>
        <Typography variant="h5" gutterBottom>
          Purchased Items
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell>Units</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>GST Rate</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Comments</TableCell>
                <TableCell>Total Amount</TableCell>
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
                    <TableCell>{row.comments}</TableCell>
                    <TableCell>{row.totalAmount}</TableCell>
                  </TableRow>
                ))}
              <TableRow>
                <TableCell colSpan={5} component="th"></TableCell>
                <TableCell colSpan={2} component="th">
                  Grand Total
                </TableCell>
                <TableCell component="th">{currentData.grandTotalAmount}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <DialogActions className="print-hidden">
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            color="primary"
            onClick={handlePrint}
            variant="contained"
            loading=""
          >
            Print
          </LoadingButton>
        </DialogActions>
      </div>
    </div>
  );
};

export default OrderPreview;
