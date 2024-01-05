import { useEffect,useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { Grid, ListItemAvatar } from '@mui/material';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
//
import { ASSETS_API } from 'src/config-global';
// import UserQuickEditForm from './UserQuickEditForm';
import { useRouter } from 'src/routes/hooks';

import { RouterLink } from 'src/routes/components'; 
import SvgColor from 'src/components/svg-color/svg-color';
import { formatDate } from 'src/nextzen/global/GetDateFormat';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// ----------------------------------------------------------------------

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  headerContent,
  rowActions,
  onHandleEditRow,
  SecondoryTable,
  

}) {
  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();
  // const data = [
  //   { name: 'approve', icon: 'hh', path: 'jjj' },
  //   { name: 'view', icon: 'hh', path: 'jjj' },
  //   { name: 'eerr', icon: 'hh', path: 'jjj' },
  // ];
const renderCellContent = (columnId, value) => {
  const column = headerContent.find((col) => col.id === columnId);
  if (column && column.type === 'date') {
    return formatDate(value); // Apply date formatting
  }
  else if (value !== undefined && value !== null) {
    return value; // Return the value as is if it's not a date column
  }
  else {
    return value
  }
};
const [open, setOpen] = useState(false);
const avatarUrl="http://192.168.1.199:3001/erp/download?file=saitama.png"

  return (
    <>
     
      <TableRow hover  sx={{cursor:'pointer'}} selected={selected} >
        {/* <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell> */}
        {headerContent &&
          headerContent.map((ele) => (
            <>
              <TableCell
              onClick={()=>onHandleEditRow(row,ele?.id)}
              
                sx={{
                  display: ele.containesAvatar ? 'flex' : '',
                  alignItems: ele.containesAvatar ? 'center' : '',
                  width:ele.width || '',
                  cursor:'pointer',
                  
                }}
              >
                {ele.containesAvatar && (
                  <Avatar
                    alt={row[ele.id]}
                    src={
                      row && row.avatarURL && row.avatarURL.length > 0
                        ? row.avatarURL
                        : `${ASSETS_API}/assets/images/avatar/avatar_0.jpg`
                    }
                    sx={{ mr: 2 }}
                  />
                )}
                {/* {ele.eyeIcon && (
                  <Avatar
                    alt={row[ele.id]}
                    src={
                      row && row.avatarURL && row.avatarURL.length > 0
                        ? row.avatarURL
                        : `${ASSETS_API}/assets/images/avatar/avatar_0.jpg`
                    }
                    onClick={(row)=>{SecondoryTable(row)}}

                    sx={{ mr: 2 }}
                  />
                )} */}


          {ele.type === 'view' && (
             
             <ListItemText

               primary={(row[ele.id] === "")?(<span   style={{fontSize: 30,
               }}> <Iconify icon="" color="green" /></span>) : <Iconify icon="lets-icons:view" color="green"                     onClick={(row)=>{SecondoryTable(row)}}
               />
               
              }
               secondary={(ele.secondaryText && row[ele.secondaryText]) || ''}
               primaryTypographyProps={{ typography: 'body2'}}
               secondaryTypographyProps={{
                 component: 'span',
                 color: 'text.disabled',
               }}
             />
           )}

           {ele.type==="object" && (
            
           
            
            <ListItemText
             primary={row[ele.id]?.label}
             primaryTypographyProps={{typography: 'body2' }}
            />
              
           )}


                {ele.type === 'text' && <Grid container flexDirection="row">

                {/* <Avatar alt="A" src={avatarUrl} sx={{ mr: 2 }} /> */}
                <Tooltip title={row[ele?.id]?.length > 50 ? row[ele?.id] : ''} arrow>
                  <ListItemText
                    primary={row[ele.id]?.length>50 ?row[ele?.id].slice(0, 48) + '...': row[ele?.id]|| '-'}
                     secondary={(ele.secondaryText && row[ele.secondaryText]) || ''}
                    primaryTypographyProps={{ typography: 'body2' }}
                    secondaryTypographyProps={{
                      component: 'span',
                      color: 'text.disabled',
                    }}
                  />
                  </Tooltip>
                </Grid>}

                {
                 ele.type==="date" && (
                    renderCellContent(ele.id, row[ele.id])
                  )
                }
              
                {ele.type === 'expand' && (
  <>
    <div style={{ display: 'flex', alignItems: 'center' }}>
    <IconButton
        aria-label="expand row"
        size="small"
        onClick={() => setOpen(!open)}
        style={{ fontSize: '90px',  }} 
        
      >
        {open ? <KeyboardArrowUpIcon style={{ fontSize: '18px' }} /> : <KeyboardArrowRightIcon style={{ fontSize: '18px' }}  />}
      </IconButton>
      <ListItemText
        primary={row[ele.id]}
        secondary={(ele.secondaryText && row[ele.secondaryText]) || ''}
        primaryTypographyProps={{ typography: 'body2', }}
        secondaryTypographyProps={{
          component: 'span',
          color: 'text.disabled',
        }}
        onClick={() => setOpen(!open)}
      />
    
    </div>
  </>
)}

                 {ele.type === 'bool' && (
                 
                 <ListItemText

                   primary={(row[ele.id] === true || row[ele.id] === 1 )?(<span   style={{fontSize: 30,
                   }}> <Iconify icon="teenyicons:tick-small-outline" color="green" /></span>) : <Iconify icon="basil:cross-outline" color="red" />
                   
                  }
                   secondary={(ele.secondaryText && row[ele.secondaryText]) || ''}
                   primaryTypographyProps={{ typography: 'body2'}}
                   secondaryTypographyProps={{
                     component: 'span',
                     color: 'text.disabled',
                   }}
                 />
               )}

                 {ele.type === 'icon' && (
             
                 <ListItemText

                   primary={(row[ele.id] === "")?(<span   style={{fontSize: 30,
                   }}> <Iconify icon="" color="green" /></span>) : <Iconify icon="lets-icons:view" color="green" />
                   
                  }
                   secondary={(ele.secondaryText && row[ele.secondaryText]) || ''}
                   primaryTypographyProps={{ typography: 'body2'}}
                   secondaryTypographyProps={{
                     component: 'span',
                     color: 'text.disabled',
                   }}
                 />
               )}

                {ele.type === 'badge' && (
                  <Label
                    variant="soft"
                    color={
                      (row[ele?.id]?.toLowerCase() === 'approved' && 'success') || 
                      (row[ele?.id]?.toLowerCase() === 'swapped' && 'success') || 
                      (row[ele?.id]?.toLowerCase() === 'pending' && 'warning') ||
                      (row[ele?.id]?.toLowerCase() === 'rejected' && 'error') ||
                      (row[ele?.id]+""?.toLowerCase() === 'true' && 'success') ||
                      (row[ele?.id]+""?.toLowerCase() === 'false' && 'warning') ||
                      (row[ele?.id]?.toLowerCase() === 'completed' && 'success') ||
                      (row[ele?.id]?.toLowerCase() === 'upcoming' && 'warning') ||
                      (row[ele?.id]?.toLowerCase() === 'ongoing' && 'secondary') ||
                    
                      'default'
                    }
                  >
                    {row[ele?.id] ? row[ele?.id].toString():(row[ele?.id] === null) ? " Not Submitted":"False"}
                   
                  </Label>
                )}
              </TableCell>
            
            </>
          ))}

        {rowActions && rowActions?.length > 0 && (
          <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </TableCell>
        )}
        <CustomPopover
          open={popover.open}
          onClose={popover.onClose}
          arrow="right-top"
          sx={{ width: 140 }}
        >
          {rowActions?.map((item) => (
            <>
              <MenuItem
                onClick={() => {
                  onEditRow(item);
                
                  popover.onClose();
                }}
              >
                <Iconify icon={item?.icon} />
                {/* <SvgColor src={`item?.icon`} sx={{ width: 1, height: 1 }} /> */}
                {item?.name }
              </MenuItem>
            </>
          ))}
        </CustomPopover>
      </TableRow>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}

UserTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  SecondoryTable: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
  headerContent: PropTypes.any,
  rowActions: PropTypes.any,
  onHandleEditRow:PropTypes.any
 
};
