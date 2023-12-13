import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';

import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import instance from 'src/api/BaseURL';

import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import Iconify from 'src/components/iconify/iconify';
import UserContext from 'src/nextzen/context/user/UserConext';
// import { async } from '@firebase/util';
import { ListPurchaseOrderDetailsAPI, getPurchaseOrderAPI } from 'src/api/Accounts/PurchaseOrder';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import SnackBarComponent from 'src/nextzen/global/SnackBarComponent';
import { createPurchaseInvoiceAPI } from 'src/api/Accounts/PurchaseInvoice';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { formatDateToYYYYMMDD } from 'src/nextzen/global/GetDateFormat';
import { getListofPoNumberAPI } from 'src/api/Accounts/Common';

export default function CreatePurchaseInvoice({ currentData, handleClose, getTableData }) {
  const { user } = useContext(UserContext);
  const NewUserSchema = Yup.object().shape({
    name: Yup.string(),
    status: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      companyId: user?.companyID ? user?.companyID : '',
      poNumber: currentData?.poNumber || '',
      invoiceNo: '',
      invoiceDate: currentData?.invoiceDate || '',
      status: currentData?.status || 'Pending',
      vendorId: currentData?.vendorId || '',
      locationId: currentData?.locationId || '',
      paymentMode: currentData?.paymentMode || '',
      PODate: '',
      ExpectedDeliveryDate: '',
      VendorName: '',
      VendorAddress: '',
      FactoryShippingAddress: '',
      materialInvoice: [],
    }),
    [currentData]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const values = watch();
  const [purchaseOrderOptions, setPurchaseOrderOptions] = useState();
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snacbarMessage, setSnacbarMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [contentList, setContentList] = useState([]);
  const handleCallSnackbar = (message, severity) => {
    setOpenSnackbar(true);
    setSnacbarMessage(message);
    setSeverity(severity);
  };
  const HandleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const [datesUsed, setDatesUsed] = useState({
    invoiceDate: defaultValues?.invoiceDate ? dayjs(defaultValues?.invoiceDate) : dayjs(new Date()),
  });
  const fetechPurchaseOrder = async () => {
    try {
      const data = {
        companyId: user?.companyID ? user?.companyID : '',
      };
      const response = await getListofPoNumberAPI(data);
      if (response === null) {
        handleCallSnackbar('No Purchase Order Found. Please Add Purchase Order', 'warning');
      } else {
        setPurchaseOrderOptions(response);
        setSelectedPurchaseOrder(
          defaultValues.purchaseOrderID ||
            (response.length > 0 ? response[0].purchaseOrderID : null)
        );
      }
    } catch (error) {
      console.log('API request failed:', error.message);
      handleCallSnackbar(error.message, 'warning');
    }
  };
  useEffect(() => {
    fetechPurchaseOrder();
  }, []);
  useEffect(() => {
    contentList.forEach((content, index) => {
      setValue(`materialInvoice[${index}].materialId`, content.materialId ? content.materialId : 0);
      setValue(`materialInvoice[${index}].itemName`, content.itemName ? content.itemName : '');
      setValue(
        `materialInvoice[${index}].unitOfMeasure`,
        content.unitOfMeasure ? content.unitOfMeasure : ''
      );
      setValue(`materialInvoice[${index}].rate`, content.rate ? content.rate : 0);
      setValue(`materialInvoice[${index}].gstRate`, content.gstRate ? content.gstRate : 0);
      setValue(
        `materialInvoice[${index}].requestQuantity`,
        content.quantity ? content.quantity : 0
      );
      setValue(
        `materialInvoice[${index}].paidQuantity`,
        content.paidQuantity ? content.paidQuantity : 0
      );
    });
  }, [contentList]);
  const handlePurchaseOrderChange = async (event, newValue) => {
    console.log('newValue', newValue);
    try {
      const data = {
        companyId: user?.companyID ? user?.companyID : '',
        poNumber: newValue?.poNumber ? newValue?.poNumber : '',
      };
      const response = await ListPurchaseOrderDetailsAPI(data);
      if (response === null) {
        handleCallSnackbar('No Purchase Order Found. Please Add Purchase Order', 'warning');
      } else {
        setValue('poNumber', response[0].poNumber);
        setValue('PODate', response[0].poDate);
        setValue('ExpectedDeliveryDate', response[0].expectedDeliveryDate);
        setValue('paymentMode', response[0].paymentTerm);
        setValue('vendorId', response[0]?.vendorId ? response[0]?.vendorId : 0);
        setValue('locationId', response[0]?.locationId ? response[0]?.locationId : 0);
        setValue('VendorName', response[0].vendorName);
        setValue('VendorAddress', response[0].vendorAddress);
        setValue('FactoryShippingAddress', response[0].factoryShippingAddress);
        const materialArray = Object.values(response[0].purchaseMaterial || {});
        setContentList(materialArray);
        console.log(materialArray);
      }
    } catch (error) {
      console.log('API request failed:', error.message);
      handleCallSnackbar(error.message, 'warning');
    }
  };
  const HandleInputChange = (e, index) => {
    const { name, value } = e.target;
    setValue(name, value);
    const requestQuantity = watch(`materialInvoice[${index}].requestQuantity`);
    const paidQuantity = watch(`materialInvoice[${index}].paidQuantity`);
    const quantity = watch(`materialInvoice[${index}].receivedMaterialWeight`);
    if (requestQuantity - paidQuantity < quantity) {
      handleCallSnackbar(
        'Your Max alowed Quantity is ' + (requestQuantity - paidQuantity),
        'warning'
      );
      setValue(`materialInvoice[${index}].receivedMaterialWeight`, requestQuantity - paidQuantity);
    }
    updateCalculatedValues(index);
  };
  const updateCalculatedValues = (index) => {
    const parsedQuantity = parseFloat(watch(`materialInvoice[${index}].receivedMaterialWeight`));
    const parsedPrice = parseFloat(watch(`materialInvoice[${index}].rate`));
    const parsedGstRate = parseFloat(watch(`materialInvoice[${index}].gstRate`));
    console.log({ parsedQuantity }, { parsedPrice }, { parsedGstRate });
    const amount = parsedQuantity * parsedPrice;
    const gstAmount = amount * (parsedGstRate / 100);
    setValue(`materialInvoice[${index}].amount`, amount);
    setValue(`materialInvoice[${index}].gstAmount`, gstAmount);
    setValue(`materialInvoice[${index}].totalAmount`, amount + gstAmount);
    calculateGrandTotal();
  };
  const calculateGrandTotal = () => {
    let grandTotal = 0;
    let grandGstAmount = 0;
    for (let i = 0; i < watch('materialInvoice')?.length; i++) {
      const itemTotalAmount = watch(`materialInvoice[${i}].totalAmount`) || 0;
      grandTotal += itemTotalAmount;
      const itemTotalGstAmount = watch(`materialInvoice[${i}].gstAmount`) || 0;
      grandGstAmount += itemTotalGstAmount;
    }
    setValue('netTotalAmount', grandTotal);
    setValue('gstAmount', grandGstAmount);
  };
  useEffect(() => {
    calculateGrandTotal();
  }, [values.materialInvoice]);
  const onSubmit = handleSubmit(async (data) => {
    console.log('🚀 ~ file: AddTimeProject.jsx:93 ~ onSubmit ~ data:', data);
    console.log('uyfgv');
    data.invoiceDate = formatDateToYYYYMMDD(datesUsed?.invoiceDate);
    try {
      let response = await createPurchaseInvoiceAPI(data);
      console.log('Create success', response);
      handleCallSnackbar(response.message, 'success');
      reset(); // Reset the form values
      setTimeout(() => {
        handleClose(); // Close the dialog on success
      }, 1000);
      getTableData();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.code === 400) {
        handleCallSnackbar(error.response.data.message, 'warning');
        console.log('request failed:', error.response.data.message);
      } else {
        handleCallSnackbar(error.message, 'warning');
        console.log('API request failed:', error.message);
      }
    }
  });
  return (
    <div>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <ModalHeader heading={'Add New Purchase Invoice'} />
        <SnackBarComponent
          open={openSnackbar}
          onHandleCloseSnackbar={HandleCloseSnackbar}
          snacbarMessage={snacbarMessage}
          severity={severity}
        />
        <DialogContent>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            marginTop={2}
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(4, 1fr)',
            }}
          >
            <RHFAutocomplete
              name="poId"
              id="poId"
              options={purchaseOrderOptions || []}
              onChange={handlePurchaseOrderChange}
              getOptionLabel={(option) => option.poNumber}
              renderInput={(params) => (
                <TextField {...params} label="Select PO Number" variant="outlined" />
              )}
            />
            <RHFTextField
              InputProps={{
                readOnly: true,
              }}
              name="PODate"
              label="PO Date"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{ width: '100%', paddingLeft: '3px' }}
                  label="Invoice Date *"
                  value={datesUsed?.invoiceDate}
                  defaultValue={dayjs(new Date())}
                  onChange={(newValue) => {
                    setDatesUsed((prev) => ({
                      ...prev,
                      invoiceDate: newValue,
                    }));
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <RHFTextField
              InputProps={{
                readOnly: true,
              }}
              name="ExpectedDeliveryDate"
              label="Expected Delivery Date"
            />
            <RHFTextField
              InputProps={{
                readOnly: true,
              }}
              name="paymentMode"
              label="Payment Term"
            />
            <RHFTextField
              InputProps={{
                readOnly: true,
              }}
              name="VendorName"
              label="Vendor Name"
            />
            <RHFTextField
              InputProps={{
                readOnly: true,
              }}
              name="VendorAddress"
              label="Vendor Address"
            />
            <RHFTextField
              InputProps={{
                readOnly: true,
              }}
              name="FactoryShippingAddress"
              label="Factory Shipping Address"
            />
            <RHFTextField
              name="gstAmount"
              label="GST Amount"
              InputProps={{
                readOnly: true,
              }}
              defaultValue="0"
            />
            <RHFTextField
              name="netTotalAmount"
              label="Grand Total Amount"
              InputProps={{
                readOnly: true,
              }}
              defaultValue="0"
            />
          </Box>
          <Box marginTop={2} display="flex" justifyContent="space-between" alignItems="center">
            <h2>Purchase Material</h2>
          </Box>
          {contentList.map((content, index) => {
            return (
              <div key={index}>
                <Box
                  key={index}
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  marginTop={2}
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(5, 1fr)',
                  }}
                >
                  <RHFTextField
                    InputProps={{
                      readOnly: true,
                    }}
                    defaultValue={content.itemName}
                    label="Material"
                    name={`materialInvoice[${index}].itemName`}
                  />
                  <RHFTextField
                    InputProps={{
                      readOnly: true,
                    }}
                    defaultValue={content.unitOfMeasure}
                    label="Unit of Measure"
                    name={`materialInvoice[${index}].unitOfMeasure`}
                  />
                  <RHFTextField
                    InputProps={{
                      readOnly: true,
                    }}
                    defaultValue={content.quantity}
                    label="Requested Quantity"
                    name={`materialInvoice[${index}].requestQuantity`}
                  />
                  <RHFTextField
                    InputProps={{
                      readOnly: true,
                    }}
                    defaultValue={content.quantity}
                    label="Already Paid Quantity"
                    name={`materialInvoice[${index}].paidQuantity`}
                  />
                  <RHFTextField
                    type="number"
                    onChange={(e) => HandleInputChange(e, index)}
                    defaultValue={0}
                    label="Quantity"
                    name={`materialInvoice[${index}].receivedMaterialWeight`}
                  />
                  <RHFTextField
                    InputProps={{
                      readOnly: true,
                    }}
                    value={content.rate || 0}
                    defaultValue={content.rate || 0}
                    label="Rate"
                    name={`materialInvoice[${index}].rate`}
                  />
                  <RHFTextField
                    InputProps={{
                      readOnly: true,
                    }}
                    defaultValue={content.gstRate}
                    label="GST Rate"
                    name={`materialInvoice[${index}].gstRate`}
                  />
                  <RHFTextField
                    InputProps={{
                      readOnly: true,
                    }}
                    defaultValue="0"
                    label="Amount"
                    name={`materialInvoice[${index}].amount`}
                  />
                  <RHFTextField
                    InputProps={{
                      readOnly: true,
                    }}
                    defaultValue="0"
                    label="GST Amount"
                    name={`materialInvoice[${index}].gstAmount`}
                  />
                  <RHFTextField
                    InputProps={{
                      readOnly: true,
                    }}
                    defaultValue="0"
                    label="Total Amount"
                    name={`materialInvoice[${index}].totalAmount`}
                  />
                  <RHFTextField
                    defaultValue={0}
                    label="Vehicle Weight"
                    name={`materialInvoice[${index}].vehicleWeight`}
                  />
                  <RHFTextField label="Comments" name={`materialInvoice[${index}].comments`} />
                </Box>
                <hr style={{ borderTop: '2px solid #ccc', margin: '30px 0', width: '100%' }} />
              </div>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" color="primary" variant="contained" loading={isSubmitting}>
            Save
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </div>
  );
}

CreatePurchaseInvoice.propTypes = {
  currentData: PropTypes.object,
  handleClose: PropTypes.any,
};
