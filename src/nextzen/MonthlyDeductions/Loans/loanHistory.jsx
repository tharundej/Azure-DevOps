
import PropTypes from 'prop-types';
// @mui
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
// utils
import { fDateTime } from 'src/utils/format-time';
import { formatDateTimeToYYYYMMDDHHMMSS, formatDateToYYYYMMDD } from 'src/nextzen/global/GetDateFormat';

// ----------------------------------------------------------------------

export default function LoanHistory({ history,userHistory }) {
    let entries;
    let hrentries;
    if(userHistory){
    entries = Object.entries(userHistory)?.map(([time, title]) => ({ time, title }));
    }

    if(history){
        hrentries = Object.entries(history)?.map(([time, title]) => ({ time, title }));
    }
console.log(entries,"historyy",hrentries);
//   const renderSummary = (
//     <Stack
//       spacing={2}
//       component={Paper}
//       variant="outlined"
//       sx={{
//         p: 2.5,
//         minWidth: 260,
//         flexShrink: 0,
//         borderRadius: 2,
//         typography: 'body2',
//         borderStyle: 'dashed',
//       }}
//     >
//         User History
//       <Stack spacing={0.5}>
//         <Box sx={{ color: 'text.disabled' }}>Order time</Box>
//         {/* {fDateTime(history.orderTime)} */}
//       </Stack>
//       <Stack spacing={0.5}>
//         <Box sx={{ color: 'text.disabled' }}>Payment time</Box>
//         {/* {fDateTime(history.orderTime)} */}
//       </Stack>
//       <Stack spacing={0.5}>
//         <Box sx={{ color: 'text.disabled' }}>Delivery time for the carrier</Box>
//         {/* {fDateTime(history.orderTime)} */}
//       </Stack>
//       <Stack spacing={0.5}>
//         <Box sx={{ color: 'text.disabled' }}>Completion time</Box>
//         {/* {fDateTime(history.orderTime)} */}
//       </Stack>
//     </Stack>
//   );

  const userRemarksTimeline = (
    <Timeline
      sx={{
        p: 0,
        m: 0,
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {entries?.map((item, index) => {
        const firstTimeline = index === 0;

        const lastTimeline = index === entries?.length - 1;

        return (
      
       <TimelineItem key="User Remarks" sx={{mt:1}}>
            <TimelineSeparator>
              <TimelineDot color={(firstTimeline && 'primary') || 'grey'} />
              {lastTimeline ? null : <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent>
              <Typography variant="subtitle2">{item?.title}</Typography>

              <Box sx={{ color: 'text.disabled', typography: 'caption', mt: 0.5 }}>
                {formatDateTimeToYYYYMMDDHHMMSS(item?.time)}
              </Box>
            </TimelineContent>
          </TimelineItem>
          
        );
      })}
    </Timeline>
  );

  const hrRemarksTimeline = (
    <Timeline
      sx={{
        p: 0,
        m: 0,
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {hrentries?.map((item, index) => {
        const firstTimeline = index === 0;

        const lastTimeline = index === hrentries?.length - 1;

        return (
          <TimelineItem key="HR Remarks">
            <TimelineSeparator>
              <TimelineDot color={(firstTimeline && 'primary') || 'grey'} />
              {lastTimeline ? null : <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent>
              <Typography variant="subtitle2">{item?.title}</Typography>

              <Box sx={{ color: 'text.disabled', typography: 'caption', mt: 0.5 }}>
                {formatDateTimeToYYYYMMDDHHMMSS(item?.time)}
              </Box>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
  return (
    <Card>
      <CardHeader title="History" />
      <Stack
        spacing={3}
        alignItems={{ md: 'flex-start' }}
        direction={{ xs: 'column-reverse', md: 'row' }}
        sx={{ p: 3 }}
      >
        
        {userRemarksTimeline}

        {hrRemarksTimeline}
      </Stack>
    </Card>
  );
}

LoanHistory.propTypes = {
  history: PropTypes.object,
};
