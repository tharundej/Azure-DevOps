import PropTypes from 'prop-types';
import { useState,useRef } from 'react';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { useTheme, alpha } from '@mui/material/styles';
// theme
import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

export default function ProfileCover({ name, avatarUrl, role, coverUrl }) {
  const [avatarUrl1, setAvatarUrl] = useState(avatarUrl);
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const fileInputRef = useRef(null);
  let fileInput;
  const handleMouseEnter = () => {
    setHovered(true);
    // Add your logic to upload a new profile picture here
    // For example, you can open a file input and update the avatarUrl state when a new image is selected.
  };

  const handleMouseLeave = () => {
    setHovered(false);
    // You can add additional logic here if needed.
  };
   const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = () => {
    // Add logic to upload the new profile picture to your server or storage
    // For example, you can use a file upload library or make a network request.
    // Once uploaded, update the avatarUrl state with the new URL.
    setAvatarUrl(newAvatarUrl);
    setHovered(false); // Reset hovered state after upload.
  };
  const handleAvatarClick = () => {
    console.log('0')
    if (fileInput) {
      fileInput.click();
    }
  };


  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.primary.darker, 0.8),
          imgUrl: coverUrl,
        }),
        height: 1,
        color: 'common.white',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          left: { md: 24 },
          bottom: { md: 24 },
          zIndex: { md: 10 },
          pt: { xs: 6, md: 0 },
          position: { md: 'absolute' },
        }}
      >
    <label htmlFor="fileInput" style={{ position: 'relative', cursor: 'pointer' }}>
      <Avatar
        src={avatarUrl1}
        alt={name}
        sx={{
          mx: 'auto',
          width: { xs: 64, md: 128 },
          height: { xs: 64, md: 128 },
          border: `solid 2px ${theme.palette.common.white}`,
        }}
      />
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }}
      />
    </label>

        <ListItemText
          sx={{
            mt: 3,
            ml: { md: 3 },
            textAlign: { xs: 'center', md: 'unset' },
          }}
          primary={name}
          secondary={role}
          primaryTypographyProps={{
            typography: 'h4',
          }}
          secondaryTypographyProps={{
            mt: 0.5,
            color: 'inherit',
            component: 'span',
            typography: 'body2',
            sx: { opacity: 0.48 },
          }}
        />
      </Stack>
    </Box>
  );
}

ProfileCover.propTypes = {
  avatarUrl: PropTypes.string,
  coverUrl: PropTypes.string,
  name: PropTypes.string,
  role: PropTypes.string,
};
