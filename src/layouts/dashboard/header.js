import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {Typography} from "@mui/material"
// theme
import { bgBlur } from 'src/theme/css';
// hooks
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Logo from 'src/components/logo';
import SvgColor from 'src/components/svg-color';
import { useSettingsContext } from 'src/components/settings';
//
import { HEADER, NAV } from '../config-layout';
import {
  Searchbar,
  AccountPopover,
  SettingsButton,
  LanguagePopover,
  ContactsPopover,
  NotificationsPopover,
} from '../_common';

import { useLocation } from 'react-router-dom';
// ----------------------------------------------------------------------

const headerMap = new Map();
headerMap.set('leave','Leave');
headerMap.set('employeemanagementhome','Employee Management')
headerMap.set('timesheetmanagement','Time Sheet Management')
headerMap.set('Shift','Shift management')
headerMap.set('claims','Claims')
headerMap.set('payroll','Payroll')
headerMap.set('itdeclaration','IT Declaration')
headerMap.set('monthlydeductions','Monthly Additions and Deductions')
headerMap.set('appraisal','Appraisal Management')
headerMap.set('leaveconfiguration','Leave Configuration')
headerMap.set('appraisalconfiguration','Appraisal Configuration ')
headerMap.set('expenseclaimconfiguration','Expense Claim Configuration ')
headerMap.set('compoffconfiguration','Compoff Configuration')
headerMap.set('shiftconfiguration','Shift Configuration ')
headerMap.set('roleconfiguration','Role Configuration ')
headerMap.set('factory','Factory')
headerMap.set('assets','Assets')
headerMap.set('vendor','Vendor')
headerMap.set('materials','Materials')
headerMap.set('products','Products')
headerMap.set('customers','Customers')
headerMap.set('order','Purchase Order')
headerMap.set('payment','Purchase Payment')
headerMap.set('invoice','Purchase Invoice')

headerMap.set('expenses','Expenses ')
headerMap.set('balancesheet','Balancesheet')




export default function Header({ onOpenNav }) {
  function getLastWordAfterSlash(path) {
    // Split the path by '/'
    const pathParts = path.split('/');
    
    // Get the last non-empty part
    const lastPart = pathParts.filter(part => part !== '').pop();
    console.log(lastPart,'currentPath')
  
    return lastPart || null; // Return the last part or null if there is none
  }
  const navigate = useLocation();
  const currentPath = location.pathname;
  
  const splicedPath = getLastWordAfterSlash(currentPath);
  const theme = useTheme();

  const settings = useSettingsContext();

  const isNavHorizontal = settings.themeLayout === 'horizontal';

  const isNavMini = settings.themeLayout === 'mini';

  const lgUp = useResponsive('up', 'lg');

  const offset = useOffSetTop(HEADER.H_DESKTOP);

  const offsetTop = offset && !isNavHorizontal;

  const renderContent = (
    <>
      {lgUp && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />}

      {!lgUp && (
        <IconButton onClick={onOpenNav}>
          <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
        </IconButton>
      )}

      {/* <Searchbar /> */}

     

      <Stack
      flexGrow={1}
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      spacing={{ xs: 0.5, sm: 1 }}
    >
      <Typography style={{ color: 'black' }} component='span' variant='h5'>{headerMap.get(splicedPath)
      }</Typography>
    </Stack>

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >
        {/* <LanguagePopover />

        <NotificationsPopover />

        <ContactsPopover />

        <SettingsButton /> */}

        <AccountPopover />
      </Stack>

      

      

      
    </>
  );

  return (
    <AppBar
      sx={{
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
          height: HEADER.H_DESKTOP,
          ...(offsetTop && {
            height: HEADER.H_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: 'background.default',
            height: HEADER.H_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
