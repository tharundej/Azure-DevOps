import React from 'react'
import { Stack,Typography } from '@mui/material'

const PunchCard = ({text,time}) => {
  return (
    <Stack  sx={{
        p: 3,
        // px: 3,
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        color: 'common.white',
      //   bgcolor: `info.dark`,
        minHeight:"15vh",
        width: '200px',
        border:'solid',
        borderColor:'white'
      }}>
  
          <Stack  direction="column"
      alignItems="center"
      justifyContent="center">
  
          <Typography>{text}</Typography>
          <Typography>{time}</Typography>
      </Stack>
      </Stack>
  )
}

export default PunchCard