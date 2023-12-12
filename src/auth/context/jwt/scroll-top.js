import React, { useState, useEffect } from 'react';
import { Fab, useScrollTrigger, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollTop = () => {
  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        color="primary" // You can change the color here
        aria-label="scroll to top"
        onClick={handleClick}
        style={{
            backgroundColor: '#3B82F6', // Set the desired color here
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

const ScrollTopButton = () => {
  return (
    <React.Fragment>
      <ScrollTop />
    </React.Fragment>
  );
};

export default ScrollTopButton;
