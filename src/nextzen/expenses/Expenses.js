/* eslint no-use-before-define: 0 */ // --> OFF
import { Box, Button, Card, CardContent, Dialog, Grid, Typography } from '@mui/material';
import ReusableTabs from '../tabs/ReusableTabs';
import Fuel from './Fuel';
import OtherExpenses from './OtherExpenses';
import Vehicles from './Vehicles';
import Iconify from 'src/components/iconify/iconify';
import { useState } from 'react';
import CreateExpenses from './CreateExpenses';
import AppWidgetSummary from 'src/sections/overview/app/app-widget-summary';
import { fNumber } from 'src/utils/format-number';

export default function Expenses() {
  const [count, setCount] = useState(0);
  const handleCountChange = () => {
    setCount(count + 1);
  };
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
          <CreateExpenses
            currentData={{}}
            handleClose={handleClose}
            handleCountChange={handleCountChange}
          />
        </Dialog>
      )}

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ '& > *': { flex: '1 1 auto', maxWidth: '30%' } }}
      >
        <Grid xs={4} md={4}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2">Total Amount</Typography>
              <Typography variant="h3">{fNumber(0)}</Typography>
            </Box>
          </Card>
        </Grid>

        <Grid xs={4} md={4}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2">Advance Amount</Typography>
              <Typography variant="h3">{fNumber(0)}</Typography>
            </Box>
          </Card>
        </Grid>

        <Grid xs={4} md={4}>
          <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2">Balance Amount</Typography>
              <Typography variant="h3">{fNumber(0)}</Typography>
            </Box>
          </Card>
        </Grid>
      </Box>

      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          Add
        </Button>
      </div>
      <ReusableTabs tabLabels={tabLabels} tabContents={tabContents} />
    </>
  );
}
