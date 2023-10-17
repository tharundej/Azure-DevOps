import { BasicTable} from 'src/nextzen/Table/BasicTable';



import { _userList } from 'src/_mock';

import { useTheme } from '@mui/material/styles';

import {Typography,CardContent,Grid,Card,TextField,InputAdornment} from '@mui/material';

import Iconify from 'src/components/iconify/iconify';
 
export default function Approveleave(){
   const theme = useTheme();

   const cardStyle = {
      display: 'flex',
      // justifyContent: 'space-between', // Align cards horizontally
      marginBottom: '16px', // Add margin at the bottom
    };
    const cardHeaderStyle = {
      backgroundColor: '#3B82F6',
      color: '#fff',
      padding: '16px',
      textAlign: 'center',
      fontWeight: 'bold',
    };
    const cardContentStyle = {
      padding: '16px', 
      // fontWeight: 'bold', 
      fontSize: '18px', 
      backgroundColor: '#DFEBFE', // Change the background color
      display: 'flex',
     flexDirection: 'column',
     justifyContent: 'center',
      alignItems: 'center',
      color: 'black', // Change the text color
      
    };

    // const TABLE_HEAD = [
    //     { id: 'employee', label: 'Employee' },
    //     { id: 'employeeId', label: 'Employee ID', width: 100 },
    //     { id: 'Date', label: 'Date', width: 60 },
    //     { id: 'leavetype', label: 'Leave Type', width: 90 },
    //     { id: 'startdate', label: 'start Date', width: 90 },
    //     { id: 'enddate',label:'End Date', width: 90 },
    //     {id: 'requestedduration', label: 'Requested Duration', width: 80},
    //     { id: 'status',label:'Status',width:80}
    //   ];

  
      const TABLE_HEAD = [
        {
          id: "employee_id",
          label: "Employee Id",
          type: "text",
        },
        { id: "employee", label: "Employee", type: "text" },
        { id: "date", label: "Date", type: "text" },
        {id : "net_leave_balance",label:"Leave Balance",type:"text"},
        { id: "leave_type", label: "Leave Type", type: "text" },
        { id: "start_date", label: "start Date", type: "text" },
        {id: "end_date",label:"End Date",type:"text"},
        {id: "requested_duration",label:"Requested Duration",type:'text'},
        {id: 'status',label:'Status',type:'text'}
        // { id: '', width: 88 },
      ];
    
      const actions = [
        { name: "Approve", path: "jjj" },
        { name: "Reject",  path: "jjj" },
      ];
      const bodyContent = [
        {
          employee_id: "IB341",
          employee: "Harsha Priya",
          date: "07-10-2023",
          net_leave_balance:"3",
          leave_type:"Annual Leave",
          start_date: "31-10-2023",
          end_date: "03-11-2023",
          requested_duration: "4",
          status:'Approved'
        },
        {
          employee_id: "IB340",
          employee: "Harsha Priya",
          date: "10-10-2023",
          net_leave_balance:"4",
          leave_type:"Sick Leave",
          start_date: "29-10-2023",
          end_date: "03-11-2023",
          requested_duration: "5",
          status:'Rejected'
        },
      ];

  const  FilterValues =[
    {
      fieldName : "Gender",
      options : ["Male","Female"]
    },
    {
      fieldName : "Leave Type",
      options : ["Annual Leave","Sick Leave","Paid Leave","Casual Leave"]
    }
  ]

  const handleValues = (data) => {
    console.log(data);
  }
  
 return (
    <Card >
    {/* <div style={cardStyle}>
    <Grid container spacing={4}>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <Card sx={{ margin: "8px" }}>
              <div style={cardHeaderStyle}>Pending</div>
              <CardContent style={cardContentStyle}>
                <Typography variant="h4">10</Typography> 
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <Card sx={{ margin: "8px" }}>
              <div style={cardHeaderStyle}>Approved</div>
              <CardContent style={cardContentStyle}>
                <Typography variant="h4">1</Typography> 
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>

          </Grid>
        </Grid>
      </div>



<SearchFilter filterOptions={FilterValues} handleFilters={handleValues}/>
       */}
       <BasicTable  
         headdata={TABLE_HEAD}
        bodydata={bodyContent}
        rowActions={actions}/>
        <br/>
    </Card>
 )
}