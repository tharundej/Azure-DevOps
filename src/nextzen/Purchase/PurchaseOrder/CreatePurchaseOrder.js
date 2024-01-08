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
import {
  getLocationAPI,
  getUnitOfMeasure,
  getVendorAPI,
  getVendorMaterialAPI,
} from 'src/api/Accounts/Common';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import ModalHeader from 'src/nextzen/global/modalheader/ModalHeader';
import { createPurchaseOrderAPI, updatePurchaseOrderAPI } from 'src/api/Accounts/PurchaseOrder';
import SnackBarComponent from 'src/nextzen/global/SnackBarComponent';
import UserContext from 'src/nextzen/context/user/UserConext';
import { formatDateToYYYYMMDD } from 'src/nextzen/global/GetDateFormat';

export default function CreatePurchaseOrder({ currentData, handleClose, getTableData }) {
  const { user } = useContext(UserContext);
  const NewUserSchema = Yup.object().shape({
    paymentTerm: Yup.string().required(),
    grandTotalAmount: Yup.number().required(),
    advanceAmount: Yup.number(),
    companyBillingGST: Yup.string(),
    companyBillingPAN: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      companyId: currentData?.companyId || user?.companyID ? user?.companyID : '',
      expectedDeliveryDate: currentData?.expectedDeliveryDate || '',
      paymentTerm: currentData?.paymentTerm || '',
      vendorId: currentData?.vendorID || 0,
      locationId: currentData?.locationId || '',
      factoryShippingId: currentData?.factoryShippingId || '',
      grandTotalAmount: currentData?.grandTotalAmount || '',
      advanceAmount: currentData?.advanceAmount || 0,
      companyBillingGST: currentData?.companyBillingGST || '',
      companyBillingPAN: currentData?.companyBillingPAN || '',
      purchaseOrderID: currentData?.purchaseOrderID || 0,
      poNumber: currentData?.poNumber || '',
      gstAmount: currentData?.gstAmount || '',
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
  const [vendorOptions, setVendorOptions] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState();
  const [locationsOptions, setLocationsOptions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  const [selectedShippingLocation, setSelectedShippingLocation] = useState();
  const [unitOptions, setUnitOptions] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const fetchVendor = async () => {
    const data = { companyID: user?.companyID ? user?.companyID : '' };
    try {
      const response = await getVendorAPI(data);
      if (response === null) {
        handleCallSnackbar('No Vendor Found. Please Add Vendor', 'warning');
      } else {
        setVendorOptions(response);
        setVendorOptions((prevOptions) => {
          const newOptions = response;
          setSelectedVendor(
            defaultValues.vendorId || (newOptions.length > 0 ? newOptions[0].vendorId : null)
          );

          if (defaultValues?.vendorId) {
            const initialVendor = newOptions.find(
              (option) => option.vendorID === defaultValues?.vendorId
            );
            console.log({ initialVendor });
            handleVendorChange(null, initialVendor);
          }

          return newOptions;
        });
      }
    } catch (error) {
      console.log('API request failed:', error.message);
      handleCallSnackbar(error.message, 'warning');
      setTimeout(() => {
        handleClose(); // Close the dialog on success
      }, 1000);
    }
  };
  const loadVendorMaterial = async () => {
    if (currentData?.purchaseMaterial) {
      const initialContentList = currentData.purchaseMaterial.map((material, index) => {
        console.log('anas', material);
        setValue(
          `addPurchaseMaterial[${index}].materialID`,
          currentData?.purchaseMaterial[index].materialId || 0
        );
        setValue(
          `addPurchaseMaterial[${index}].unitOfMeasure`,
          currentData?.purchaseMaterial[index].unitOfMeasure || ''
        );
        setValue(
          `addPurchaseMaterial[${index}].quantity`,
          currentData?.purchaseMaterial[index].quantity || 0
        );
        setValue(
          `addPurchaseMaterial[${index}].rate`,
          currentData?.purchaseMaterial[index].rate || 0
        );
        setValue(
          `addPurchaseMaterial[${index}].discount`,
          currentData?.purchaseMaterial[index].discount || 0
        );
        setValue(
          `addPurchaseMaterial[${index}].gstRate`,
          currentData?.purchaseMaterial[index].gstRate || 0
        );
        setValue(
          `addPurchaseMaterial[${index}].totalAmount`,
          currentData?.purchaseMaterial[index].totalAmount || 0
        );
        setValue(
          `addPurchaseMaterial[${index}].comments`,
          currentData?.purchaseMaterial[index].comments || ''
        );
        return initialContent(index);
      });
      setNewIndex(currentData.purchaseMaterial.length);
      setContentList(initialContentList);
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
  const fetchUnits = async () => {
    try {
      const response = await getUnitOfMeasure();
      if (response === null) {
        handleCallSnackbar('No Units Found. Please Add Units', 'warning');
      } else {
        setUnitOptions(response);
        setSelectedUnit(response.length > 0 ? response[0] : null);
      }
    } catch (error) {
      console.log('API request failed:', error.message);
      handleCallSnackbar(error.message, 'warning');
    }
  };

  useEffect(() => {
    fetchLocation();
    fetchVendor();
    fetchUnits();
  }, []);

  const [vendorMaterials, setVendorMaterials] = useState([]);
  const [selectedVendorMaterial, setSelectedVendorMaterial] = useState(null);
  const handleVendorChange = async (event, newValue) => {
    try {
      if (newValue) {
        const data = {
          companyID: user?.companyID ? user?.companyID : '',
          vendorID: newValue.vendorID || 0,
        };
        setSelectedVendor(newValue.vendorID || 0);
        const response = await getVendorMaterialAPI(data);
        console.log('Vendor Material Response:', response);
        if (response === null) {
          handleCallSnackbar('No Material Found. Please Add Material', 'warning');
        } else {
          setVendorMaterials(response);
          setSelectedVendorMaterial(response ? response[0].id : null);
        }
      }
    } catch (error) {
      console.log('API request failed:', error.message);
      handleCallSnackbar(error.message, 'warning');
    }
  };
  useEffect(() => {
    loadVendorMaterial();
  }, [vendorMaterials]);
  const HandleInputChange = (e, index) => {
    setValue(e?.target?.name, e?.target?.value);
    updateCalculatedValues(index);
  };
  const HandleDropDownChange = (selectedValue, fieldName, index, gstRate, price) => {
    setValue(fieldName, selectedValue);
    if (gstRate) {
      setValue(`addPurchaseMaterial[${index}].rate`, price ? price : 0);
      setValue(`addPurchaseMaterial[${index}].gstRate`, gstRate ? gstRate : 0);
      setValue(`addPurchaseMaterial[${index}].quantity`, 1);
    }
    updateCalculatedValues(index);
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
    calculateGrandTotal();
  };
  const calculateGrandTotal = () => {
    let grandTotal = 0;
    let grandGstAmount = 0;
    for (let i = 0; i < watch('addPurchaseMaterial')?.length; i++) {
      const itemTotalAmount = watch(`addPurchaseMaterial[${i}].totalAmount`) || 0;
      grandTotal += itemTotalAmount;
      const itemTotalGstAmount = watch(`addPurchaseMaterial[${i}].gstAmount`) || 0;
      grandGstAmount += itemTotalGstAmount;
    }
    setValue('grandTotalAmount', grandTotal);
    setValue('gstAmount', grandGstAmount);
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snacbarMessage, setSnacbarMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const handleCallSnackbar = (message, severity) => {
    setOpenSnackbar(true);
    setSnacbarMessage(message);
    setSeverity(severity);
  };
  const HandleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
      <RHFAutocomplete
        name={`addPurchaseMaterial[${index}].materialID`}
        id={`addPurchaseMaterial[${index}].materialID`}
        options={vendorMaterials || []}
        onChange={(event, newValue) =>
          HandleDropDownChange(
            newValue?.materialID,
            `addPurchaseMaterial[${index}].materialID`,
            index,
            newValue?.gstRate,
            newValue?.materialPrice
          )
        }
        value={
          watch(`addPurchaseMaterial[${index}].materialID`)
            ? vendorMaterials.find(
                (option) => option.materialID === watch(`addPurchaseMaterial[${index}].materialID`)
              ) || null
            : null
        }
        getOptionLabel={(option) => option.materialName}
        renderInput={(params) => (
          <TextField {...params} label="Select Vendor Material" variant="outlined" />
        )}
      />
      <RHFAutocomplete
        name={`addPurchaseMaterial[${index}].unitOfMeasure`}
        id={`addPurchaseMaterial[${index}].unitOfMeasure`}
        options={unitOptions || []}
        onChange={(event, newValue) =>
          HandleDropDownChange(newValue, `addPurchaseMaterial[${index}].unitOfMeasure`, index)
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
        onChange={(e) => HandleInputChange(e, index)}
      />
      <RHFTextField
        defaultValue=""
        name={`addPurchaseMaterial[${index}].comments`}
        label="Comments"
        onChange={(e) => HandleInputChange(e, index)}
      />
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
  const [newIndex, setNewIndex] = useState(0);
  const handleAddContent = () => {
    setNewIndex(newIndex + 1);
    const newContent = initialContent(newIndex);
    setContentList((prevList) => [...prevList, newContent]);
    console.log(vendorMaterials, 'vendorMaterials');
  };
  const handleDeleteClick = (index) => {
    setValue(`addPurchaseMaterial[${index}].totalAmount`, 0);
    setValue(`addPurchaseMaterial[${index}].materialID`, 0);
    setContentList((prevList) => {
      const updatedList = [...prevList];
      updatedList[index] = '';
      return updatedList;
    });
  };
  const [contentList, setContentList] = useState([]);
  useEffect(() => {
    calculateGrandTotal();
  }, [contentList]);
  const onSubmit = handleSubmit(async (data) => {
    console.log("watch('addPurchaseMaterial')", watch('addPurchaseMaterial'));
    data.addPurchaseMaterial = watch('addPurchaseMaterial')?.filter(
      (material) => material?.materialID !== undefined && material?.materialID !== 0
    );
    if (!data.addPurchaseMaterial || data.addPurchaseMaterial.length === 0) {
      handleCallSnackbar('Please Add at least one Material', 'warning');
      return;
    }
    data?.addPurchaseMaterial?.forEach((material, index) => {
      data.addPurchaseMaterial[index].materialID = parseInt(material.materialID) || 0;
      data.addPurchaseMaterial[index].quantity = parseFloat(material.quantity) || 0;
      data.addPurchaseMaterial[index].rate = parseFloat(material.rate) || 0;
      data.addPurchaseMaterial[index].amount = parseFloat(material.amount) || 0;
      data.addPurchaseMaterial[index].gstRate = parseFloat(material.gstRate) || 0;
      data.addPurchaseMaterial[index].gstAmount = parseFloat(material.gstAmount) || 0;
      data.addPurchaseMaterial[index].discount = parseFloat(material.discount) || 0;
    });
    console.log('🚀 ~ file: AddTimeProject.jsx:93 ~ onSubmit ~ data:', data);
    console.log('uyfgv');
    data.expectedDeliveryDate = formatDateToYYYYMMDD(datesUsed?.expectedDeliveryDate);
    data.vendorId = selectedVendor;
    data.locationId = selectedLocation;
    data.factoryShippingId = selectedShippingLocation;
    console.log('Final Payload:', data);
    try {
      // let response = await createPurchaseOrderAPI(data);
      let response = '';
      // creategstInformationAPI(data);
      if (currentData?.poNumber) {
        response = await updatePurchaseOrderAPI(data);
      } else {
        response = await createPurchaseOrderAPI(data);
      }
      console.log('Create success', response);
      handleCallSnackbar(response.message, 'success');
      reset(); // Reset the form values
      setTimeout(() => {
        handleClose(); // Close the dialog on success
      }, 1000);
      currentData?.poNumber ? '' : getTableData();
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
        <ModalHeader heading={'Add New Purchase Order'} />
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
              name="vendorId"
              id="vendorId"
              options={vendorOptions || []}
              onChange={handleVendorChange}
              value={vendorOptions.find((option) => option.vendorID === selectedVendor) || null}
              getOptionLabel={(option) => option.vendorName} // Specify the property to display in the input
              renderInput={(params) => (
                <TextField {...params} label="Select Vendor" variant="outlined" />
              )}
            />
            <RHFTextField name="paymentTerm" label="Payment Term" />
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
                locationsOptions.find((option) => option.locationID === selectedShippingLocation) ||
                null
              }
              onChange={(event, newValue) =>
                setSelectedShippingLocation(newValue ? newValue.locationID : null)
              }
              getOptionLabel={(option) => option.locationName}
              renderInput={(params) => (
                <TextField {...params} label="Select Shipping Location" variant="outlined" />
              )}
            />
            <RHFTextField name="companyBillingGST" label="Company Billing GST" />
            <RHFTextField name="companyBillingPAN" label="Company Billing PAN" />
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
          </Box>
          <Box
            marginTop={2}
            display="flex"
            justifyContent="space-between" // Align items to the right
            alignItems="center"
          >
            <h2>Purchase Material</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddContent}
              startIcon={<Iconify icon="mingcute:add-line" />}
              sx={{ margin: '20px' }}
              disabled={!selectedVendor}
            >
              Add
            </Button>
          </Box>
          {contentList.map((content, index) => (
            <div key={index}>
              {content}
              {index > 0 && content && (
                <hr style={{ borderTop: '2px solid #ccc', margin: '30px 0', width: '100%' }} />
              )}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          {/* <LoadingButton type="submit" color="primary" variant="contained" loading={isSubmitting}>
            Save
          </LoadingButton> */}
          <LoadingButton type="submit" color="primary" variant="contained" loading={isSubmitting}>
            {currentData?.poNumber ? 'Update' : 'Save'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </div>
  );
}

CreatePurchaseOrder.propTypes = {
  currentData: PropTypes.object,
  handleClose: PropTypes.any,
};
