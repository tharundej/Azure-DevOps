import React from 'react'
import PropTypes from 'prop-types';
import { Box } from '@mui/material'
import FileBox from './FileBox';



const FilesGrid = ({dataFiltered}) => {

    console.log(dataFiltered,'looool')
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
            {dataFiltered
              ?.filter((i) => i?.type !== 'folder')
              ?.map((file) => (
                file.fileType &&(
                <FileBox
                  key={file?.id}
                  file={file}
                  
                  onSelect={() => onSelectItem(file?.id)}
                  onDelete={() => onDeleteItem(file?.id)}
                  sx={{ maxWidth: 'auto' }}
                />)
                
              ))}
          </Box>
  )
}

export default FilesGrid

FilesGrid.PropTypes={
    dataFiltered: PropTypes.any,
}