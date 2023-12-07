import React from 'react'
import { Stack,Box } from '@mui/material'

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
    <Stack spacing={3} sx={{ px: 3, pb: 5 }}>
        {dataOfFiles?.map((category) => 
          <Stack key={category.name} spacing={2} direction="row" alignItems="center">
            <Box sx={{ width: 40, height: 40 }}><Box component="img" src="/assets/icons/files/ic_img.svg" /></Box>


            {category?.fileName}
          

            {/* <Box sx={{ typography: 'subtitle2' }}> {fData(category.usedStorage)} </Box> */}
        
          </Stack>
        )}
        </Stack>
        
   </>
  )
}

export default FilesDisplay;