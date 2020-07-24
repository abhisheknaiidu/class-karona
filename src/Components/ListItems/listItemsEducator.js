import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import {Link} from 'react-router-dom';

export const secondaryListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Notes" />
      </ListItem>
      <ListItem button>
      <ListItemIcon>
        <Link to='/educator/addcourse'><AddToPhotosIcon style={{ textDecoration:'none', color: 'white' }}/></Link>
      </ListItemIcon>
      <ListItemText primary="Add Course" />
    </ListItem>
  </div>
);
