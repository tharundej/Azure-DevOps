import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getLocationAPI, getUnitOfMeasure, getVendorAPI, getCustomerListAPI, getProductListAPI } from 'src/api/Accounts/Common';
import { getVendorMaterialListAPI } from 'src/api/Accounts/VendorMaterials';
import { createSalesOrderAPI } from 'src/api/Accounts/SalesOrder';

import SnackBarComponent from 'src/nextzen/global/SnackBarComponent';


import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';

import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import instance from 'src/api/BaseURL';

import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import Iconify from 'src/components/iconify/iconify';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import UserContext from 'src/nextzen/context/user/UserConext';
export default function CreateSaleOrder({ currentData, handleClose }) {
  const { user } = useContext(UserContext);
  const NewUserSchema = Yup.object().shape({
    name: Yup.string(),
    status: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      companyID: currentData?.companyID || user?.companyID ? user?.companyID : '',
      locationID: currentData?.locationID || 0,
      billToName: currentData?.billToName || '',
      billToAddres:currentData?.billToAddres || '',
      billToState:currentData?.billToState || '',
      billToCity:currentData?.billToCity || '',
      billToPincode:currentData?.billToPincode || 0,
      billToGST:currentData?.billToGST || '',
      billToStateCode:currentData?.billToStateCode || 0,
      shipToName:currentData?.shipToName || '',
      shipToAddress:currentData?.shipToAddress || '',
      shipToState:currentData?.shipToState || '',
      shipToCity:currentData?.shipToCity || '',
      shipToPincode:currentData?.shipToPincode || 0,
      shipToGST:currentData?.shipToGST || '',
      shipToStateCode:currentData?.shipToStateCode || 0,
      paymentTerm: currentData?.paymentTerm || '',
      grossTotalAmount: currentData?.grossTotalAmount || 0,
      gstAmount: currentData?.gstAmount || 0,
      advanceAmount: currentData?.advanceAmount || '',
      vendorId: currentData?.vendorId || '',
      customerID: currentData?.customerID || '',
      // company_phone_no: currentData?.company_phone_no || '6284824092',
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
  const [datesUsed, setDatesUsed] = useState({
    expectedDeliveryDate: defaultValues?.expectedDeliveryDate
      ? dayjs(defaultValues?.expectedDeliveryDate)
      : dayjs(new Date()),
  });
  const [vendorMaterials, setVendorMaterials] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [vendorOptions, setVendorOptions] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState();
  const [locationsOptions, setLocationsOptions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  const [customerOptions, setCustomerOptions] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [selectedShippingLocation, setSelectedShippingLocation] = useState();
  const [productOptions, setProductOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snacbarMessage, setSnacbarMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const fetchVendor = async () => {
    const data = { companyID: user?.companyID ? user?.companyID : '' };
    try {
      const response = await getVendorAPI(data);
      setVendorOptions(response);
      setSelectedVendor(
        defaultValues.vendorId || (response.length > 0 ? response[0].vendorId : null)
      );
    } catch (error) {
      setErrorMessage(error.message);
      console.log('API request failed:', error.message);
    }
  };
  const fetchProduct = async () => {
    const data = { companyID: user?.companyID ? user?.companyID : '',
    };
    try {
      const response = await getProductListAPI(data);
      setProductOptions(response);
      setSelectedProduct(
        defaultValues.productId || (response.length > 0 ? response[0].productId : null)
      );
    } catch (error) {
      setErrorMessage(error.message);
      console.log('API request failed:', error.message);
    }
  };
  const fetchCustomer = async () => {
    const data = {  companyId: user?.companyID ? user?.companyID : '',
   };
    try {
      const response = await getCustomerListAPI(data);
      setCustomerOptions(response);
      setSelectedCustomer(
        response.length > 0 ? response[0].customerId : null
      );
    } catch (error) {
      setErrorMessage(error.message);
      console.log('API request failed:', error.message);
    }
  };
  const fetchLocation = async () => {
    const data = { companyID: user?.companyID ? user?.companyID : '' };
    try {
      const response = await getLocationAPI(data);
      console.log('location success', response);
      if (response === null) {
        handleCallSnackbar('No Location Found. Please Add Location', 'warning');
      } else {
        setLocationsOptions(response);
        setSelectedLocation(response.length > 0 ? response[0].locationID : null);
        setSelectedShippingLocation(response.length > 0 ? response[0].locationID : null);
      }
    } catch (error) {
      console.log('API request failed:', error.message);
      handleCallSnackbar(error.message, 'warning');
    }
  };
  const HandleInputChange = (e, index) => {
    setValue(e?.target?.name, e?.target?.value);
    updateCalculatedValues(index);
  };
  const HandleDropDownChange = (selectedValue, fieldName, index, gstRate, price) => {
    setValue(fieldName, selectedValue);
    if (gstRate) {
      setValue(`addPurchaseMaterial[${index}].rate`, price ? price : 0);
      setValue(`addPurchaseMaterial[${index}].gstRate`, gstRate ? gstRate : 0);
    }
  };
  const updateCalculatedValues = (index) => {
    const parsedQuantity = parseFloat(watch(`addPurchaseMaterial[${index}].quantity`));
    const parsedPrice = parseFloat(watch(`addPurchaseMaterial[${index}].rate`));
    const parsedGstRate = parseFloat(watch(`addPurchaseMaterial[${index}].gstRate`));
    const amount = parsedQuantity * parsedPrice;
    const gstAmount = amount * (parsedGstRate / 100);
    setValue(`addPurchaseMaterial[${index}].amount`, amount);
    setValue(`addPurchaseMaterial[${index}].gstAmount`, gstAmount);
    setValue(`addPurchaseMaterial[${index}].totalAmount`, amount + gstAmount);
  };

  const onSubmit = handleSubmit(async (data) => {
    console.log('🚀 ~ file: AddTimeProject.jsx:93 ~ onSubmit ~ data:', data);
    console.log('uyfgv');
    try {
      // console.log(data, 'data111ugsghghh');

      // const response = await instance.post('AddSalesOrder', data).then(
      //   (successData) => {
      //     console.log('sucess', successData);
      //   },
      //   (error) => {
      //     console.log('lllll', error);
      //   }
      // );
      data.locationPhone = parseInt(data.locationPhone);
      data.locationPincode = parseInt(data.locationPincode);
      data.billToPincode = parseInt(data.billToPincode);
      data.billToStateCode = parseInt(data.billToStateCode);
      data.shipToPincode = parseInt(data.shipToPincode);
      data.shipToStateCode = parseInt(data.shipToStateCode);
      data.grossTotalAmount = parseInt(data.grossTotalAmount);
      data.gstAmount = parseInt(data.gstAmount);
      data.advanceAmount = parseInt(data.advanceAmount);
      console.log('Create Factory Data', data);
      let response = await createSalesOrderAPI(data);
      // if (currentData?.locationName) {
      //   response = await updateFactoryAPI(data);
      // } else {
      //   response = await createFactoryAPI(data);
      // }
      console.log('Create success', response);
      handleCallSnackbar(response.message, 'success');
      reset();
      setTimeout(() => {
        handleClose(); // Close the dialog on success
      }, 1000);
      // currentData?.locationName ? '' : getTableData();
    } catch (error) {
      // console.error(error);
      if (error.response) {
        handleCallSnackbar(error.response.data.message, 'warning');
        console.log('request failed:', error.response.data.message);
      } else {
        handleCallSnackbar(error.message, 'warning');
        console.log('API request failed:', error.message);
      }
    }
  });
  const handleCallSnackbar = (message, severity) => {
    setOpenSnackbar(true);
    setSnacbarMessage(message);
    setSeverity(severity);
  };
  const HandleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const fetchUnits = async () => {
    try {
      const response = await getUnitOfMeasure();
      setUnitOptions(response);
      setSelectedUnit(response.length > 0 ? response[0] : null);
    } catch (error) {
      setErrorMessage(error.message);
      console.log('API request failed:', error.message);
    }
  };

  useEffect(() => {
    fetchUnits();
    fetchVendor();
    fetchLocation();
    fetchCustomer();
    fetchProduct();
  }, []);

  const [selectedVendorMaterial, setSelectedVendorMaterial] = useState(null);
  const handleVendorChange = async (event, newValue) => {
    try {
      if (newValue) {
        const vendorMaterialPayload = {
          companyId: user?.companyID ? user?.companyID : '',
          search: '',
          externalFilters: {
            materialName: '',
            hsnId: '',
            gstRate: 0,
            vendorId: newValue.vendorID || 0,
            vendorName: '',
            materialPrice: 0,
          },
          sort: {
            key: 1,
            orderBy: 'hsnId',
          },
          page: 0,
          count: 5,
        };
        setSelectedVendor(newValue.vendorID || 0);
        const vendorMaterialResponse = await getVendorMaterialListAPI(vendorMaterialPayload);
        setVendorMaterials(vendorMaterialResponse);
        setSelectedVendorMaterial(vendorMaterialResponse ? vendorMaterialResponse[0].id : null);
        console.log('Vendor Material Response:', vendorMaterialResponse);
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.log('API request failed:', error.message);
    }
  };

  const initialContent = (index) => (
    <Box
      key={index}
      rowGap={3}
      columnGap={2}
      display="grid"
      marginTop={2}
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(6, 1fr)',
      }}
    >
      {/* <RHFAutocomplete
        name={`addPurchaseMaterial[${index}].materialId`}
        id={`addPurchaseMaterial[${index}].materialId`}
        options={productOptions || []}
        onChange={(event, newValue) =>
          HandleDropDownChange(
            newValue.id,
            `addPurchaseMaterial[${index}].materialId`,
            index,
            newValue.gstRate,
            newValue.materialPrice
          )
        }
        getOptionLabel={(option) => option.materialName}
        renderInput={(params) => (
          <TextField {...params} label="Select Product" variant="outlined" />
        )}
      /> */}
       <RHFAutocomplete
              name={`addPurchaseMaterial[${index}].product`}
              id={`addPurchaseMaterial[${index}].product`}
              options={productOptions || []}
              onChange={(event, newValue) =>
                HandleDropDownChange(newValue, `addPurchaseMaterial[${index}].product`)
              }

              value={productOptions.find((option) => option.productId === selectedProduct) || null}
              getOptionLabel={(option) => option.productName} // Specify the property to display in the input
              renderInput={(params) => (
                <TextField {...params} label="Select Product" variant="outlined" />
              )}
            />

     <RHFAutocomplete
        name={`addPurchaseMaterial[${index}].unitOfMeasure`}
        id={`addPurchaseMaterial[${index}].unitOfMeasure`}
        options={unitOptions || []}
        onChange={(event, newValue) =>
          HandleDropDownChange(newValue, `addPurchaseMaterial[${index}].unitOfMeasure`)
        }
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField {...params} label="Select Unit of Measure" variant="outlined" />
        )}
      />

      <RHFTextField
        name={`addPurchaseMaterial[${index}].quantity`}
        label="Quantity"
        type="number"
        defaultValue={1}
        onChange={(e) => HandleInputChange(e, index)}
      />
      <RHFTextField
        name={`addPurchaseMaterial[${index}].rate`}
        label="Rate"
        type="number"
        defaultValue={0}
        onChange={(e) => HandleInputChange(e, index)}
      />
      <RHFTextField
        name={`addPurchaseMaterial[${index}].amount`}
        label="Amount"
        defaultValue={0}
        InputProps={{
          readOnly: true,
        }}
      />
      <RHFTextField
        name={`addPurchaseMaterial[${index}].gstRate`}
        label="GST Rate"
        defaultValue={0}
        type="number"
        onChange={(e) => HandleInputChange(e, index)}
      />
      <RHFTextField
        name={`addPurchaseMaterial[${index}].gstAmount`}
        label="GST Amount"
        defaultValue={0}
        InputProps={{
          readOnly: true,
        }}
      />
      <RHFTextField
        name={`addPurchaseMaterial[${index}].totalAmount`}
        label="Total Amount"
        defaultValue={0}
        InputProps={{
          readOnly: true,
        }}
      />
      <RHFTextField
        name={`addPurchaseMaterial[${index}].discount`}
        type="number"
        defaultValue={0}
        label="Discount"
      />
      <RHFTextField
        name={`addPurchaseMaterial[${index}].advanceAmount`}
        type="number"
        defaultValue={0}
        label="Advance Amount"
      />
      <RHFTextField name={`addPurchaseMaterial[${index}].comments`} label="Comments" />
      <Button
        sx={{ height: '40px', marginTop: '3px' }}
        variant="contained"
        color="error"
        onClick={() => handleDeleteClick(index)}
        startIcon={<Iconify icon="mdi:trash-outline" />}
      >
        Delete
      </Button>
    </Box>
  );
  const handleDeleteClick = (indexToDelete) => {
    if (indexToDelete === 1) {
      // Delete all elements above index 1
      const updatedList = contentList.slice(0, indexToDelete);
      console.log({ updatedList });
      setContentList(updatedList);
    } else {
      // Delete only one element
      const updatedList = contentList.filter((_, index) => index !== indexToDelete);
      console.log({ updatedList });
      setContentList(updatedList);
    }
  };
  const [contentList, setContentList] = useState([initialContent]);
  const handleButtonClick = () => {
    const newContent = initialContent;
    setContentList([...contentList, newContent]);
  };

  return (
    <div>
      <ModalHeader heading={"Add New Sale Order"}/>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {/* <DialogTitle>ADD New Purchase Order</DialogTitle> */}
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
              sm: 'repeat(3, 1fr)',
            }}
          >

             <RHFAutocomplete
              name="customerId"
              id="customerId"
              options={customerOptions || []}

              value={customerOptions.find((option) => option.customerId === selectedCustomer) || null}
              getOptionLabel={(option) => option.customerName} // Specify the property to display in the input
              renderInput={(params) => (
                <TextField {...params} label="Select Customer" variant="outlined" />
              )}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{ width: '100%', paddingLeft: '3px' }}
                  label="Expected Delivery Date *"
                  value={datesUsed?.expectedDeliveryDate}
                  defaultValue={dayjs(new Date())}
                  onChange={(newValue) => {
                    setDatesUsed((prev) => ({
                      ...prev,
                      expectedDeliveryDate: newValue,
                    }));
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <RHFAutocomplete
              name="locationId"
              id="locationId"
              options={locationsOptions || []}
              value={
                locationsOptions.find((option) => option.locationID === selectedLocation) || null
              }
              onChange={(event, newValue) =>
                setSelectedLocation(newValue ? newValue.locationID : null)
              }
              getOptionLabel={(option) => option.locationName}
              renderInput={(params) => (
                <TextField {...params} label="Select Billing Location" variant="outlined" />
              )}
            />

            <RHFAutocomplete
              name="factoryShippingId"
              id="factoryShippingId"
              options={locationsOptions || []}
              value={
                locationsOptions.find((option) => option.locationID === selectedLocation) || null
              }
              onChange={(event, newValue) =>
                setSelectedShippingLocation(newValue ? newValue.locationID : null)
              }
              getOptionLabel={(option) => option.locationName}
              renderInput={(params) => (
                <TextField {...params} label="Select Shipping Location" variant="outlined" />
              )}
            />

            <RHFTextField
              defaultValue={0}
              type="number"
              name="advanceAmount"
              label="advanceAmount"
            />
            <RHFTextField
              name="gstAmount"
              label="GST Amount"
              InputProps={{
                readOnly: true,
              }}
            />
            <RHFTextField
              name="grandTotalAmount"
              label="Grand Total Amount"
              InputProps={{
                readOnly: true,
              }}
            />
            <RHFTextField name="billToName" label="Bill To Name" />
            <RHFTextField name="billToAddress" label="Billing Address" />
            <RHFTextField name="billToState" label="Bill to state" />
            <RHFTextField name="billToCity" label="Bill to City" />
            <RHFTextField name="billToPincode" label="Billing Pincode" />
            <RHFTextField name="billToGST" label="Bill to GST" />
            <RHFTextField name="billToStateCode" label="Bill to State code" />
            <RHFTextField name="shipToName" label="Ship to Name" />
            <RHFTextField name="shipToAddress" label="Shipping Address" />
            <RHFTextField name="shipToState" label="Ship to State" />
            <RHFTextField name="shipToCity" label="Ship to city" />
            <RHFTextField name="shipToPincode" label="Shipping Pincode" />
            <RHFTextField name="shipToGST" label="Ship to GST" />
            <RHFTextField name="shipToStateCode" label="Ship to state code" />
            {/* <RHFTextField name="companyPhoneNo" label="Ship to state code" />
            <RHFTextField name="companyAccountId" label="Company AccountId" />
            <RHFTextField name="companyEmailId" label="Company EmailId" />
            <RHFTextField name="companyGST" label="Company GST" />
            <RHFTextField name="companyPAN" label="Company PAN" />
            <RHFTextField name="msmeUAMNo" label="MSME UAMNo" />
            <RHFTextField name="companyAccountName" label="Company Account Name" />
            <RHFTextField name="companyAccountNo" label="Company Account No" />
            <RHFTextField name="companyBankName" label="Company Bank Name" />
            <RHFTextField name="companyBankIFSC" label="Company Bank IFSC" />
            <RHFTextField name="companyBankBranch" label="Company Bank Branch" />
            <RHFTextField name="companyStateCode" label="Company State Code" /> */}
            <RHFTextField name="paymentTerm" label="Payment Term" />
            <RHFTextField name="grossTotalAmount" label="Gross Total Amount" />
            <RHFTextField name="gstAmount" label="GST Amount"/>
            <RHFTextField name="advanceAmount" label="Advance Amount" />
          </Box>
          <Box
            marginTop={2}
            display="flex"
            justifyContent="space-between" // Align items to the right
            alignItems="center"
          >
            <h2>Product Sales</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                const newContent = initialContent(contentList.length);
                setContentList([...contentList, newContent]);
              }}
              startIcon={<Iconify icon="mingcute:add-line" />}
              sx={{ margin: '20px' }}
              // disabled={!selectedVendor}
            >
              Add
            </Button>
          </Box>
          {contentList.map((content, index) => (
            <div key={index}>
              {content}
              {index > 0 && (
                <hr style={{ borderTop: '2px solid #ccc', margin: '30px 0', width: '100%' }} />
              )}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" color="primary" variant="contained" loading={isSubmitting}>
            Save
          </LoadingButton>
          {/* <LoadingButton type="submit" color="primary" variant="contained" loading={isSubmitting}>
            {currentData?.ProductName ? 'Update' : 'Save'}
          </LoadingButton> */}
        </DialogActions>
      </FormProvider>
    </div>
  );
}

CreateSaleOrder.propTypes = {
  currentData: PropTypes.object,
  handleClose: PropTypes.any,
};
