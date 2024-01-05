// import PropTypes from 'prop-types';
// import { useContext, useEffect } from 'react';
// // @mui
// import { Typography,Avatar,Drawer, Stack,Box,Grid , Button, IconButton, Divider} from '@mui/material';
// // hooks
// import { useResponsive } from 'src/hooks/use-responsive';
// import { useMockedUser } from 'src/hooks/use-mocked-user';
// // components
// import Logo from 'src/components/logo';
// import Scrollbar from 'src/components/scrollbar';
// import { usePathname, useRouter } from 'src/routes/hooks';
// import { NavSectionVertical } from 'src/components/nav-section';
// //
// import { NAV } from '../config-layout';
// import { useState } from 'react';
// import { useAuthContext } from 'src/auth/hooks';
// import { useNavData } from './config-navigation';
// import { useSnackbar } from 'src/components/snackbar';
// import ConfirmationDialog from 'src/components/Model/ConfirmationDialog';
// import { AccountPopover, NavToggleButton, NavUpgrade } from '../_common';
// import UserContext from 'src/nextzen/context/user/UserConext';
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// // ----------------------------------------------------------------------

// export default function NavVertical({ openNav, onCloseNav }) {
//   const { user } = useContext(UserContext)
//   const { logout } = useAuthContext();
//   const [confirmLogout, setConfirmLogout] = useState(false);
//   const pathname = usePathname();
// const router = useRouter()
//   const lgUp = useResponsive('up', 'lg');
//   const { enqueueSnackbar } = useSnackbar();
//   const navData = useNavData();
//   const handleLogout = async () => {
//     setConfirmLogout(true);
   
//   };
//   useEffect(() => {
//     if (openNav) {
//       onCloseNav();
//     }
    
//   }, [pathname]);

//   const handleCancelLogout = () => {
//     setConfirmLogout(false);
// };
// const handleConfirmLogout = async()=>{
//   try {
//     await logout();
//     router.replace('/');
//   } catch (error) {
//     console.error(error);
//     enqueueSnackbar('Unable to logout!', { variant: 'error' });
//   }
//   setConfirmLogout(false)
     

// }

//   const renderContent = (
//     <Scrollbar
//       sx={{
//         height: 1,
//         '& .simplebar-content': {
//           height: 1,
//           display: 'flex',
//           flexDirection: 'column',
//         },
//       }}
//     >
//      <Grid sx={{display:'flex',mt:1.5,ml:4}}>
//      <Logo />
//      <Typography variant="subtitle2" sx={{ml:2}}>
//             {user?.companyName} 
//           </Typography>
//       </Grid> 
//       <Divider sx={{ borderStyle: 'dashed',mt:1 }}/>

//       <Grid sx={{display:"flex",minHeight:'50px'}}>
//       <Avatar
//           src={user?.photoURL}
//           alt={user?.displayName}
//           sx={{
//             width: 36,
//             height: 36,
//             ml:4,mt:2,
//             border: (theme) => `solid 2px ${theme.palette.background.default}`,
//           }}
//         >
//           {user?.employeeName ? user?.employeeName[0] : ''}
//         </Avatar>
//         <Box sx={{ p: 2, pb: 1.5 }}>
//           <Typography variant="subtitle2" noWrap>
//             {user?.employeeName}
//           </Typography>
//           <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
//             {user?.roleName}
//           </Typography>
//           </Box>
//         <Button size="small" sx={{marginTop:2}} onClick={handleLogout}><PowerSettingsNewIcon sx={{color:'red'}}/></Button>
//         </Grid>
//         <Divider sx={{ borderStyle: 'dashed',mt:1 }}/>

//         <ConfirmationDialog
//         open={confirmLogout}
//         onClose={handleCancelLogout}
//         onConfirm={handleConfirmLogout}
//         itemName="Logout"
//         confirmButtonText="Ok"
//         message="Are you sure you want to logout?"
//       />

//       <NavSectionVertical
//         data={navData}
//         config={{
//           currentRole: user?.role || 'admin', 
//         }}
//       />

//       <Box sx={{ flexGrow: 1 }} />

//       <NavUpgrade />
//     </Scrollbar>
//   );

//   return (
//     <Box
//       component="nav"
//       sx={{
//         flexShrink: { lg: 0 },
//         width: { lg: NAV.W_VERTICAL },
//       }}
//     >
//       {/* <NavToggleButton /> */}

//       {lgUp ? (
//         <Stack
//           sx={{
//             height: 1,
//             position: 'fixed',
//             width: NAV.W_VERTICAL,
//             borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
//           }}
//         >
//           {renderContent}
//         </Stack>
//       ) : (
//         <Drawer
//           open={openNav}
//           onClose={onCloseNav}
//           PaperProps={{
//             sx: {
//               width: NAV.W_VERTICAL,
//             },
//           }}
//         >
//           {renderContent}
//         </Drawer>
//       )}
//     </Box>
//   );
// }

// NavVertical.propTypes = {
//   onCloseNav: PropTypes.func,
//   openNav: PropTypes.bool,
// };


// import PropTypes from 'prop-types';
// import { useContext, useEffect } from 'react';
// // @mui
// import {
//   Typography,
//   Avatar,
//   Drawer,
//   Stack,
//   Box,
//   Grid,
//   Button,
//   IconButton,
//   Divider,
//   Menu,
// } from '@mui/material';
// // hooks
// import { useResponsive } from 'src/hooks/use-responsive';
// import { useMockedUser } from 'src/hooks/use-mocked-user';
// // components
// import Logo from 'src/components/logo';
// import Scrollbar from 'src/components/scrollbar';
// import { usePathname, useRouter } from 'src/routes/hooks';
// import { NavSectionVertical } from 'src/components/nav-section';
// //
// import { NAV } from '../config-layout';
// import { useState } from 'react';
// import { useAuthContext } from 'src/auth/hooks';
// import { useNavData } from './config-navigation';
// import { useSnackbar } from 'src/components/snackbar';
// import ConfirmationDialog from 'src/components/Model/ConfirmationDialog';
// import { AccountPopover, NavToggleButton, NavUpgrade } from '../_common';
// import UserContext from 'src/nextzen/context/user/UserConext';
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import AutocompletePage from 'src/pages/components/mui/autocomplete';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import CustomPopover, { usePopover } from 'src/components/custom-popover';
// import Iconify from 'src/components/iconify/iconify';
// import MenuItem from '@mui/material/MenuItem';
// import { paths } from 'src/routes/paths';
// // ----------------------------------------------------------------------
 
// export default function NavVertical({ openNav, onCloseNav }) {
//   const { user } = useContext(UserContext);
//   const { logout } = useAuthContext();
//   const [confirmLogout, setConfirmLogout] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();
//   const popover = usePopover();
//   const lgUp = useResponsive('up', 'lg');
//   const { enqueueSnackbar } = useSnackbar();
//   const navData = useNavData();
//   const [anchorEl, setAnchorEl] = useState(null);
 
//   const handleOpenMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
 
//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };
//   const handleLogout = async () => {
//     setConfirmLogout(true);
//   };
//   useEffect(() => {
//     if (openNav) {
//       onCloseNav();
//     }
//   }, [pathname]);
 
//   const handleCancelLogout = () => {
//     setConfirmLogout(false);
//   };
//   const handleConfirmLogout = async () => {
//     try {
//       await logout();
//       router.replace('/');
//     } catch (error) {
//       console.error(error);
//       enqueueSnackbar('Unable to logout!', { variant: 'error' });
//     }
//     setConfirmLogout(false);
//   };
// const handleClickItem=()=>{
//   router.push(paths.dashboard.personal.root)
// }
//   const OPTIONS = [
//     {
//       label: 'Personal',
//       linkTo: '/dashboard/personal',
//     },
//   ];
//   const renderContent = (
//     <Scrollbar
//       sx={{
//         height: 1,
//         '& .simplebar-content': {
//           height: 1,
//           display: 'flex',
//           flexDirection: 'column',
//         },
//       }}
//     >
//       <Grid sx={{ display: 'flex', mt: 1.5, ml: 4 }}>
//         <Logo />
//         <Typography variant="subtitle2" sx={{ ml: 2, wordWrap: 'break-word' }}>
//           {user?.companyName}
//         </Typography>
//       </Grid>
//       <Divider sx={{ borderStyle: 'dashed', mt: 1 }} />
 
//       <Grid sx={{ display: 'flex', minHeight: '50px' }}>
//         <Avatar
//           src={user?.photoURL}
//           alt={user?.displayName}
//           sx={{
//             width: 36,
//             height: 36,
//             ml: 4,
//             mt: 2,
//             border: (theme) => `solid 2px ${theme.palette.background.default}`,
//           }}
//         >
//           {user?.employeeName ? user?.employeeName[0] : ''}
//         </Avatar>
//         <Box sx={{ p: 2, pb: 1.5 }}>
//           <Typography variant="subtitle2" noWrap>
//             {user?.employeeName}
//           </Typography>
//           <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
//             {user?.roleName}
//           </Typography>
//         </Box>
 
//         <Stack sx={{ p: 1 }}>
//           <IconButton onClick={handleOpenMenu}>
//             <Iconify icon="mingcute:down-fill"  />
//           </IconButton>
//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
//             {OPTIONS.map((option) => (
//               <MenuItem
//                 key={option.label}
//                 onClick={() => {
//                   handleClickItem(option.linkTo);
//                   handleCloseMenu();
//                 }}
//               >
//                 {option.label}
//               </MenuItem>
//             ))}
//             <MenuItem
//               onClick={handleLogout}
//               sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
//               style={{ padding: 0, margin: 0 }}
//             >
//               <Button
//                 startIcon={<PowerSettingsNewIcon />}
//                 variant="contained"
//                 color="error"
//                 // style={{ width: '100%', borderRadius: 0 }}
//               >
//                 LOGOUT
//               </Button>
//             </MenuItem>
//           </Menu>
//         </Stack>
//       </Grid>
//       <Divider sx={{ borderStyle: 'dashed', mt: 1 }} />
//       <ConfirmationDialog
//         open={confirmLogout}
//         onClose={handleCancelLogout}
//         onConfirm={handleConfirmLogout}
//         itemName="Logout"
//         confirmButtonText="Ok"
//         message="Are you sure you want to logout?"
//       />
 
//       <NavSectionVertical
//         data={navData}
//         config={{
//           currentRole: user?.role || 'admin',
//         }}
//       />
 
//       <Box sx={{ flexGrow: 1 }} />
 
//       <NavUpgrade />
//     </Scrollbar>
//   );
 
//   return (
//     <Box
//       component="nav"
//       sx={{
//         flexShrink: { lg: 0 },
//         width: { lg: NAV.W_VERTICAL },
//       }}
//     >
//       {/* <NavToggleButton /> */}
 
//       {lgUp ? (
//         <Stack
//           sx={{
//             height: 1,
//             position: 'fixed',
//             width: NAV.W_VERTICAL,
//             borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
//           }}
//         >
//           {renderContent}
//         </Stack>
//       ) : (
//         <Drawer
//           open={openNav}
//           onClose={onCloseNav}
//           PaperProps={{
//             sx: {
//               width: NAV.W_VERTICAL,
//             },
//           }}
//         >
//           {renderContent}
//         </Drawer>
//       )}
//     </Box>
//   );
// }
 
// NavVertical.propTypes = {
//   onCloseNav: PropTypes.func,
//   openNav: PropTypes.bool,
// };
 



import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
// @mui
import {
  Typography,
  Avatar,
  Drawer,
  Stack,
  Box,
  Grid,
  Button,
  IconButton,
  Divider,
  Menu,
} from '@mui/material';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
import { useMockedUser } from 'src/hooks/use-mocked-user';
// components
import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import { usePathname, useRouter } from 'src/routes/hooks';
import { NavSectionVertical } from 'src/components/nav-section';
//
import { NAV } from '../config-layout';
import { useState } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import { useNavData } from './config-navigation';
import { useSnackbar } from 'src/components/snackbar';
import ConfirmationDialog from 'src/components/Model/ConfirmationDialog';
import { AccountPopover, NavToggleButton, NavUpgrade } from '../_common';
import UserContext from 'src/nextzen/context/user/UserConext';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AutocompletePage from 'src/pages/components/mui/autocomplete';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify/iconify';
import MenuItem from '@mui/material/MenuItem';
import { paths } from 'src/routes/paths';
// ----------------------------------------------------------------------
 
export default function NavVertical({ openNav, onCloseNav }) {
  const { user } = useContext(UserContext);
  const { logout } = useAuthContext();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const popover = usePopover();
  const lgUp = useResponsive('up', 'lg');
  const { enqueueSnackbar } = useSnackbar();
  const navData = useNavData();
  const [anchorEl, setAnchorEl] = useState(null);
 
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
 
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    setConfirmLogout(true);
  };
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);
 
  const handleCancelLogout = () => {
    setConfirmLogout(false);
  };
  const handleConfirmLogout = async () => {
    try {
      await logout();
      router.replace('/');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
    setConfirmLogout(false);
  };
const handleClickItem=()=>{
  router.push(paths.dashboard.personal.root)
}
  const OPTIONS = [
    {
      label: 'Profile',
      linkTo: '/dashboard/personal',
    },
  ];
  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Grid sx={{ display: 'flex', mt: 1.5, ml: 4 }}>
        <Logo />
        <Typography variant="subtitle2" sx={{ ml: 2, wordWrap: 'break-word' }}>
          {user?.companyName}
        </Typography>
      </Grid>
      <Divider sx={{ borderStyle: 'dashed', mt: 1 }} />
 
      <Grid sx={{ display: 'flex', minHeight: '50px' }}>
        <Avatar
          src={user?.photoURL}
          alt={user?.displayName}
          sx={{
            width: 36,
            height: 36,
            ml: 4,
            mt: 2,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user?.employeeName ? user?.employeeName[0] : ''}
        </Avatar>
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.employeeName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.roleName}
          </Typography>
        </Box>
 
        <Stack sx={{ p: 1 }}>
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="mingcute:down-fill"  />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
            {OPTIONS.map((option) => (
              <MenuItem
                key={option.label}
                onClick={() => {
                  handleClickItem(option.linkTo);
                  handleCloseMenu();
                }}
              >
                {option.label}
              </MenuItem>
            ))}
            <MenuItem
              onClick={handleLogout}
              sx={{  fontWeight: 'fontWeightBold', color: 'error.main' }}
              style={{ padding: 0, margin: 0 }}
            >
              <Button
                startIcon={<PowerSettingsNewIcon />}
                variant="contained"
                color="error"
                // style={{ width: '100%', borderRadius: 0 }}
              >
                LOGOUT
              </Button>
            </MenuItem>
          </Menu>
        </Stack>
      </Grid>
      <Divider sx={{ borderStyle: 'dashed', mt: 1 }} />
      <ConfirmationDialog
        open={confirmLogout}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
        itemName="Logout"
        confirmButtonText="Ok"
        message="Are you sure you want to logout?"
      />
 
      <NavSectionVertical
        data={navData}
        config={{
          currentRole: user?.role || 'admin',
        }}
      />
 
      <Box sx={{ flexGrow: 1 }} />
 
      <NavUpgrade />
    </Scrollbar>
  );
 
  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
      }}
    >
      {/* <NavToggleButton /> */}
 
      {lgUp ? (
        <Stack
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.W_VERTICAL,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.W_VERTICAL,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
 
NavVertical.propTypes = {
  onCloseNav: PropTypes.func,
  openNav: PropTypes.bool,
};
 