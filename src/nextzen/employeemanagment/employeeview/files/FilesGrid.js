import React from 'react'
import PropTypes from 'prop-types';
import { Box } from '@mui/material'
import FileBox from './FileBox';



const FilesGrid = ({dataFiltered,onEdit,onDelete}) => {

   
    const onSelectItem=(id)=>{

    }

    const onDeleteItem=(id)=>{
        
    }
  return (
            <Box
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            }}
            gap={3}
          >
            {dataFiltered?.length && dataFiltered
              ?.filter((i) => i?.type !== 'folder')
              ?.map((file,index) => (
                file.fileType &&(

                   
                <FileBox
                  key={file?.id}
                  file={file}
                  index={index}
                  
                  onEdit={onEdit}
                  onDelete={onDelete}
                  sx={{ maxWidth: 'auto' }}/>
                
                
                )
                
              ))}
          </Box>
  )
}

export default FilesGrid

FilesGrid.PropTypes={
    dataFiltered: PropTypes.any,
    onEdit:PropTypes.func,
    onDelete:PropTypes.func
}