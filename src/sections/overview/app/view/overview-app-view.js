// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// _mock
import { _appFeatured, _appAuthors, _appInstalled, _appRelated, _appInvoices } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
// assets
import { SeoIllustration } from 'src/assets/illustrations';
//
import AppWidget from '../app-widget';
import AppWelcome from '../app-welcome';
import AppFeatured from '../app-featured';
import AppNewInvoice from '../app-new-invoice';
import AppTopAuthors from '../app-top-authors';
import AppTopRelated from '../app-top-related';
import AppAreaInstalled from '../app-area-installed';
import AppWidgetSummary from '../app-widget-summary';
import AppCurrentDownload from '../app-current-download';
import AppTopInstalledCountries from '../app-top-installed-countries';
import { useContext } from 'react';
import UserContext from 'src/nextzen/context/user/UserConext';
import PunchINOutCard from 'src/nextzen/dashboard/PunchInOut/PunchINOutCard';
import BirthdayReminders from 'src/nextzen/usersdashboard/birthdayreminders/BirthdayReminders,';
import { useEffect,useState } from 'react';
import { baseUrl } from 'src/nextzen/global/BaseUrl';
import axios from 'axios';
import HolidayList from 'src/nextzen/usersdashboard/holiday/HolidayList';
import LeaveRequest from 'src/nextzen/usersdashboard/leaverequest/LeaveRequest';
import instance from 'src/api/BaseURL';
import AvailableLeave from 'src/nextzen/usersdashboard/AvailableLeave/Availableleave';
import Alert from 'src/nextzen/usersdashboard/Alert/Alert';



// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const { user } = useContext(UserContext);
  const [birthdayList,setBirthdayList]=useState([]);
  const [holidayList,setHolidayList]=useState([])
  const [AvailableLeaveData,setAvailableLeaveData]=useState([])
  const [leaveRequestList,setLeaveRequestList]=useState([])

  const ApiHitBirthday=()=>{
    
let data = JSON.stringify({
  "companyID":JSON.parse(localStorage.getItem('userDetails'))?.companyID,
});
 
let config = {
  method: 'post',
  url: `${baseUrl}/getDateofBirth`,
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};
 
axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  setBirthdayList(response?.data.data || [])
})
.catch((error) => {
  console.log(error);
});
  }

  const ApiHitLeaveRequest=()=>{
    
    let data = JSON.stringify({
      // "companyID":JSON.parse(localStorage.getItem('userDetails'))?.companyID,
      employeeID:JSON.parse(localStorage.getItem('userDetails'))?.employeeID
    });
     
    let config = {
      method: 'post',
      url: `${baseUrl}/getLastLeaveRecordsOfEmployee`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
     
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setLeaveRequestList(response?.data.data || [])
    })
    .catch((error) => {
      console.log(error);
      setLeaveRequestList([])
    });
      }

  const ApiHitHolidays=()=>{
    
    let data = JSON.stringify({
      "companyID":JSON.parse(localStorage.getItem('userDetails'))?.companyID,
      "locationID":JSON.parse(localStorage.getItem('userDetails'))?.locationID,
    });
     
    let config = {
      method: 'post',
      url: `${baseUrl}/getHolidayList`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
     
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setHolidayList(response?.data?.data || [])
    })
    .catch((error) => {
      console.log(error);
    });
      }
      const getAvailableLeave = async()=>{
        try{
          const data={
            companyId:(user?.companyID)? user?.companyID : '',
            employeeId:(user?.employeeID)? user?.employeeID : '',
          }

          let config = {
            method: 'post',
            url: `${baseUrl}/availableLeave`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
           
          axios.request(config)
          .then((response) => {
            setAvailableLeaveData(response?.data?.data)
          })
          .catch((error) => {
            console.log(error);
          });
        }catch(error){
          console.log("Error",error)
          throw error;
        }
      }

  useEffect(()=>{
    ApiHitBirthday();
    ApiHitHolidays();
    ApiHitLeaveRequest();
    getAvailableLeave()
  },[])

  const theme = useTheme();

  const settings = useSettingsContext();

  return (
    <Container sx={{marginTop:'20px'}} maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <AppWelcome
            title={`Welcome 👋  ${user?.employeeName || ""} `}

           // description="Every day is a new chance to achieve your goals. Seize the day with enthusiasm and determination."
            description="Happy work anniversary! Your creativity, passion, and hard work are truly valued. Here's to more successful and fulfilling years ahead.~Priya!!"


            img={<SeoIllustration />}
            // action={
            //   <Button variant="contained" color="primary">
            //     Go Now
            //   </Button>
            // }
          />
        </Grid>

        <Grid xs={12} md={4}>
          {/* <AppFeatured list={_appFeatured} /> */}
          <PunchINOutCard />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <Alert title="Alert" list={birthdayList} />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <BirthdayReminders title="Bithday Reminders" list={birthdayList} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <HolidayList title="Up Coming Holiday" list={holidayList} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AvailableLeave title="Available Leaves" list={AvailableLeaveData} />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <LeaveRequest title="Leave Request" list={leaveRequestList} />
        </Grid>




        {/* <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Active Users"
            percent={2.6}
            total={18765}
            chart={{
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid> */}

        {/* <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Installed"
            percent={0.2}
            total={4876}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Downloads"
            percent={-0.1}
            total={678}
            chart={{
              colors: [theme.palette.warning.light, theme.palette.warning.main],
              series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentDownload
            title="Current Download"
            chart={{
              series: [
                { label: 'Mac', value: 12244 },
                { label: 'Window', value: 53345 },
                { label: 'iOS', value: 44313 },
                { label: 'Android', value: 78343 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppAreaInstalled
            title="Area Installed"
            subheader="(+43%) than last year"
            chart={{
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: [
                {
                  year: '2019',
                  data: [
                    {
                      name: 'Asia',
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                    },
                    {
                      name: 'America',
                      data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
                    },
                  ],
                },
                {
                  year: '2020',
                  data: [
                    {
                      name: 'Asia',
                      data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                    },
                    {
                      name: 'America',
                      data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} lg={8}>
          <AppNewInvoice
            title="New Invoice"
            tableData={_appInvoices}
            tableLabels={[
              { id: 'id', label: 'Invoice ID' },
              { id: 'category', label: 'Category' },
              { id: 'price', label: 'Price' },
              { id: 'status', label: 'Status' },
              { id: '' },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTopRelated title="Top Related Applications" list={_appRelated} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTopInstalledCountries title="Top Installed Countries" list={_appInstalled} />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <BirthdayReminders title="Bithday Reminders" list={[{employeeID:'1',name:"anil"},{employeeID:'2',name:"sham"}]} />
        </Grid>


        <Grid xs={12} md={6} lg={4}>
          <AppTopAuthors title="Top Authors" list={_appAuthors} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <Stack spacing={3}>
            <AppWidget
              title="Conversion"
              total={38566}
              icon="solar:user-rounded-bold"
              chart={{
                series: 48,
              }}
            />

            <AppWidget
              title="Applications"
              total={55566}
              icon="fluent:mail-24-filled"
              color="info"
              chart={{
                series: 75,
              }}
            />
          </Stack>
        </Grid> */}
      </Grid>
    </Container>
  );
}
