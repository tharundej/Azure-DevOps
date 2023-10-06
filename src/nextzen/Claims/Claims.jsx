// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//     •
//   </Box>
// );

// export default function BasicCard() {
//   return (
//     <Card sx={{ minWidth: 275 }}>
//       <CardContent>
//         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//           Claims
//         </Typography>
       
      
       
//       </CardContent>
//       <CardActions>
//         <Button size="small">Learn More</Button>
//       </CardActions>
//     </Card>
//   );
// }

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function AccessibleTabs1() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs sx={{borderRadius:"10px",Color:"red",borderWidth:"2px"}}
        onChange={handleChange}
        value={value}
        aria-label="Tabs where selection follows focus"
        selectionFollowsFocus
      >
        <Tab  sx={{borderRadius:"10px",borderColor:"red",borderWidth:"2px"}} label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
    </Box>
  );
}

// import React, { useState } from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';

// const CustomTabs = () => {
//   const [value, setValue] = useState(0);
//   const [clicked, setClicked] = useState(false);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//     setClicked(true);
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Tabs
//         sx={{
//           borderRadius: "10px",
//           borderColor: "red",
//           borderWidth: "2px",
//           '& .Mui-selected': {
//             backgroundColor: 'red', // Color when selected
//             color: 'white', // Text color when selected
//           },
//           '& .MuiTab-root': {
//             backgroundColor: clicked ? 'red' : 'white', // Initial background color
//             color: clicked ? 'white' : 'black', // Initial text color
//           },
//         }}
//         onChange={handleChange}
//         value={value}
//         aria-label="Tabs where selection follows focus"
//         selectionFollowsFocus
//       >
//         <Tab
//           sx={{
//             borderRadius: "10px",
//             borderColor: "red",
//             borderWidth: "2px",
//             minWidth: 'auto', // Adjust width as needed
//           }}
//           label="Item One"
//         />
//         <Tab
//           sx={{
//             borderRadius: "10px",
//             borderColor: "red",
//             borderWidth: "2px",
//             minWidth: 'auto', // Adjust width as needed
//           }}
//           label="Item Two"
//         />
//         <Tab
//           sx={{
//             borderRadius: "10px",
//             borderColor: "red",
//             borderWidth: "2px",
//             minWidth: 'auto', // Adjust width as needed
//           }}
//           label="Item Three"
//         />
//       </Tabs>
//     </Box>
//   );
// };

// export default CustomTabs;
