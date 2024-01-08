import PropTypes from 'prop-types';
import { useState,useRef ,useCallback,useMemo,useEffect} from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { Typography ,Card,IconButton} from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { useTheme, alpha } from '@mui/material/styles';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
// theme
import { bgGradient } from 'src/theme/css';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';

import {baseImageUrl} from 'src/nextzen/global/BaseUrl';

// ----------------------------------------------------------------------

export default function ProfileCover({ name, avatarUrl, role, coverUrl }) {

  console.log(baseImageUrl+avatarUrl,'baseImageUrl+avatarUrl')
  const [avatarUrl1, setAvatarUrl] = useState(avatarUrl);
  console.log(avatarUrl,'avatarUr1')
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState(avatarUrl);
  const fileInputRef = useRef(null);
  let fileInput;

  const NewUserSchema = Yup.object().shape({
   
    avatarUrl: Yup.mixed().nullable().required('Avatar is required'),
    // not required
    
  });

  const defaultValues = useMemo(
    () => ({
      
      avatarUrl1: avatarUrl,
    
    }),
    [avatarUrl,avatarUrl1]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    console.log('imageupload called',data)
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      // enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      // router.push(paths.dashboard.user.list);
      // console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });
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
        setNewAvatarUrl(reader.result);
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

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl1', newFile, { shouldValidate: true });
      }
    onSubmit()
    },
    [setValue]
  );

  const handleCameraIconClick = () => {
    // Trigger a click on the file input when the camera icon is clicked
    document.getElementById('fileInput').click();
  };

  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 900);
    };

    // Initial check on mount
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.primary.light, 0.0),
          imgUrl: coverUrl,
        }),
        height: 1,
        // color: 'common.white',
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
    <label
      htmlFor="fileInput"
      style={{ position: 'relative', cursor: 'pointer', display: 'inline-block' }}
    >
      <Avatar
        src={newAvatarUrl}
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
       {!isMobileView && ( // Only show the icon if the screen width is greater than 600px
            <IconButton
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: theme.palette.common.white,
              }}
              onClick={handleCameraIconClick}
            >
              <PhotoCameraIcon />
            </IconButton>
          )}
    </label>
   {/* <FormProvider methods={methods} onSubmit={onSubmit}>
   <Box >
              <RHFUploadAvatar
              
                name="avatarUrl1"
                maxSize={3145728}
                onDrop={handleDrop}
                
              />
            </Box>
          
            </FormProvider> */}

        <ListItemText
          sx={{
            // mt: 3,
            ml: { md: 3 },
            textAlign: { xs: 'center', md: 'unset' },
          }}
          primary={name}
          secondary={role}
          primaryTypographyProps={{
            typography: 'h4',
            color:'white'
          }}
          secondaryTypographyProps={{
            mt: 0.5,
            color:'white',
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
