import { Card, CardHeader } from '@mui/material'
import React from 'react'
import { Stack } from 'rsuite'
import Scrollbar from 'src/components/scrollbar'

const Alert = ({ title,  list, ...other }) => {
  return (
    <Card {...other}
    sx={{ height: '50vh' }}
     >
    <CardHeader title={title} />
    <Scrollbar sx={{ pb: 1 }}>
    <Stack spacing={3} sx={{ p: 3 }}>
      {/* {list.map((author, index) => (
        <AuthorItem key={author.employeeID} author={author} index={index} />
      ))} */}
    </Stack>
    </Scrollbar>
  
  </Card>
  )
}

export default Alert
