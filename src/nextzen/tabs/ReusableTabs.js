import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Tabs,Tab,Box,Typography} from '@mui/material';
import { styled } from '@mui/system';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function ReusableTabs({ tabLabels, tabContents, changeOfTab,tabsSx }) {
  const [value, setValue] = useState(0);
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(typeof changeOfTab === 'function'){
      changeOfTab(newValue)
    }
    // handleCreatePayrun()
  };
  
  return (
    <Box>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <Tabs 
    value={value} 
    onChange={handleChange} 
    aria-label="dynamic tabs example"  
    TabIndicatorProps={{
    style: { backgroundColor: '#3B82F6',color:'#3B82F6'} 
    
    }}
     >
      {tabLabels.map((label, index) => (
        <Tab label={label} key={index} {...a11yProps(index)}  
        sx={{
          color: value === index ? '#3B82F6' : 'inherit', 
        }}/>
      ))}
    </Tabs>
    </Box>
      {tabContents.map((content, index) => (
        <div key={index} hidden={value !== index}>
          {value === index && (
            <div style={{ padding: '0.25rem' }}  key={index} hidden={value !== index}>
              <Typography> {value === index && content}</Typography>
            </div>
          )}
        </div>
      ))}
     
      </Box>
  );
}
 
ReusableTabs.propTypes = {
  tabLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  tabContents: PropTypes.arrayOf(PropTypes.node).isRequired,
  changeOfTab: PropTypes.any,
  tabsSx: PropTypes.object,
};
export default ReusableTabs;