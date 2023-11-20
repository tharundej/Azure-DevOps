import React,{useState,useCallback} from 'react'
import { useParams } from 'src/routes/hooks';

import { Container,Card,Tab } from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import ProfileCover from 'src/sections/user/profile-cover';

import Iconify from '../../../components/iconify/iconify';

import EmployeeAbout from './employeeabout/EmployeeAbout';
import EmployeeEducation from './employeeeducation/EmployeeEducation';
import Statoury from './statoury/Statoury';

import PreviousWork from './previouswork/PreviousWork';

import Documents from "../../employeemanagment/employeeview/documents/Document"

import SnackBarComponent from 'src/nextzen/global/SnackBarComponent';

const TABS = [
    {
      value: 'About',
      label: 'About',
      icon: <Iconify icon="solar:user-id-bold" width={24} />,
    },
    {
      value: 'Education',
      label: 'Education',
      icon: <Iconify icon="mdi:education-outline" width={24} />,
    },
    {
      value: 'Experience',
      label: 'Experience',
      icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
    },
    {
      value: 'Statoury',
      label: 'Statoury',
      icon: <Iconify icon="mdi:card-account-details-star" width={24} />,
    },
    {
      value: 'Documents',
      label: 'Documents',
      icon: <Iconify icon="et:documents" width={24} />,
    },
  ];
 

const EmployeeView = () => {



  const [openSnackbar,setOpenSnackbar]=useState(false);
  const [snacbarMessage,setSnacbarMessage]=useState("");
  const [severity,setSeverity]=useState("")      

  const params = useParams();
  const { id } = params;


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
  <SnackBarComponent open={openSnackbar} onHandleCloseSnackbar={HandleCloseSnackbar} snacbarMessage={snacbarMessage} severity={severity}/>

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
          role="Hr Manager"
          name="Name"
          avatarUrl={user?.photoURL}
          coverUrl="aaa"
        />

        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            width: 1,
            bottom: 0,
            zIndex: 9,
            position: 'absolute',
            bgcolor: 'background.paper',
            [`& .${tabsClasses.flexContainer}`]: {
              pr: { md: 3 },
              justifyContent: {
                sm: 'center',
                md: 'flex-end',
              },
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
          ))}
        </Tabs>
      </Card>

      {currentTab === 'About' && <EmployeeAbout handleCallSnackbar={handleCallSnackbar} employeeIDForApis={id} />}

      {currentTab === 'Education' && <EmployeeEducation handleCallSnackbar={handleCallSnackbar}  employeeIDForApis={id}  />}
      {currentTab==='Experience' && <PreviousWork handleCallSnackbar={handleCallSnackbar}  employeeIDForApis={id}  />}
      {currentTab==='Documents' && <Documents handleCallSnackbar={handleCallSnackbar}  employeeIDForApis={id}  />}
    
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