import PropTypes from 'prop-types';
import { forwardRef, useContext } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import UserContext from 'src/nextzen/context/user/UserConext';
// routes
import { RouterLink } from 'src/routes/components';
import Avatar from '@mui/material/Avatar';
// ----------------------------------------------------------------------

const InfobellLogo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;
  
  const {user}=useContext(UserContext)
  const companyLogo= (user?.companyLogo)?user?.companyLogo:''
  // OR using local (public folder)
  // -------------------------------------------------------
  const logo = (
    // default logo /logo/logo_single.svg
  

  
    <Box
    component={"img" }
    src={"/logo/logo_single.svg"}
    style={companyLogo ? { marginLeft: '20px' } : {}}
    sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  />
  
  );


  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/dashboard" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

InfobellLogo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default InfobellLogo;
