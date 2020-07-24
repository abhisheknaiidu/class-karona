import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import NotificationImportantSharpIcon from '@material-ui/icons/NotificationImportantSharp';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <NotificationImportantSharpIcon />
      </ListItemIcon>
      <ListItemText primary="Announcements" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <EmojiPeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Attendence" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Notes" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
      </ListItem>
  </div>
);