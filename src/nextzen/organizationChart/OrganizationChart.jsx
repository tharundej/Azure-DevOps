import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import { baseUrl } from '../global/BaseUrl';
import axios from 'axios';
const OrganizationChart = () => {
  const [selectedManager, setSelectedManager] = useState(null);
  const [orgDatas, setOrgDatas] = useState(null);
  const ApiHit=(obj)=>{
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${baseUrl}/getOrgTree`,
        headers: { 
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk2Nzc5NjF9.0-PrJ-_SqDImEerYFE7KBm_SAjG7sjqgHUSy4PtMMiE', 
          'Content-Type': 'application/json', 
        },
        data : obj
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.data));
        setOrgDatas(response?.data?.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const payload = {
    "companyId": "COMP22",
  }
  useEffect(()=>{
    ApiHit(payload)
  },[])
  const modifiedData = orgDatas?.underlings.map((underling) => ({
    ...underling,
    fullName: underling?.firstName + ' ' + underling?.middleName + ' ' +underling?.lastName,
    combinedDesignation: underling?.designationGrade + ' ' + underling?.designation
  }));
 const  employeeIdCeo = modifiedData?.employeeId;
  console.log(modifiedData);
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
    margin: '0 auto', // Center the card

  };

  const ceoCardStyle = {
    width: '30%', // Adjust the width as needed
    textAlign: 'center',
    margin: '0 auto', // Center the card
  };

  const renderEmployee = (employeeId) => (
    <Grid item key={employee.employeeId} style={gridItemStyle}>
      <Card>
        <CardContent>
          <Typography>{employee.name}</Typography>
          <Typography variant="subtitle2">{employee.role}</Typography>
          <Typography variant="caption">Employee ID: {employee.employeeId}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  const renderManager = (manager) => (
    <Grid container direction="row" spacing={2} key={manager.employeeId} style={{ ...gridItemStyle, display: selectedManager === manager.employeeId || !selectedManager ? 'flex' : 'none', flexDirection: 'row' }}>
      <Grid item>
        {selectedManager && (
          <Button onClick={() => setSelectedManager(null)} style={{ marginBottom: 16 }}>
            <Icon icon="icon-park:back" />
            Back
          </Button>
        )}
        <Card onClick={() => setSelectedManager(manager.employeeId)}>
          <CardContent>
            <Typography>{manager.name}</Typography>
            <Typography variant="subtitle2">{manager.role}</Typography>
            <Typography variant="caption">Employee ID: {manager.employeeId}</Typography>
          </CardContent>
        </Card>
        {selectedManager === manager.employeeId && (
          <div style={{ marginTop: 16 }}>
            <Grid container item direction="row" spacing={2} style={{ flexDirection: 'row' }}>
              {manager.children.map(renderEmployee)}
            </Grid>
          </div>
        )}
      </Grid>
    </Grid>
  );
  
  
  return (
    <div>
      <Card onClick={() => setSelectedManager('CEO')} style={ceoCardStyle}>
        <CardContent>
          <Typography>{orgData.name}</Typography>
          <Typography variant="subtitle2">{orgData.role}</Typography>
          <Typography variant="caption">Employee ID: {orgData.employeeId}</Typography>
        </CardContent>
      </Card>
      <Grid container spacing={2} style={gridContainerStyle}>
        {orgData.children.map(renderManager)}
      </Grid>
    </div>
  );
};

export default OrganizationChart;
