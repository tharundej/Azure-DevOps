import * as React from 'react';
import Box from '@mui/material/Box';
import ReusableTabs from '../../tabs/ReusableTabs';
import CompoffConfigurationTable from './CompoffConfigurationTable';

const tabLabels = ['Comoff Config'];
  const tabContents = [
    <div>
      <CompoffConfigurationTable/>
    </div>
  ];

export default function BasicCard() {
  return (
    <ReusableTabs
        tabLabels={tabLabels}
        tabContents={tabContents}
      />
  );
}
