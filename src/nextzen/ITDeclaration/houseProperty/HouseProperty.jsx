import React, { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
// import { makeStyles } from '@mui/styles';
import { Icon } from '@iconify/react';
import Iconify from 'src/components/iconify/iconify';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Divider from '@mui/material/Divider';
import './houseProperty.css';
import axios from 'axios';
import FileUploader from 'src/nextzen/global/fileUploads/FileUploader';
import { baseUrl } from 'src/nextzen/global/BaseUrl';

const headings = [
  'S.No',
  'Property Reference',
  'Name Of The Owners',
  'Address Of Property',
  'Pan Of Lenders',
  'Loan Amount',
  'Purpose Of Loan',
  'Date Of Sanction Of Loan',
  'Interest Payable',
  'Property Occupied',
  'Share Of Interest',
  "Gross Rental Income",
  'Municipal Taxes Paid',
  'Action',
];

export default function HouseProperty() {

  // const baseUrl = ' https://2d56hsdn-3001.inc1.devtunnels.ms/erp'
  const [reload ,setREload] = useState(false)
 
  const empId = localStorage.getItem('employeeID')
  const cmpId= localStorage.getItem('companyID')
  const token = localStorage.getItem('accessToken')

  const [dates, setDates] = useState({
    start_date: dayjs(new Date()),
    end_date: dayjs(new Date()),
  });
  var [attachedDocumment, setAttachedDocument] = useState([]);
  var [attachedDocummentFileName, setAttachedDocumentFileName] = useState([]);
  const [openAttachmentDilog, setOpenAttchementDilog] = useState(false);
  var [rentFiledsIndex, setRentFieldsIndex] = useState([]);
  var [landLordDocs, setLandLordDocs] = useState([]);
  var [rentDocs, setRentDocs] = useState([]);
  const [landLordDeletedId , setLandLordDeletedID] = useState([])
  const [rentDeletedId , setRentDeletedID] = useState([])
  const [housingData, sethousingData] = useState([]);
  const attchementHandler = () => {
    setOpenAttchementDilog(true);
  };
  const closeAttchementDilod = () => {
    setOpenAttchementDilog(false);
  };
  const handleUploadattchment = (data) => {
    attachedDocumment = data;
    setAttachedDocument(attachedDocumment);
    //  setFormData({ ...formData, [fileContent] :  attachedDocumment});
    setFormData((prevFormData) => ({
      ...prevFormData,
      fileContent: attachedDocumment,
    }));
    console.log(attachedDocumment, data);
  };
  const handleUploadattchmentFileName = (data) => {
    attachedDocummentFileName = data;
    setAttachedDocumentFileName(attachedDocummentFileName);
    setFormData((prevFormData) => ({
      ...prevFormData,
      fileName: attachedDocummentFileName,
    }));
    console.log(attachedDocummentFileName, data);
    setOpenAttchementDilog(false);
  };
  const benak = () => {
    console.log('testing ');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  const [formData, setFormData] = useState({
    propertyReferenceSlNo: null,
    name_of_the_owners: '',
    addressOfProperty: '',
    panOfTheLanders: '',
    amountOfHousingloanTakenFromTheProperty: '',
    purposeOfLoan: '',
    dateOfSanction: dayjs().format('YYYY-MM-DD'),
    interestPaybleOnYear: '',
    isPropertySelfOccupiedOrLetOu: '',
    ifJointPropertyThenEnterInterestRate: '',
    grossRentalAmount: '',
    municipalTaxesPaid: '',
  });

  // Send the payload to your API
  // console.log(payload);

  // You can make an axios request here to send the data to your server.
  const getHousePRoterty = async () => {
    const payload = {
      "companyId": cmpId,
      "employeeId": empId,
      "financialYear":2023
  };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: baseUrl+'getMedicalInsuranceDetails',
      url: baseUrl +'/getHousingProperty',

      headers: {
        Authorization:
       token,  'Content-Type': 'text/plain',
      },
      data: payload,
    };
    const result = await axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          const rowsData = response?.data?.data;
          sethousingData(rowsData);
          console.log(JSON.stringify(response?.data), 'resultMedical');

          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(result, 'resultsreults');
  };
  const addHousingProperity = useCallback(async () => {
    const payload = {
      companyId: cmpId,
      employeeId: empId,
      financialYear: 2023,
      nameOfTheOwners: formData.name_of_the_owners,
      propertyReferenceSlNo: parseFloat(formData.propertyReferenceSlNo),
      addressOfProperty: formData.addressOfProperty,
      panOfTheLanders: formData.panOfTheLanders,
      amountOfHousingloanTakenFromTheProperty: parseFloat(formData.amountOfHousingloanTakenFromTheProperty),
      purposeOfLoan: formData.purposeOfLoan,
      // dateOfSanctionOfLoan: formData.dateOfSanction,
      dateOfSanctionOfLoan: formData.dateOfSanction,
      interestPaybleOnYear: parseFloat(formData.interestPaybleOnYear),
      isPropertySelfOccupiedOrLetOut: formData.isPropertySelfOccupiedOrLetOu,
      ifJointPropertyThenEnterInterestRate: parseFloat(formData.ifJointPropertyThenEnterInterestRate),
      grossRentalAmount: parseFloat(formData.grossRentalAmount),
      muncipalTaxPaid: parseFloat(formData.municipalTaxesPaid),
      documents:landLordDocs,
      oldFields:landLordDeletedId
    };
   
console.log(payload ,"payload")
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: baseUrl + '/housingProperty',
      headers: {
        Authorization:
         token,
        'Content-Type': 'text/plain',
      },
      data: payload,
    };
    axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          const rowsData = response?.data?.data?.rows;
          console.log(JSON.stringify(response.data), 'dataaaa');
          setREload(!reload)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [formData ,landLordDocs]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await addHousingProperity();
  //   };
  //   fetchData();
    
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      await getHousePRoterty();
    };
    fetchData();
    
  }, [reload]);
  const handleLandLordattchment = (fileData) => {
    console.log(fileData, 'getting from uploader ');
    attachedDocummentFileName = fileData?.map((doc) => doc.fileName);
    setAttachedDocumentFileName(attachedDocummentFileName);
    attachedDocumment = fileData?.map((doc) => doc.fileContent);
    setAttachedDocument(attachedDocumment);
    // Create a new array to store the objects
    const newArray = [];
    const transformedData = fileData.map((item) => ({
      id: item.id ? item.id : 0,
      fileName: item.fileName,
      fileContent: item.fileContent,
    }));
    landLordDocs = transformedData;
    setLandLordDocs(landLordDocs);

    console.log(landLordDocs, 'landlordDocs');

    console.error('Arrays must have the same length');
    setOpenAttchementDilog(false);
  };
  const handleRentattchment = (fileData) => {
    console.log(fileData, 'getting from uploader ');
    attachedDocummentFileName = fileData?.map((doc) => doc.fileName);
    setAttachedDocumentFileName(attachedDocummentFileName);
    attachedDocumment = fileData?.map((doc) => doc.fileContent);
    setAttachedDocument(attachedDocumment);
    // Create a new array to store the objects
    const newArray = [];
    const transformedData = fileData.map((item) => ({
      ID: item.id ? item.id : 0,
      fileName: item.fileName,
      fileContent: item.fileContent,
    }));
    rentDocs = transformedData;
    setRentDocs(rentDocs);

    console.log(rentDocs, 'landlordDocs');
    setOpenAttchementDilog(false);
  };
  console.log(rentDocs, 'landlordDocs');
const handleLandLordDeletedID = ( data)=>{
  console.log(data , "delete")
  setLandLordDeletedID( (prevIDs) => [...prevIDs, data])
  console.log(landLordDeletedId, "deletedelete")
}
const handleRentDeletedID = ( data)=>{
  console.log(data , "delete")
  setRentDeletedID( (prevIDs) => [...prevIDs, data])
  console.log(rentDeletedId, "deletedelete")
}
// handle edit
const handleEdit = (rowData) => {
  console.log(rowData ,"rowData1234");
  setLandLordDocs(rowData.documents)
  setFormData({
     employeeId:rowData.employeeId,
     companyId:rowData.companyId,
      propertyReferenceSlNo: rowData.propertyReferenceSlNo,
      name_of_the_owners: rowData.nameOfTheOwners,
      addressOfProperty: rowData.addressOfProperty,
      panOfTheLanders: rowData.panOfTheLanders,
      amountOfHousingloanTakenFromTheProperty: rowData.amountOfHousingloanTakenFromTheProperty,
      purposeOfLoan: rowData.purposeOfLoan,
      dateOfSanction: rowData.dateOfSanction,
      interestPaybleOnYear: rowData.interestPaybleOnYear,
      isPropertySelfOccupiedOrLetOu: rowData.isPropertySelfOccupiedOrLetOu,
      ifJointPropertyThenEnterInterestRate: rowData.ifJointPropertyThenEnterInterestRate,
      grossRentalAmount: rowData.grossRentalAmount,
      municipalTaxesPaid: rowData.muncipalTaxPaid,
    
    // Add other fields as needed
  });

  // Set the attached documents if available
  if (rowData.documents && rowData.documents.length > 0) {
    setLandLordDocs([...rowData.documents]);
  }
};
  return (
    <div>
      <Grid container spacing={2} style={{ marginTop: '1rem' }}>
        {/* search ad filter  */}
        {/* <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="flex-end"
          direction="row"
          style={{ marginBottom: '1rem' }}
        >
          <Grid item>
            <TextField
              sx={{ width: '20vw' }}
              // value={filters.name}
              // onChange={handleFilterName}
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
                border: 'none',
              }}
            />
          </Grid>
          <Grid item>
            <Button className="button">Filter</Button>
          </Grid>
          <Grid item>
            <Button className="button">Report</Button>
          </Grid>
        </Grid> */}
        {/* Row 1 */}
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={4}>
            {/* <Typography >Property Reference Sl.No(Enter 1,2,3 Etc) </Typography> */}
            <TextField
              label="Property Reference Sl.No(Enter 1,2,3 Etc) "
              name="propertyReferenceSlNo"
              value={formData.propertyReferenceSlNo}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            {/* <Typography >Name[S] Of The Owner[S] Of The Property</Typography> */}
            <TextField
              label="Name[S] Of The Owner[S] Of The Property"
              name="name_of_the_owners"
              value={formData.name_of_the_owners}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            {/* <Typography >addressOfProperty Of The Property </Typography> */}
            <TextField
              label="Address Of The Property "
              name="addressOfProperty"
              value={formData.addressOfProperty}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Row 2 */}

        <Grid item container xs={12} spacing={2}>
          <Grid item xs={4}>
            {/* <Typography >PAN Of The Lender(S)</Typography> */}
            <TextField
              label="PAN Of The Lender(S)"
              name="panOfTheLanders"
              value={formData.panOfTheLanders}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            {/* <Typography >Amount Of Housing loan Taken For The Property</Typography> */}
            <TextField
              label="Amount Of Housing loan Taken For The Property"
              name="amountOfHousingloanTakenFromTheProperty"
              value={formData.amountOfHousingloanTakenFromTheProperty}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            {/* <Typography >PurPose Of Loan</Typography> */}
            <TextField
              label="PurPose Of Loan"
              name="purposeOfLoan"
              value={formData.purposeOfLoan}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid item container xs={12} spacing={2}>
          <Grid item xs={4} style={{ paddingTop: '9px' }}>
            {/* <Typography >Date Of Sanction Of Loan</Typography> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  sx={{ width: '100%', paddingLeft: '3px' }}
                  label="Date Of Sanction Of Loan"
                  value={dayjs(formData.dateOfSanction, { format: 'YYYY-MM-DD' })}  // Use the appropriate form data field
                  // defaultValue={dayjs(new Date())}
onChange={(newValue) => {
  console.log(newValue)
  setFormData((prevFormData) => ({
    ...prevFormData,
    dateOfSanction: newValue,
  }));
}}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            {/* <Typography >Intrest Payable On Housing Loan For The Year</Typography> */}
            <TextField
              label="Intrest Payable On Housing Loan For The Year"
              name="interestPaybleOnYear"
              value={formData.interestPaybleOnYear}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            {/* <Typography >Is The Property Self Occupied Or Let out?[See Notebelow]</Typography> */}
            <TextField
              label="Is The Property Self Occupied Or Let out?[See Notebelow]"
              name="isPropertySelfOccupiedOrLetOu"
              value={formData.isPropertySelfOccupiedOrLetOu}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid item container xs={12} spacing={2}>
          <Grid item xs={4}>
            {/* <Typography >IF Joint Property, Then Enter The Share Of Intrest[%] </Typography> */}
            <TextField
              label="IF Joint Property, Then Enter The Share Of Intrest[%]"
              name="ifJointPropertyThenEnterInterestRate"
              value={formData.ifJointPropertyThenEnterInterestRate}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            {/* <Typography >Gross Rental Income</Typography> */}
            <TextField
              label="Gross Rental Income"
              name="grossRentalAmount"
              value={formData.grossRentalAmount}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            {/* <Typography >Less : MUnicipal Taxes Paid :</Typography> */}
            <TextField
              label="Less : Municipal Taxes Paid"
              name="municipalTaxesPaid"
              value={formData.municipalTaxesPaid}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>

        {/* card */}

        <Grid
          item
          container
          xs={12}
          spacing={2}
          alignItems="center"
          justifyContent="center"
          direction="row"
          style={{ marginBottom: '1rem', marginTop: '1rem' }}
        >
          <Paper elevation={3} style={{ marginTop: '1rem' }}>
            <Paper
              elevation={0}
              style={{
                padding: '10px',
                backgroundColor: '#2196f3',
                color: 'white',
                border: 'none',
              }}
            >
              <Typography>Housing Property Calculation</Typography>
            </Paper>
            <Paper elevation={0} style={{ border: 'none' }}>
              <Typography style={{ backgroundColor: '#f0eded', padding: '10px' }}>
                Gross Rental Income
              </Typography>
              <Divider style={{ backgroundColor: 'black' }} />

              <Typography style={{ padding: '10px' }}>Less : Municipal Taxes Paid</Typography>
              <Divider style={{ backgroundColor: 'black' }} />

              <Typography style={{ backgroundColor: '#f0eded', padding: '10px' }}>
                Balance
              </Typography>
              <Divider style={{ backgroundColor: 'black' }} />

              <Typography style={{ padding: '10px' }}>Less : Standard Deduction 30%</Typography>
              <Divider style={{ backgroundColor: 'black' }} />

              <Typography style={{ backgroundColor: '#f0eded', padding: '10px' }}>
                Less : Intest On Housing Loan
              </Typography>
              <Divider style={{ backgroundColor: 'black' }} />

              <Typography style={{ padding: '10px' }}>
                Net Income(loss) From House Property
              </Typography>
            </Paper>
          </Paper>
        </Grid>
        {/* Add more rows as needed */}

        {/* Add more rows as needed */}

        {/* My buttons  */}

        <Grid item container xs={12} spacing={2}>
          <Grid
            item
            container
            xs={6}
            spacing={2}
            alignItems="center"
            justifyContent="flex-Start"
            direction="row"
            style={{ marginBottom: '1rem' }}
          >
            <Grid item>
              <Button className="button" onClick={() => setOpenAttchementDilog(true)}>
                Attchement 
              </Button>
            </Grid>
            <Grid item>
              <Button className="button" onClick={addHousingProperity}>
                Save
              </Button>
            </Grid>
            <Grid item>
              <Button className="button">Cancel</Button>
            </Grid>
          </Grid>
          {/* Add more rows as needed */}

          <Grid
            item
            container
            xs={6}
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
            direction="row"
            style={{ marginBottom: '1rem' }}
          >
            <Grid item>
              <Typography> Total Premium : 0</Typography>
            </Grid>
          </Grid>
          {/* Add more rows as needed */}
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headings.map((heading, index) => (
                <TableCell
                  key={index}
                  style={{
                    backgroundColor: '#F4F6F8',
                    color: '#637381',
                    whiteSpace: 'nowrap', // Prevent text wrapping
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {housingData?.length > 0 && housingData?.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell style={{ textAlign: 'center'}}>{rowIndex + 1}</TableCell>
                <TableCell style={{ textAlign: 'center'}}>{row.propertyReferenceSlNo? row.propertyReferenceSlNo: "-"}</TableCell>
                <TableCell style={{ textAlign: 'center'}}>{row.nameOfTheOwners? row.nameOfTheOwners: "-"}</TableCell>
                <TableCell style={{ textAlign: 'center'}}>{row.addressOfProperty? row.addressOfProperty: "-"}</TableCell>
                <TableCell style={{ textAlign: 'center'}}>{row.panOfTheLanders? row.panOfTheLanders: "-"}</TableCell>
                <TableCell style={{ textAlign: 'center'}}>{row.amountOfHousingloanTakenFromTheProperty? row.amountOfHousingloanTakenFromTheProperty: "-"}</TableCell>
                <TableCell style={{ textAlign: 'center'}}>{row.purposeOfLoan? row.purposeOfLoan: "-"}</TableCell>
                <TableCell style={{ textAlign: 'center'}}>{row.dateOfSanctionOfLoan? row.dateOfSanctionOfLoan: "-"}</TableCell>
                <TableCell style={{ textAlign: 'center'}}>{row.interestPaybleOnYear? row.interestPaybleOnYear: "-"}</TableCell>
                <TableCell style={{ textAlign: 'center'}}>{row.isPropertySelfOccupiedOrLetOu? row.isPropertySelfOccupiedOrLetOu: "-"}</TableCell>
                <TableCell style={{ textAlign: 'center'}}>{row.ifJointPropertyThenEnterInterestRate? row.ifJointPropertyThenEnterInterestRate: "-"}</TableCell>
                <TableCell style={{ textAlign: 'center'}}>{row.grossRentalAmount? row.grossRentalAmount: "-"}</TableCell>
                <TableCell style={{ textAlign: 'center'}}>{row.muncipalTaxPaid? row.muncipalTaxPaid: "-"}</TableCell>  <TableCell style={{ textAlign: 'center' }}>
                      <Button onClick={() => handleEdit(row)}>Edit</Button>
                    </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openAttachmentDilog ? (
        <FileUploader
          showAttachmentDilog={openAttachmentDilog}
          closeAttchementDilod={closeAttchementDilod}
          handleUploadattchmentFileName={handleUploadattchmentFileName}
          handleUploadattchment={handleLandLordattchment}
          previousData={landLordDocs}
          handleDeletedID = {handleLandLordDeletedID}
        />
      ) : null}
    </div>
  );
}
