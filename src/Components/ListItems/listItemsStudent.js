import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <>
    <div>
    <Link style={{ textDecoration:'none', color: 'white' }} to="/student">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Link style={{ textDecoration:'none', color: 'white' }} to="/student/recent_streams">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Recent Streams" />
      </ListItem>
    </Link>
    <Link style={{ textDecoration:'none', color: 'white' }} to="/student/time_table">
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Time Table" />
      </ListItem>
    </Link>
    </div>
  </>
);

export const secondaryListItems = (
  <div>
   <Link style={{ textDecoration:'none', color: 'white' }} to="/student/attendence">
    <ListItem button>
      <ListItemIcon>
        < AccountBalanceIcon />
      </ListItemIcon>
      <ListItemText primary="Time Table" />
    </ListItem>
    </Link>
    <Link style={{ textDecoration:'none', color: 'white' }} to="/student/recent_notes">
    <ListItem button>
      <ListItemIcon>
      <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Notes" />
    </ListItem>
    </Link>
  </div>
);