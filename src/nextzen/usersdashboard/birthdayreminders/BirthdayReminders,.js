import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
// utils
import { fShortenNumber } from 'src/utils/format-number';
// components
import Iconify from 'src/components/iconify';
import { formatDateBirthday } from 'src/nextzen/global/GetDateFormat';
import Scrollbar from 'src/components/scrollbar';
// ----------------------------------------------------------------------

export default function BirthdayReminders({ title,  list, ...other }) {
  const recordsToShow = 5;
  return (
    <Card {...other}
    sx={{ height: '50vh' }}
     >
    <CardHeader title={title} />
    <Scrollbar sx={{ pb: 1 }}>
    <Stack spacing={3} sx={{ p: 3 }}>
      {list.map((author, index) => (
        <AuthorItem key={author.employeeID} author={author} index={index} />
      ))}
    </Stack>
    </Scrollbar>
  
  </Card>
  );
}

BirthdayReminders.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function AuthorItem({ author, index }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar alt={author?.employeeName} src={author?.avatarUrl} />

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{author?.employeeName}</Typography>

        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary',
          }}
        >
         {formatDateBirthday(author?.dateOfBirth)}
        </Typography>
      </Box>

      <Iconify
        icon="la:birthday-cake"
        sx={{
          p: 1,
          width: 40,
          height: 40,
          borderRadius: '50%',
          color: 'primary.main',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          ...(index === 1 && {
            color: 'info.main',
            bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
          }),
          ...(index === 2 && {
            color: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
          }),
        }}
      />
    </Stack>
  );
}

AuthorItem.propTypes = {
  author: PropTypes.object,
  index: PropTypes.number,
};
