import React from 'react'

import PropTypes from 'prop-types';

import { Snackbar,Alert } from '@mui/material'

const SnackBar = ({open,severity,message,handleCloseSnackBar}) => {
   

    const handleClick = () => {
      
    };
  
    const handleClose = (event, reason) => {
        handleCloseSnackBar()
    };
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
  )
}

SnackBar.propTypes = {
    open: PropTypes.string,
    severity: PropTypes.string,
    message:PropTypes.string,
    handleCloseSnackBar:PropTypes.any
  };

export default SnackBar