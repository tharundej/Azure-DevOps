import * as React from 'react';
import Box from '@mui/material/Box';
import ReusableTabs from 'src/nextzen/tabs/ReusableTabs';
import TAxSectionConfig from './TAxSectionConfig';





const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
// 'Department', 'Designation ',
const tabLabels = [ 'Designation Grade' ];
  const tabContents = [

    <div>
     <TAxSectionConfig />
    </div>
  ];

export default function TaxSEctionTab() {
  return (
    <ReusableTabs
        tabLabels={tabLabels}
        tabContents={tabContents}
        tabsSx={{ borderBottom:"3px solid #3b82f6 !important" }}
      />
  );
}
