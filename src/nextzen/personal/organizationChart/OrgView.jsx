import * as React from 'react';
import Box from '@mui/material/Box';
import ReusableTabs from '../../tabs/ReusableTabs';
import OrganizationChart from './OrganizationChart';


const tabLabels = ['OrganizationChart'];
  const tabContents = [
    <div>
      <OrganizationChart/>
    </div>
  ];

export default function BasicCard() {
  return (
    <ReusableTabs
        tabLabels={tabLabels}
        tabContents={tabContents}
        tabsSx={{ borderBottom:"3px solid #3b82f6 !important" }}
      />
  );
}
