import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

export default function RHFTextField({ name, helperText, type,maxLength,error,dis, ...other }) {
  const { control } = useFormContext();

  const scroolTop=()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    return true;
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        
        <TextField
          {...field}
          fullWidth
          type={type}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          onChange={(event) => {
            if (event.target.value.length > maxLength) {
              // do nothing
            }
            else if (type === 'number') {
              field.onChange(Number(event.target.value));
            }
            else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error ? scroolTop()?error?.message :helperText  : helperText}
          {...other}
          disabled={dis}
        />
        
      )}
    />
  );
}

RHFTextField.propTypes = {
  helperText: PropTypes.object,
  name: PropTypes.string,
  type: PropTypes.string,
  maxLength:PropTypes.number
};
