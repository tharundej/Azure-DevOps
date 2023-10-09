import PropTypes from 'prop-types';

import React, { useState, useCallback, useEffect, useMemo, useImperativeHandle,forwardRef } from 'react';
import { TextField, Button } from '@mui/material';

const  EducationInformation=forwardRef((props,ref)=> {
  useImperativeHandle(ref,()=>({
    childFunctionEducation(){
    
    }
  }))
  const currentUser=props.currentUser;
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
})
EducationInformation.propTypes = {
  currentUser: PropTypes.object,
};

export default EducationInformation;
