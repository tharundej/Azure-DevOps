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
// ----------------------------------------------------------------------

export default function BirthdayReminders({ title,  list, ...other }) {
  const recordsToShow = 5;
  return (
    <Card {...other} sx={{ maxHeight: `calc(${recordsToShow} * 70px)`, overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#888 #f0f0f0', '&::-webkit-scrollbar-thumb': { background: '#888' }, '&::-webkit-scrollbar-track': { background: '#f0f0f0' }, '&::-webkit-scrollbar-button': { display: 'none' }, '&::-webkit-scrollbar-corner': { display: 'none' } }}>
    <CardHeader title={title} />

    <Stack spacing={3} sx={{ p: 3 }}>
      {list.slice(0, recordsToShow).map((author, index) => (
        <AuthorItem key={author.employeeID} author={author} index={index} />
      ))}
    </Stack>
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
      <Avatar alt={author?.name} src={author?.avatarUrl} />

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{author?.name}</Typography>

        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary',
          }}
        >
         {formatDateBirthday(author?.dataOfBirth)}
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
