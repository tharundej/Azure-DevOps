import { useEffect } from 'react';
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

// ----------------------------------------------------------------------

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  headerContent,
  rowActions,
  onHandleEditRow

}) {
  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();
  // const data = [
  //   { name: 'approve', icon: 'hh', path: 'jjj' },
  //   { name: 'view', icon: 'hh', path: 'jjj' },
  //   { name: 'eerr', icon: 'hh', path: 'jjj' },
  // ];

console.log(row,'row data')
  
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
              onClick={()=>onHandleEditRow(row?.employeeId)}
                sx={{
                  display: ele.containesAvatar ? 'flex' : '',
                  alignItems: ele.containesAvatar ? 'center' : '',
                  width:ele.width || '',
                  height:1,
                  cursor:'pointer'
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

                {ele.type === 'text' && (
                  <ListItemText
                    primary={row[ele.id]}
                    secondary={(ele.secondaryText && row[ele.secondaryText]) || ''}
                    primaryTypographyProps={{ typography: 'body2' }}
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
                      (row[ele.id] === ('approved' || 'Approved') && 'success') ||
                      (row[ele.id] === ('pending' || 'Pending') && 'warning') ||
                      (row[ele.id] === ('rejected' || 'Rejected') && 'error') ||
                      'default'
                    }
                  >
                    {row[ele.id]}
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
  row: PropTypes.object,
  selected: PropTypes.bool,
  headerContent: PropTypes.any,
  rowActions: PropTypes.any,
  onHandleEditRow:PropTypes.any
 
};
