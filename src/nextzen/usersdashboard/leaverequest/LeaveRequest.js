import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import ListItemText from '@mui/material/ListItemText';
// utils
import { fToNow } from 'src/utils/format-time';
// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { formatDateBirthday,formatDateToYYYYMMDD,formatDate } from 'src/nextzen/global/GetDateFormat';
// ----------------------------------------------------------------------

export default function LeaveRequest({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 1 }} />

      <Scrollbar>
        {list.map((news) => (
          <NewsItem key={news.id} news={news} />
        ))}
      </Scrollbar>

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

LeaveRequest.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function NewsItem({ news }) {
  const {  employeeName,fromDate,toDate } = news;

  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      sx={{
        py: 2,
        px: 3,
        minWidth: 640,
        borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
    >
      {/* <Avatar
        variant="rounded"
        alt={title}
        src={coverUrl}
        sx={{ width: 48, height: 48, flexShrink: 0 }}
      /> */}

      <ListItemText
        primary={employeeName}
        secondary={`${formatDate(fromDate)} - ${formatDate(toDate)}`}
        primaryTypographyProps={{
          noWrap: true,
          typography: 'subtitle2',
        }}
        secondaryTypographyProps={{
          mt: 0.5,
          noWrap: true,
          component: 'span',
        }}
      />

      {/* <Box sx={{ flexShrink: 0, color: 'text.disabled', typography: 'caption' }}>
        {fToNow(postedAt)}
      </Box> */}
    </Stack>
  );
}

LeaveRequest.propTypes = {
  news: PropTypes.object,
};
