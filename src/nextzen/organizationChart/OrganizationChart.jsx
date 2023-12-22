import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import { baseUrl } from '../global/BaseUrl';
import axios from 'axios';
import { height } from '@mui/system';
const OrganizationChart = () => {
  const [selectedManager, setSelectedManager] = useState(null);
  var [emp, setEmp] = useState();
  const [orgDatas, setOrgDatas] = useState(null);
  const [allData, setAllData] = useState([]);
  // const [ceoDetails, setCeoDetails] = useState([]);
  const ApiHit = (obj) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/getOrgTree`,
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE',
        'Content-Type': 'application/json',
      },
      data: obj,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data.data));
        setOrgDatas(response?.data?.data);
        // setSelectedManager(employeeId);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const payload = {
    companyId: 'COMP22',
  };
  useEffect(() => {
    ApiHit(payload);
  }, []);

  const details =
    orgDatas?.details?.map((details) => ({
      ...details,
      fullName: details?.firstName + ' ' + details?.middleName + ' ' + details?.lastName,
      combinedDesignation: details?.designationGrade + ' ' + details?.designation,
    })) || null;
  const Under =
    orgDatas?.underlings?.map((underling) => ({
      ...underling,
      fullName: underling?.firstName + ' ' + underling?.middleName + ' ' + underling?.lastName,
      combinedDesignation: underling?.designationGrade + ' ' + underling?.designation,
    })) || [];

  console.log(Under, 'under');
  console.log(orgDatas);
  console.log('details', details);
  const orgData = {
    name: 'Sreedhar Reddy Manikanti',
    role: 'IT : Project Manager',
    employeeId: 'EMP001',
    children: [
      {
        name: 'Ramanaiah Bandili',
        role: 'IT : Vice President Engineering',
        employeeId: 'EMP002',
        children: [
          { name: 'Employee 1.1', role: 'Software Engineer', employeeId: 'EMP003' },
          { name: 'Employee 1.2', role: 'Software Engineer', employeeId: 'EMP004' },
          { name: 'Employee 1.3', role: 'UI/UX Designer', employeeId: 'EMP005' },
        ],
      },
      {
        name: 'Benak',
        role: 'IT : Vice President Engineering',
        employeeId: 'EMP006',
        children: [
          { name: 'Employee 2.1', role: 'Software Engineer', employeeId: 'EMP007' },
          { name: 'Employee 2.2', role: 'Software Engineer', employeeId: 'EMP008' },
          { name: 'Employee 2.3', role: 'UI/UX Designer', employeeId: 'EMP009' },
        ],
      },
      {
        name: 'Benak1',
        role: 'IT : Vice President Engineering',
        employeeId: 'EMP007',
        children: [
          { name: 'Employee 2.1', role: 'Software Engineer', employeeId: 'EMP007' },
          { name: 'Employee 2.2', role: 'Software Engineer', employeeId: 'EMP008' },
          { name: 'Employee 2.3', role: 'UI/UX Designer', employeeId: 'EMP009' },
        ],
      },
      {
        name: 'Benak2',
        role: 'IT : Vice President Engineering',
        employeeId: 'EMP008',
        children: [
          { name: 'Employee 2.1', role: 'Software Engineer', employeeId: 'EMP007' },
          { name: 'Employee 2.2', role: 'Software Engineer', employeeId: 'EMP008' },
          { name: 'Employee 2.3', role: 'UI/UX Designer', employeeId: 'EMP009' },
        ],
      },
      {
        name: 'Benak3',
        role: 'IT : Vice President Engineering',
        employeeId: 'EMP009',
        children: [
          { name: 'Employee 2.1', role: 'Software Engineer', employeeId: 'EMP007' },
          { name: 'Employee 2.2', role: 'Software Engineer', employeeId: 'EMP008' },
          { name: 'Employee 2.3', role: 'UI/UX Designer', employeeId: 'EMP009' },
        ],
      },
      {
        name: 'Benak4',
        role: 'IT : Vice President Engineering',
        employeeId: 'EMP0010',
        children: [
          { name: 'Employee 2.1', role: 'Software Engineer', employeeId: 'EMP007' },
          { name: 'Employee 2.2', role: 'Software Engineer', employeeId: 'EMP008' },
          { name: 'Employee 2.3', role: 'UI/UX Designer', employeeId: 'EMP009' },
        ],
      },
      // ... other managers and employees
    ],
  };

  const gridContainerStyle = {
    marginTop: 16,
  };

  const gridItemStyle = {
    width: '200px', // Adjust the width as needed
    textAlign: 'center',
     margin: '10px', // Center the card
    height:'200px'
  };

  const ceoCardStyle = {
    width: '30%', // Adjust the width as needed
    textAlign: 'center',
    margin: '0 auto', // Center the card
  };

  const renderEmployee = (data) => (
    <Grid container item direction='row' key={data.employeeId} style={{gridItemStyle,display:'flex',flexDirection: 'row',}}>
        <Card>
        <CardContent>
          <Typography>{data.fullName}</Typography>
          <Typography>{data.firstName + ' ' + data.middleName + ' ' + data.lastName}</Typography>
          <Typography variant="subtitle2">
            {data.designationGrade + ' ' + data.designation}
          </Typography>
          <Typography variant="caption">Employee ID: {data.employeeId}</Typography>
        </CardContent>
        </Card>
      
    </Grid>
  );
  const handleManagerClick = (employeeId) => {
    // Call the API to get manager details
    const payload = {
      employeeId: employeeId,
      companyId: 'COMP22',
    };
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/getOrgTree`,
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE',
        'Content-Type': 'application/json',
      },
      data: payload,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data.data);
        emp = response?.data?.data
        setEmp(emp);
        setSelectedManager(employeeId);
        const employees =
          emp?.underlings?.map((underling) => ({
            ...underling,
            fullName: `${underling.firstName} ${underling.middleName} ${underling.lastName}`,
            combinedDesignation: `${underling.designationGrade} ${underling.designation}`,
            employeeId: underling.employeeId,
          })) || [];

        setAllData(employees);
      })
      .catch((error) => {
        console.log(error);
      });
    const Employees =
      emp?.underlings?.map((underling) => ({
        ...underling,
        fullName: `${underling.firstName} ${underling.middleName} ${underling.lastName}`,
        combinedDesignation: `${underling.designationGrade} ${underling.designation}`,
        employeeId: underling.employeeId,
      })) || [];


    console.log(allData, 'final');
    console.log(Employees, 'Employees');
    console.log(emp, 'emp');
  };
  const renderManager = (manager) => (
    <Grid
      container
      direction="row"
      spacing={2}
      key={manager.employeeId}
      style={{
        ...gridItemStyle,
        display: selectedManager === manager.employeeId || !selectedManager ? 'flex' : 'none',
        flexDirection: 'row',
      }}
    >
      <Grid item>
        {selectedManager && (
          <Button onClick={() => setSelectedManager(null)} style={{ marginBottom: 16 }}>
            <Icon icon="icon-park:back" />
            Back
          </Button>
        )}
        <Card onClick={() => handleManagerClick(manager.employeeId)}>
          <CardContent>
            <Typography>
              {manager.firstName + ' ' + manager.middleName + ' ' + manager.lastName}
            </Typography>
            <Typography variant="subtitle2">
              {manager.designationGrade + ' ' + manager.designation}
            </Typography>
            <Typography variant="caption">Employee ID: {manager.employeeId}</Typography>
          </CardContent>
        </Card>
        {selectedManager === manager.employeeId && (
          <div style={{ marginTop: 16 }}>
            <Grid container item direction="row" spacing={2} style={{ flexDirection: 'row' }}>
              {/* {manager.children.map(renderEmployee)} */}
              {!allData?.length && <Typography variant="subtitle1" style={{marginLeft:'20px',padding:'10px'}}>No Team Members</Typography>}
              {allData && allData.map((Und) => renderEmployee(Und))}
              {console.log(manager, 'manaaaa')}
            </Grid>
          </div>
        )}
      </Grid>
    </Grid>
  );

  console.log();
  return (
    <div>
      <Card onClick={() => setSelectedManager('CEO')} style={ceoCardStyle}>
        <CardContent>
          {details &&
            details.map((detail) => (
              <div key={detail.employeeId}>
                <Typography>{detail.fullName}</Typography>
                <Typography variant="subtitle2">{detail.combinedDesignation}</Typography>
                <Typography variant="caption">Employee ID: {detail.employeeId}</Typography>
              </div>
            ))}
        </CardContent>
      </Card>
      <Grid container spacing={2} style={gridContainerStyle}>
        {/*  {orgDatas.underlings.map(renderManager)} */}
        {Under && Under.map((Und) => renderManager(Und))}
      </Grid>
    </div>
  );
};

export default OrganizationChart;
