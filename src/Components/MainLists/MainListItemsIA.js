import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import BarChartIcon from '@material-ui/icons/BarChart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="DashBoard" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
            <Link to="instituteadmin/addeducator" ><PersonAddIcon style={{ textDecoration:'none', color: 'white' }} fontSize="medium" color="primary"/></Link>
        </ListItemIcon>
        <ListItemText primary="Add Educators" />
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Time Table" />
        {!open ? <ExpandMore /> : <ExpandLess /> }
      </ListItem>
      <Collapse in={open} unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Freshman Year" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Sophomore Year" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Pre-final Year" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Final Year" />
          </ListItem>
        </List>
      </Collapse>
      </>
  );
}
