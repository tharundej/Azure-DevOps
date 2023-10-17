import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { MuiOtpInput } from 'mui-one-time-password-input';
// @mui
import FormHelperText from '@mui/material/FormHelperText';
import {Stack} from '@mui/material'

// ----------------------------------------------------------------------

export default function RHFCode({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack sx={{maxWidth:'400px'}}>
          <MuiOtpInput
            {...field}
            autoFocus
            gap={1.5}
            length={6}
            TextFieldsProps={{
              error: !!error,
              placeholder: '-',
            }}
            {...other}
          />
         

          {error && (
            <FormHelperText sx={{ px: 2 }} error>
              {error.message}
            </FormHelperText>
          )}
           </Stack>
        
      )}
    />
  );
}

RHFCode.propTypes = {
  name: PropTypes.string,
};
