import React,{useState,useCallback} from 'react'

import { Container,Card,Tab } from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import ProfileCover from 'src/sections/user/profile-cover';

import Iconify from '../../../components/iconify/iconify';

const TABS = [
    {
      value: 'profile',
      label: 'Profile',
      icon: <Iconify icon="solar:user-id-bold" width={24} />,
    },
    {
      value: 'followers',
      label: 'Followers',
      icon: <Iconify icon="solar:heart-bold" width={24} />,
    },
    {
      value: 'friends',
      label: 'Friends',
      icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
    },
    {
      value: 'gallery',
      label: 'Gallery',
      icon: <Iconify icon="solar:gallery-wide-bold" width={24} />,
    },
  ];
 

const EmployeeView = () => {

    const settings = "";

    const { user } = {};
  
    const [searchFriends, setSearchFriends] = useState('');
  
    const [currentTab, setCurrentTab] = useState('profile');
  
    const handleChangeTab = useCallback((event, newValue) => {
      setCurrentTab(newValue);
    }, []);
  
    const handleSearchFriends = useCallback((event) => {
      setSearchFriends(event.target.value);
    }, []);
  
  return (
    <div>
         <Container maxWidth={settings.themeStretch ? false : 'lg'}>
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
          name="aa"
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

      {/* {currentTab === 'profile' && <ProfileHome info={_userAbout} posts={_userFeeds} />}

      {currentTab === 'followers' && <ProfileFollowers followers={_userFollowers} />}

      {currentTab === 'friends' && (
        <ProfileFriends
          friends={_userFriends}
          searchFriends={searchFriends}
          onSearchFriends={handleSearchFriends}
        />
      )}

      {currentTab === 'gallery' && <ProfileGallery gallery={_userGallery} />} */}
    </Container>



    </div>
  )
}

export default EmployeeView