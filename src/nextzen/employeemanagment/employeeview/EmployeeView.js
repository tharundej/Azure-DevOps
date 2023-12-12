import React,{useState,useCallback} from 'react'
import { useParams } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import CryptoJS from "crypto-js";

import axios from 'axios';
import { RouterLink } from 'src/routes/components';
import { Container,Card,Tab ,Link,Grid,Button} from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import ProfileCover from 'src/sections/user/profile-cover';
import Iconify from '../../../components/iconify/iconify';

import EmployeeAbout from './employeeabout/EmployeeAbout';
import EmployeeEducation from './employeeeducation/EmployeeEducation';
import Statoury from './statoury/Statoury';

import PreviousWork from './previouswork/PreviousWork';

import Documents from "../../employeemanagment/employeeview/documents/Document"
import EmployeePermissions from './employeepermissions/EmployeePermissions';

import SnackBarComponent from 'src/nextzen/global/SnackBarComponent';
import ChangePassword from './changepassword/ChangePassword';
import { useEffect } from 'react';
import { baseImageUrl } from 'src/nextzen/global/BaseUrl';


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
      value: 'Statoury',
      label: 'Statoury',
      icon: <Iconify icon="mdi:card-account-details-star" width={18} />,
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
    
  ];
 

const EmployeeView = () => {
  console.log(JSON.parse(localStorage.getItem('userDetails'))?.companyID,'JSON.parse(localstorage.getitem')
  const [userData,setUserData]=useState({})

  const roleID=3;
  
  



  const [openSnackbar,setOpenSnackbar]=useState(false);
  const [snacbarMessage,setSnacbarMessage]=useState("");
  const [severity,setSeverity]=useState("") 
  const[employeeID,setEmployeeID]=useState("")     

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
        url: 'https://vshhg43l-3001.inc1.devtunnels.ms/erp/getMiniOnboardingDetails',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.data,'setUserData'));
        setUserData(response.data.data)
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
  
  return (
    <div>
         <Container maxWidth={settings.themeStretch ? false : 'lg'}>
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

      <Card
        sx={{
          mb: 3,
          height: 290,
        }}
      >
        <ProfileCover
          role={userData?.roleName}
          name={userData?.firstName}
          avatarUrl="http://192.168.1.199:3001/erp/download?file=saitama.png"
          // avatarUrl ={ `${baseImageUrl}${userData.imageData}`}
          coverUrl="aaa"
        />
<Tabs
  value={currentTab}
  onChange={handleChangeTab}
  variant="scrollable"
  scrollButtons="auto"
  aria-label="scrollable auto tabs example"
  
  sx={{
    
    width: '100%',
    bottom: 0,
    zIndex: 9,
    position: 'absolute',
    bgcolor: 'background.paper',
    [`& .${tabsClasses.flexContainer}`]: {
      pr: { md: 3 },
      justifyContent: {
        sm: 'flex-end',
        md: 'flex-end',
        lg: 'flex-end',
    
      },
    },
  }}
>


        
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
          ))}
        </Tabs>
      </Card>
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
    </Container>



    </div>
  )
}

export default EmployeeView