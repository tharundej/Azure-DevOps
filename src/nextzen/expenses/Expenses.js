/* eslint no-use-before-define: 0 */ // --> OFF
import { Button, Dialog } from '@mui/material';
import ReusableTabs from '../tabs/ReusableTabs';
import Fuel from './Fuel';
import OtherExpenses from './OtherExpenses';
import Vehicles from './Vehicles';
import Iconify from 'src/components/iconify/iconify';
import { useState } from 'react';
import CreateExpenses from './CreateExpenses';

export default function Expenses() {
  const tabLabels = ['Fuel', 'Vehicles', 'Others'];
  const tabContents = [
    <div>
      <Fuel />
    </div>,
    <div>
      <Vehicles />
    </div>,
    <div>
      <OtherExpenses />
    </div>,
  ];
  const [showForm, setShowForm] = useState(false);
  const handleOpen = () => {
    setShowForm(true);
  };
  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <>
      {showForm && (
        <Dialog
          fullWidth
          maxWidth={false}
          open={showForm}
          onClose={handleClose}
          PaperProps={{
            sx: { maxWidth: 1200 },
          }}
          className="custom-dialog"
        >
          <CreateExpenses currentData={{}} handleClose={handleClose} />
        </Dialog>
      )}
      <div style={{ textAlign: 'right' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          startIcon={<Iconify icon="mingcute:add-line" />}
          sx={{ margin: '20px' }}
        >
          Add
        </Button>
      </div>
      <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} />
    </>
  );
}
