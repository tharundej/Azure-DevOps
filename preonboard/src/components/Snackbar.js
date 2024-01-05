import React from 'react'
import Snackbar from '@mui/material/Snackbar';
const SnackbarComponent = ({handleClose,open}) => {
  return (
    <>           
         <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
        />
    </>

  )
}

export default Snackbar