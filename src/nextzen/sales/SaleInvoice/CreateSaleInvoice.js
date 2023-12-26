import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import { getLocationAPI, getUnitOfMeasure, getVendorAPI, getListofSoNumberAPI } from 'src/api/Accounts/Common';

import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import UserContext from 'src/nextzen/context/user/UserConext';

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

export default function CreateSaleInvoice({ currentData, handleClose }) {
  const { user } = useContext(UserContext);
  const NewUserSchema = Yup.object().shape({
    name: Yup.string(),
    status: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      ProductName: currentData?.ProductName || '',
      ProductCategory: currentData?.ProductCategory || '',
      hsnID: currentData?.hsnID || '',
      status: currentData?.status || '',
      companyId: user?.companyID ? user?.companyID : '',
      salesOrderNo: currentData?.salesOrderNo || '',
    }),
    [currentData]
  );

  const [vendorMaterials, setVendorMaterials] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [salesOrderOptions, setSalesOrderOptions] = useState();
  const [selectedSalesOrder, setSelectedSalesOrder] = useState();

  const [errorMessage, setErrorMessage] = useState('');
  const [selectedUnit, setSelectedUnit] = useState(null);
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

  const fetchSalesOrder = async () => {
    try {
      const data = {
        companyId: user?.companyID ? user?.companyID : '',
      };
      const response = await getListofSoNumberAPI(data);
      if (response === null) {
        handleCallSnackbar('No Slaes Order Found. Please Add Sales Order', 'warning');
      } else {
        setSalesOrderOptions(response);
        setSelectedSalesOrder(
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
    fetchSalesOrder();
  }, []);
  // const handlePurchaseOrderChange = async (event, newValue) => {
  //   console.log('newValue', newValue);
  //   try {
  //     const data = {
  //       companyId: user?.companyID ? user?.companyID : '',
  //       poNumber: newValue?.poNumber ? newValue?.poNumber : '',
  //     };
  //     const response = await ListPurchaseOrderDetailsAPI(data);
  //     console.log({ response });
  //     if (response === null) {
  //       handleCallSnackbar('No Purchase Order Found. Please Add Purchase Order', 'warning');
  //     } else {
  //       setValue('poNumber', response?.poNumber);
  //       setValue('PODate', response?.poDate);
  //       setValue('ExpectedDeliveryDate', response?.expectedDeliveryDate);
  //       setValue('paymentMode', response?.paymentTerm);
  //       setValue('vendorId', response?.vendorId ? response?.vendorId : 0);
  //       setValue('locationId', response?.locationId ? response?.locationId : 0);
  //       setValue('VendorName', response?.vendorName);
  //       setValue('VendorAddress', response?.vendorAddress);
  //       setValue('FactoryShippingAddress', response?.factoryShippingAddress);
  //       const materialArray = Object.values(response?.purchaseMaterial || {});
  //       setContentList(materialArray);
  //       console.log(materialArray);
  //     }
  //   } catch (error) {
  //     console.log('API request failed:', error.message);
  //     handleCallSnackbar(error.message, 'warning');
  //   }
  // };

  const onSubmit = handleSubmit(async (data) => {
    console.log('🚀 ~ file: AddTimeProject.jsx:93 ~ onSubmit ~ data:', data);
    console.log('uyfgv');
    try {
      console.log(data, 'data111ugsghghh');

      const response = await instance.post('addPurchaseOrder', data).then(
        (successData) => {
          console.log('sucess', successData);
        },
        (error) => {
          console.log('lllll', error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
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
        name={`addPurchaseMaterial[${index}].materialId`}
        id={`addPurchaseMaterial[${index}].materialId`}
        options={vendorMaterials || []}
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
  }, []);
  const [contentList, setContentList] = useState([initialContent]);
  const handleButtonClick = () => {
    const newContent = initialContent;
    setContentList([...contentList, newContent]);
  };

  return (
    <div>
      <ModalHeader heading={"Add New Sales Invoice"} />
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Add New Sales Invoice</DialogTitle>

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
              name="poId"
              id="poId"
              options={salesOrderOptions || []}
              // onChange={handlePurchaseOrderChange}
              getOptionLabel={(option) => option.salesOrderNo}
              renderInput={(params) => (
                <TextField {...params} label="Select SO Number" variant="outlined" />
              )}
            />
            <RHFTextField name="SO Number" label="SO Number" />
            <RHFTextField name="Invoice Number" label="Invoice Number" />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{ width: '100%', paddingLeft: '3px' }}
                  label="Invoice Date"
                  // value={datesUsed?.expectedDeliveryDate}
                  defaultValue={dayjs(new Date())}
                  // onChange={(newValue) => {
                  //   setDatesUsed((prev) => ({
                  //     ...prev,
                  //     expectedDeliveryDate: newValue,
                  //   }));
                  // }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <RHFTextField name="Material Name" label="Material Name" />
            <RHFTextField name="HSN Code" label="HSN Code" />

             {/* <RHFAutocomplete
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
      /> */}
      <RHFTextField type="number" name="Quantity" label="Quantity" />
      <RHFTextField type="number" name="Rate" label="Rate" />
            <RHFTextField type="number" name="SGST" label="SGST" />
            <RHFTextField type="number" name="CGST" label="CGST" />
            <RHFTextField type="number" name="IGST" label="IGST" />

            <RHFTextField type="number" name="Discount" label="Discount" />

          </Box>
          {/* <Box
            marginTop={2}
            display="flex"
            justifyContent="space-between" // Align items to the right
            alignItems="center"
          >
            <h2>Purchase Material</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={handleButtonClick}
              startIcon={<Iconify icon="mingcute:add-line" />}
              sx={{ margin: '20px' }}
            >
              Add
            </Button>
          </Box> */}
            <Box
            marginTop={2}
            display="flex"
            justifyContent="space-between" // Align items to the right
            alignItems="center"
          >
            <h2>Product Details</h2>
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
        </DialogActions>
      </FormProvider>
    </div>
  );
}

CreateSaleInvoice.propTypes = {
  currentData: PropTypes.object,
  handleClose: PropTypes.any,
};
