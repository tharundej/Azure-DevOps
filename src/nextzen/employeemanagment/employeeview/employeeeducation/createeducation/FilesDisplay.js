import React from 'react'
import { Stack,Box,Grid,IconButton,Typography } from '@mui/material'
import Iconify from 'src/components/iconify';

const FilesDisplay = ({dataOfFiles}) => {
    console.log(dataOfFiles,'dataOfFiles')
    const data=[{name:'anil'}]
    const categoryPic=()=>{

        return (
            <Box component="img" src="/assets/icons/files/ic_img.svg" />
        )
    }
  
  return (
    <>
  <Grid container spacing={5}>
  {dataOfFiles?.map((category) => (
    <Grid key={category.name} item xs={12} md={6} lg={6} container flexDirection="row" alignItems="center" justifyContent="space-between">
      <Grid  item>
        <Box sx={{ width: 40, height: 40 }}>
          <Box component="img" src="/assets/icons/files/ic_img.svg" />
        </Box>
       
      </Grid>
      <Grid item>
      <Typography>{category?.fileName}</Typography>

      </Grid>

      <Grid item>
        <IconButton>
          <Iconify icon="material-symbols:edit" />
        </IconButton>
      </Grid>
    </Grid>
  ))}
</Grid>
        
   </>
  )
}

export default FilesDisplay;