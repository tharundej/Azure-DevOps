import * as Yup from 'yup';

import { useCallback, useMemo, useState } from 'react';

import FormProvider, {
    RHFTextField,
    RHFAutocomplete,
  } from 'src/components/hook-form';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function Applyleave(){

    const ApplyLeaveSchema = Yup.object().shape({
        start_date : Yup.string().required('Start Date is required'),
        end_date : Yup.string().required('End Date is required'),
        leave_type: Yup.string().required('Leave Type is required'),
        attachment: Yup.string(),
        comment : Yup.string().required('Comments are required'),
        dayspan : Yup.string(),
    })
    return (
        <>
        Apply leave
        </>
    )
}