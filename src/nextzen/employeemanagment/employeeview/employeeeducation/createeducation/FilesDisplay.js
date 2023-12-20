import React from 'react'
import { Stack,Box,Grid,IconButton,Typography } from '@mui/material'
import Iconify from 'src/components/iconify';

const FilesDisplay = ({dataOfFiles,handleDeleteDocument}) => {
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
  {dataOfFiles && dataOfFiles?.map((category,index) => (
    <Grid key={category.name} item xs={12} md={6} lg={6} container flexDirection="row" alignItems="center" justifyContent="space-between">
      <Grid  item>
        <Box sx={{ width: 40, height: 40 }}>
          <Box component="img" src="/assets/icons/files/ic_pdf.svg" />
        </Box>
       
      </Grid>
      <Grid item>
      <Typography>{category?.fileName}</Typography>

      </Grid>

      <Grid item>
        <IconButton onClick={()=>{handleDeleteDocument(0,index,category)}}>
          <Iconify icon="material-symbols:delete" />
        </IconButton>
      </Grid>
    </Grid>
  ))}
</Grid>
        
   </>
  )
}

export default FilesDisplay;