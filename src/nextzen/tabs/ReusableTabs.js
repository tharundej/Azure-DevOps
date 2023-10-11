import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/system'; // Import styled from @mui/system

const CustomTab = styled(Tab)(({ theme }) => ({
  borderRadius: '16px',
  padding: '8px 16px',
  marginRight: '8px',
  backgroundColor: "#fff",
  '&.Mui-selected': {
    backgroundColor: "#DFEBFE",
    color:"#3B82F6"
  },
  '&.MuiTab-root': {
    borderBottom: 'none', 
  },
  '&:first-child': {
    marginLeft: '6px', // Add left margin to the first tab
  },
}));

function ReusableTabs({ tabLabels, tabContents }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{paddingBottom:"20px"}}
        TabIndicatorProps={{ style: { display: 'none' } }} 
      >
        {tabLabels.map((label, index) => (
          <CustomTab
            label={label}
            key={index}
          />
        ))}
      </Tabs>
      {tabContents.map((content, index) => (
        <div key={index} hidden={value !== index}>
          {value === index && content}
        </div>
      ))}
    </div>
  );
}

ReusableTabs.propTypes = {
  tabLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  tabContents: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default ReusableTabs;
