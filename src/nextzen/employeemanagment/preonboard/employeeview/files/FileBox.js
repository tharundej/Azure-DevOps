import React from 'react'
import PropTypes from 'prop-types';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { MenuItem ,Stack,Paper,Grid,TextMaxLine,Box,Typography,Button} from '@mui/material';
import Iconify from 'src/components/iconify';
import FileThumbnail from 'src/components/file-thumbnail/file-thumbnail';

const FileBox = ({file,onDelete,onEdit,sx,index}) => {
    console.log(file,'filefilefile')
    const popover = usePopover();

    const renderIcon =
     (
        <Grid sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',minWidth:'100px'}}>
                    <Grid item>
                 <FileThumbnail file={file?.type || " "} sx={{ width: 56, height: 36 }} />
                </Grid>
                <Grid sx={{display:'flex',flexDirection:'row'}} item>

                    <Iconify 
                  sx={{cursor: "pointer",color:'black',width:'30px',height:"20px"}}
                  onClick={()=>{onEdit(index)}}
                  icon="mdi:edit-outline" />

                    <Iconify 
                  sx={{cursor: "pointer",color:'black',width:'30px',height:"20px"}}
                  onClick={()=>{onDelete(file)}}
                  icon="material-symbols:delete-outline" />
                 
                </Grid>
      </Grid>
    );

    const renderText = (
        <>
         <Typography
            // persistent
            variant="subtitle2"
            // onClick={details.onTrue}
            sx={{ width: 1, mt: 2, mb: 0.5 }}
          >
            {file?.fileType}
          </Typography>
          <Typography
            // persistent
            variant="subtitle2"
            // onClick={details.onTrue}
            sx={{ width: 1, mt: 2, mb: 0.5 }}
          >
            {file?.fileName}
          </Typography>
    
         
        </>
      );

    
  return (


    <>

     <Stack
        component={Paper}
        variant="outlined"
        // alignItems="flex-start"
        sx={{
          p: 2.5,
          borderRadius: 2,
          bgcolor: 'unset',
          cursor: 'pointer',
        //   position: 'relative',
       
          
        }}
        
      >
        {renderIcon} 

      
        {renderText}

       
        </Stack>
       
       
        </>
  )
}

export default FileBox;

FileBox.propTypes = {
    file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    
    sx: PropTypes.object,
  };
  