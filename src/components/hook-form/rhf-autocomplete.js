import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// ----------------------------------------------------------------------

export default function RHFAutocomplete({ name, label, placeholder, helperText,onChnageAutoComplete,onChnageAutoCompleteState,onChnageAutoCompletercountry,onChnageAutoCompleterState ,...other }) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          
          onChange={(event, newValue) => {
            if(onChnageAutoComplete){
              onChnageAutoComplete(newValue);
            }
            if(onChnageAutoCompleteState){
              onChnageAutoCompleteState(newValue)
            }

            if(onChnageAutoCompleterState){
              onChnageAutoCompleterState(newValue)
            }
            if(onChnageAutoCompletercountry){
              onChnageAutoCompletercountry(newValue)
            }
           
            setValue(name, newValue, { shouldValidate: true })}}
          renderInput={(params) => (
            // console.log(params),
            <TextField
              label={label}
              placeholder={placeholder}
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...params}
            />
          )}
          {...other}
        />
      )}
    />
  );
}

RHFAutocomplete.propTypes = {
  helperText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};
