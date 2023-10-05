import PropTypes from 'prop-types';

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { TextField, Button } from '@mui/material';

export default function EducationInformation({ currentUser }) {
  const [defaultValues, setDefaultValues] = useState([
    {
      one: 'a',
      two: 'b',
    },
  ]);

  const obj = {
    one: 'a',
    two: 'b',
  };

  const handleAdd = () => {
    setDefaultValues((prev) => [...prev, obj]);
  };
  useEffect(() => {}, []);
  return (
    <>
      <form>
        {defaultValues.map((item) => (
          <>
            <TextField
              style={{ width: '200px', margin: '5px' }}
              type="text"
              label={item?.one}
              variant="outlined"
            />
            <TextField
              style={{ width: '200px', margin: '5px' }}
              type="text"
              label={item?.two}
              variant="outlined"
            />
          </>
        ))}

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleAdd();
          }}
        >
          Add
        </Button>
      </form>
    </>
  );
}
EducationInformation.propTypes = {
  currentUser: PropTypes.object,
};
