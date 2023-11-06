// ReusableForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, Button, Container, Grid } from '@mui/material';
import axios from 'axios';

const ReusableForm = ({ apiEndpoint, fields }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Fetch form data from API if needed
    axios.get(apiEndpoint)
      .then(response => {
        // Assuming the API response is an object with keys corresponding to form fields
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Error fetching form data:', error);
      });
  }, [apiEndpoint]);

  const handleChange = (field, value) => {
    const fieldValue = field.type === 'autocomplete' ? value.label : value;
   
    setFormData(prevData => ({ ...prevData, [field]: fieldValue }));
  };

  const handleSubmit = () => {
    // Send form data to the API
    axios.post(apiEndpoint, formData)
      .then(response => {
        console.log('Form submitted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error submitting form:', error);
      });
  };

  return (
    <Container>
      <form>
        <Grid container spacing={2}>
          {fields.map(field => (
            <Grid item xs={4} key={field.id}>
              {field.type === 'autocomplete' ? (
                <Autocomplete
                  options={field.options}
                  getOptionLabel={option => option.label}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label={field.label}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                  value={formData[field.id] || null}
                  onChange={(event, newValue) => handleChange(field.id, newValue)}
                />
              ) : field.type === 'date' ? (
                <TextField
                  label={field.label}
                  type="date"
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              ) : (
                <TextField
                  label={field.label}
                  fullWidth
                  variant="outlined"
                  value={formData[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              )}
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ReusableForm;
