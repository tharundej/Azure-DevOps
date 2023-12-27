import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import { baseImageUrl, baseUrl } from '../../global/BaseUrl';
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../../context/user/UserConext';
const OrganizationChart = () => {
  const [selectedManager, setSelectedManager] = useState(null);
  var [emp, setEmp] = useState();
  const [orgDatas, setOrgDatas] = useState(null);
  const [allData, setAllData] = useState([]);
  const { user } = useContext(UserContext);
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
    // companyId: 'COMP22',
    companyId:(user?.companyID)?user?.companyID:''
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
    const firstDesignation = details?.length > 0 && details[0] ? details[0].combinedDesignation : undefined;
  const Under =
    orgDatas?.underlings?.map((underling) => ({
      ...underling,
      fullName: underling?.firstName + ' ' + underling?.middleName + ' ' + underling?.lastName,
      combinedDesignation: underling?.designationGrade + ' ' + underling?.designation,
    })) || [];

  // console.log(Under, 'under');
  // console.log(orgDatas);
  // console.log('details', details);

  const handleManagerClick = (employeeId) => {
    // Call the API to get manager details
    const payload = {
      employeeId: employeeId,
      companyId:(user?.companyID)?user?.companyID:''
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
        emp = response?.data?.data;
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

      console.log(Employees, 'Employees');
  };
  console.log(Under, 'final');
console.log(Under.map((name)=>name.combinedDesignation),'abbb')
  console.log(emp, 'emp');
  return (
    <>
      <Grid container style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <Grid item style={{ width: '33%' }}>
          {/* <Typography
            variant="subtitle1"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#3B82F6',
            }}
          >
            CEO
          </Typography> */}
          <Card
            style={{
              width: '80%',
              margin: '1%',
              borderRadius: '15px',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              height: '13%',
              padding: '10px',
              marginBottom:'10px',
              cursor:'pointer'
            }}
            onClick={() => setSelectedManager('CEO')}
          >
            <Grid style={{ width: '30%' }}>
              <img
                src={
                  details?.profilePicture
                    ? baseImageUrl + details?.profilePicture
                    : `https://ui-avatars.com/api/?name=${details?.firstName}`
                }
                // alt="NO Image"
                style={{
                  height: '50px',
                  width: '50px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  marginLeft: '10px',
                  marginTop: '10px',
                }}
              />
            </Grid>
            <Grid style={{ width: '70%' }}>
              {details &&
                details.map((detail) => (
                  <Grid key={detail.employeeId}>
                    <Typography>{detail?.fullName}</Typography>
                    <Typography variant="subtitle2">{detail?.combinedDesignation}</Typography>
                    <Typography variant="caption">Employee ID: {detail?.employeeId}</Typography>
                  </Grid>
                ))}
            </Grid>
          </Card>
        </Grid>
        <Grid item style={{ width: '33%' }}>
          {/* <Typography
            variant="subtitle1"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#3B82F6',
            }}
          >
            Manager
          </Typography> */}
          {Under &&
            Under.map((manager) => (
              <Card
                key={manager.employeeId}
                style={{
                  width: '80%',
                  margin: '1%',
                  borderRadius: '15px',
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  height: '13%',
                  padding: '10px',
                  marginBottom:'10px',
                  cursor:'pointer',
                  backgroundColor: selectedManager === manager.employeeId ? '#3B82F6' : 'white',
                  color: selectedManager === manager.employeeId ? 'white' : '#000',
                }}
              >
                <Grid style={{ width: '30%' }}>
                  <img
                    src={
                      manager?.profilePicture
                        ? baseImageUrl + manager?.profilePicture
                        : `https://ui-avatars.com/api/?name=${manager?.firstName}`
                    }
                    // alt="NO Image"
                    style={{
                      height: '50px',
                      width: '50px',
                      borderRadius: '50px',
                      objectFit: 'cover',
                      objectPosition: 'center center',
                      marginLeft: '10px',
                      marginTop: '10px',
                    }}
                  />
                </Grid>
                <Grid
                  style={{ width: '70%' }}
                  onClick={() => handleManagerClick(manager?.employeeId)}
                >
                  <Typography>
                    {manager.firstName + ' ' + manager.middleName + ' ' + manager.lastName}
                  </Typography>
                  <Typography variant="subtitle2">
                    {manager.designationGrade + ' ' + manager.designation}
                  </Typography>
                  <Typography variant="caption">Employee ID: {manager?.employeeId}</Typography>
                </Grid>
              </Card>
            ))}
        </Grid>
        <Grid item style={{ width: '33%' }}>
          {/* <Typography
            variant="subtitle1"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#3B82F6',
            }}
          >
            Employees
          </Typography> */}
          
          {!allData?.length && !selectedManager && (
            
    <Typography variant="subtitle1" style={{ marginLeft: '20px', padding: '10px' }}>
      Select a {firstDesignation} to see Employees
    </Typography>
  )}
          {!allData?.length && selectedManager && (
            <Typography variant="subtitle1" style={{ marginLeft: '20px', padding: '10px' }}>
              No Team Members
            </Typography>
          )}
          {allData &&
            allData.map((allData) => (
              <Card
                style={{
                  width: '80%',
                  margin: '1%',
                  borderRadius: '15px',
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  height: '100px',
                  padding: '10px',
                  marginBottom:'10px'
                }}
                onClick={() => setSelectedManager('CEO')}
              >
                <Grid style={{ width: '30%' }}>
                  <img
                    src={
                      allData?.profilePicture
                        ? baseImageUrl + allData.profilePicture
                        : `https://ui-avatars.com/api/?name=${allData?.firstName}`
                    }
                    // alt="NO Image"
                    style={{
                      height: '50px',
                      width: '50px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      objectPosition: 'center center',
                      marginLeft: '10px',
                      marginTop: '10px',
                    }}
                  />
                </Grid>
                <Grid style={{ width: '70%' }}>
                  <Grid key={allData.employeeId}>
                    <Typography>{allData?.fullName}</Typography>
                    <Typography variant="subtitle2">{allData?.combinedDesignation}</Typography>
                    <Typography variant="caption">Employee ID: {allData?.employeeId}</Typography>
                  </Grid>
                </Grid>
              </Card>
            ))}
        </Grid>
      </Grid>
    </>
  );
};

export default OrganizationChart;