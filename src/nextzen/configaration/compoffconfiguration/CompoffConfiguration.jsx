import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
  TextField,
  Button,
  Card,
  Grid,
  Autocomplete,
} from '@mui/material';

const CompoffConfiguration = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    childFunctionEducation() {
      handleSubmit();
    },
  }));

  const currentUser = props.currentUser;

  const NewUserSchema = Yup.object().shape({
    country: Yup.string(),
  });

  const [defaultValues, setDefaultValues] = useState([
    {
      selectCompensatory: currentUser?.selectCompensatory || '',
    },
  ]);

  const selectCompensatory = [
    { type: "Leave" },
    { type: "Incashment" },
  ];

  const [expiryday, setExpiryday] = useState('');
  const [amount, setAmount] = useState('');

  const handleSelectCompensatoryChange = (value, index) => {
    const newDefaultValues = [...defaultValues];
    newDefaultValues[index].selectCompensatory = value;
    setDefaultValues(newDefaultValues);
  };

  const handleSubmit = () => {
    // call API here with the updated defaultValues
    console.log("api called");
  };

  return (
    <Card sx={{ paddingTop: '20px' }}>
      <form style={{ padding: '4px' }}>
        {defaultValues?.map((item, index) => (
          <Grid key={index} sx={{ padding: '40px' }}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <Autocomplete
                  name={`selectCompensatory[${index}]`}
                  label="Select Compensatory"
                  options={selectCompensatory.map((Compensatory) => Compensatory.type)}
                  value={item.selectCompensatory}
                  onChange={(event, newValue) => handleSelectCompensatoryChange(newValue, index)}
                  renderInput={(params) => <TextField {...params} label="Select Compensatory" />}
                />
              </Grid>
              {item.selectCompensatory === 'Leave' && (
                <Grid item md={6} xs={12}>
                  <TextField
                    name={`Expiryday[${index}]`}
                    label="Expiry Day"
                    value={expiryday}
                    type='number'
                    onChange={(e) => setExpiryday(e.target.value)}
                  />
                </Grid> 
              )}
              {item.selectCompensatory === 'Incashment' && (
                <Grid item md={6} xs={12}>
                  <TextField
                    name={`amount[${index}]`}
                    label="Amount"
                    value={amount}
                    type='number'
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        ))}
        <Grid container alignItems="center" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={
              handleSubmit
            }
          >
            Submit
          </Button>
        </Grid>
      </form>
    </Card>
  );
});

CompoffConfiguration.propTypes = {
  currentUser: PropTypes.object,
};

export default CompoffConfiguration;
