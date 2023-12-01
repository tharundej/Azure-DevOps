import React from 'react';
import { CardHeader,Stack,Box ,IconButton,Card,Switch, Typography,Grid,TextField,
    Snackbar,Alert} from '@mui/material';

    import PropTypes from 'prop-types';
    

function SnackBarComponent  ({open,snacbarMessage,severity,onHandleCloseSnackbar})  {
  return (
    <Snackbar
    open={open}
    autoHideDuration={4000}
    onClose={onHandleCloseSnackbar}
    anchorOrigin={{ vertical: "top", horizontal: 'right' }}
  >
    <Alert onClose={onHandleCloseSnackbar} severity={severity} sx={{ width: '100%' }}>
      {snacbarMessage}
    </Alert>
  </Snackbar>
  )
}

SnackBarComponent.propTypes = {
  
    open: PropTypes.string,
    onHandleCloseSnackbar: PropTypes.func,
    severity:PropTypes.string,
    snacbarMessage:PropTypes.string
  };


export default SnackBarComponent