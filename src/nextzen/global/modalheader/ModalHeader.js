import React from 'react';
 import {Box,Typography} from '@mui/material'

const ModalHeader = ({heading}) => {
  return (
    <Box
      height="30px"
      backgroundColor="#3B82F6"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h6" style={{ color: '#FFFFFF' }}>
       {heading}
      </Typography>
    </Box>
  );
};

export default ModalHeader;
