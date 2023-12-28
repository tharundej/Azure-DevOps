import React,{useState,useCallback} from 'react'
import { useParams } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import CryptoJS from "crypto-js";
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { RouterLink } from 'src/routes/components';
import { Container,Card,Tab ,Link,Grid,Button,Stack} from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import ProfileCover from 'src/sections/user/profile-cover';
import Iconify from '../../../components/iconify/iconify';

import EmployeeAbout from './employeeabout/EmployeeAbout';
import EmployeeEducation from './employeeeducation/EmployeeEducation';
import Statoury from './statoury/Statoury';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useTheme, alpha } from '@mui/material/styles';
import { bgGradient } from 'src/theme/css';
import PreviousWork from './previouswork/PreviousWork';

import Documents from "../../employeemanagment/employeeview/documents/Document"
import EmployeePermissions from './employeepermissions/EmployeePermissions';

import SnackBarComponent from 'src/nextzen/global/SnackBarComponent';
import ChangePassword from './changepassword/ChangePassword';
import { useEffect } from 'react';
import { baseImageUrl,baseUrl } from 'src/nextzen/global/BaseUrl';
import { ASSETS_API } from 'src/config-global';

import bg from '../../../components/image/bg2.jpg'

const TABS = [
    {
      value: 'About',
      label: 'About',
      icon: <Iconify icon="solar:user-id-bold" width={18} />,
    },
    {
      value: 'Education',
      label: 'Education',
      icon: <Iconify icon="mdi:education-outline" width={18} />,
    },
    {
      value: 'Experience',
      label: 'Experience',
      icon: <Iconify icon="solar:users-group-rounded-bold" width={18} />,
    },
    
    {
      value: 'Documents',
      label: 'Documents',
      icon: <Iconify icon="et:documents" width={18} />,
    },
    {
      value: 'EmployeePermission',
      label: 'Employee Permission',
      icon: <Iconify icon="mdi:checkbox-outline" width={18} />,
    },
    {
      value: 'Statoury',
      label: 'Statoury',
      icon: <Iconify icon="mdi:card-account-details-star" width={18} />,
    },
    
  ];
 

const EmployeeView = () => {
  console.log(JSON.parse(localStorage.getItem('userDetails'))?.companyID,'JSON.parse(localstorage.getitem')
  const [userData,setUserData]=useState({})

  const roleID=3;
  const theme = useTheme();
  
  



  const [openSnackbar,setOpenSnackbar]=useState(false);
  const [snacbarMessage,setSnacbarMessage]=useState("");
  const [severity,setSeverity]=useState("") 
  const[employeeID,setEmployeeID]=useState("") 
  const [avatarUrl,setAvatarUrl]=useState("")    

  const params = useParams();
  const { id } = params;
  // useEffect(()=>{
  //   const secretPass = "XkhZG4fW2t2W";
  //   const decryptData = () => {
  //     const bytes = CryptoJS.AES.decrypt(id, secretPass);
  //     const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  //     setEmployeeID(data);
  //     console.log(data,'employeeIDemployeeID')
  //   };
  //   decryptData()
  // },[])
  const ApiHit=()=>{
         
      let data = JSON.stringify({
        "companyID": JSON.parse(localStorage.getItem('userDetails'))?.companyID,
        "employeeID": id
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${baseUrl}/getMiniOnboardingDetails`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.data,'setUserData'));
        setUserData(response.data.data)
       console.log( response.data.data,'avatarUrl')

      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(()=>{
    ApiHit()
  },[])


  const HandleCloseSnackbar=()=>{
    setOpenSnackbar(false);
  }



    const settings = "";

    const { user } = {};
  
    const [searchFriends, setSearchFriends] = useState('');
  
    const [currentTab, setCurrentTab] = useState('About');
  
    const handleChangeTab = useCallback((event, newValue) => {
      setCurrentTab(newValue);
    }, []);
  
    const handleSearchFriends = useCallback((event) => {
      setSearchFriends(event.target.value);
    }, []);
    const handleCallSnackbar=(message,severity)=>{
      setOpenSnackbar(true);
      setSnacbarMessage(message);
      setSeverity(severity);
    }

    useEffect(() => {
      setAvatarUrl(`${baseImageUrl}${userData.imageData}`);
    }, [userData]);
  
  return (
    <div>
         <Stack maxWidth={settings.themeStretch ? false : 'lg'}>
          
         
          <SnackBarComponent  open={openSnackbar} onHandleCloseSnackbar={HandleCloseSnackbar} snacbarMessage={snacbarMessage} severity={severity}/>

      {/* <CustomBreadcrumbs
        heading="Profile"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User', href: paths.dashboard.user.root },
          { name: user?.displayName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      /> */}

      {/* <Card
        sx={{
          mb: 3,
          height: 150,
        }}
      >{avatarUrl?.length>0 && 
      <ProfileCover
        role={userData?.roleName}
        name={userData?.firstName}
       
        avatarUrl ={userData?.imageData}
        coverUrl={bg}
      />
      
      }
       
  
      </Card> */}

{/* <ProfileCover
        role={userData?.roleName}
        name={userData?.firstName}
       
        avatarUrl ={userData?.imageData}
        coverUrl={bg}
      /> */}

{/* <Avatar
        // src={baseImageUrl+avatarUrl}
        // alt={name}
       
        sx={{
          left: { md: 14 },
          bottom: { md: 24 },
          zIndex: { md: 5 },
          pt: { xs: 6, md: 0 },
          position: { md: 'absolute' },
          mx: 'auto',
          width: { xs: 64, md: 128 },
          height: { xs: 64, md: 128 },
          border: `solid 2px ${theme.palette.common.white}`,
        }}
      /> */}

<Tabs
  value={currentTab}
  onChange={handleChangeTab}
  variant="scrollable"
  scrollButtons="auto"
  aria-label="scrollable auto tabs example"
  
  sx={{
    
    width: '100%',
    // bottom: 0,
    // zIndex: 9,
    // position: 'absolute',
    bgcolor: 'background.paper',
    [`& .${tabsClasses.flexContainer}`]: {
      pr: { md: 3 },
      justifyContent: {
        sm: 'flex-start',
        md: 'flex-start',
        lg: 'flex-start',
    
      },
    },
  }}
>


        
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
          ))}
        </Tabs>
      {/* <Grid container justifyContent="flex-end">
      <Button
        component={RouterLink}
        to={paths.dashboard.employee.changepassword}
        color="primary"
        variant="contained"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px', 
        }}
      >
       
        Change Password
      </Button>
        </Grid> */}
         {/* <Link
        component={RouterLink}
        href={paths.auth.jwt.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Return to sign in
      </Link> */}
      {(currentTab === 'About' ) && <EmployeeAbout handleCallSnackbar={handleCallSnackbar} employeeIDForApis={id} />}

      {currentTab === 'Education' && <EmployeeEducation handleCallSnackbar={handleCallSnackbar}  employeeIDForApis={id}  />}
      {currentTab==='Experience' && <PreviousWork handleCallSnackbar={handleCallSnackbar}  employeeIDForApis={id}  />}
      {currentTab==='Documents' && <Documents handleCallSnackbar={handleCallSnackbar}  employeeIDForApis={id}  />}
      {currentTab==='EmployeePermission' && <EmployeePermissions open={id}  employeeId={id}  />}
    

    
      {/* // {currentTab === 'friends' && (
      //   <ProfileFriends
      //     friends={_userFriends}
      //     searchFriends={searchFriends}
      //     onSearchFriends={handleSearchFriends}
      //   />
      // )} */}

      {currentTab === 'Statoury' && <Statoury  handleCallSnackbar={handleCallSnackbar} employeeIDForApis={id}  />}
    </Stack>



    </div>
  )
}

export default EmployeeView