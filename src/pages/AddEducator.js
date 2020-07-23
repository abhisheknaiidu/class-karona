import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { secondaryListItems } from '../Components/listItemsEducator';
import authentication from '../services/authentication';
import { withSnackbar } from 'notistack';
import { Redirect } from 'react-router-dom';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import MainListItemsAddEducator from '../Components/MainListItemsAddEducator';
import { Button ,Row} from 'react-bootstrap';
import FormControl from '@material-ui/core/FormControl';
import {Input,Select} from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 750,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 390,
  },
  inputRoot: {
    fontSize: 30
  },
  labelRoot: {
    fontSize: 30,
    color: "red",
    "&$labelFocused": {
      color: "purple"
    }
  },
  margin: {
    margin: theme.spacing(1),
  }
});


function AddEducator(props) {


  const [open, setOpen] = useState(false);

  function handleDrawerState(drawerState) {
    setOpen(drawerState)
  };

  function createSnackbar(message, variant) {
    props.enqueueSnackbar(message, {
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'bottom',
      },
      variant: variant,
    });
  };

  function signOut() {
    authentication.signOut().then(() => {
      createSnackbar('Signed out Successfully!', 'success');
    });
  };

    const { classes, access, user } = props;
    

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    if(!user || access !== 'student') {
      return (
        <Redirect to="/" />
      )
    }

    return (
      <>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => handleDrawerState(true)}
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
              >
                <MenuIcon />
              </IconButton>
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                My Desk
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={0} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit" onClick={() => signOut()}>
                <Badge badgeContent={0} color="secondary">
                  <ExitToAppTwoToneIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={() => handleDrawerState(false)}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
              <MainListItemsAddEducator />
            <Divider />
            <List>{secondaryListItems}</List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} xs={12} md={6} lg={3}/>
            <Container maxWidth="lg" style={{marginTop: '60px'}}>
              <Grid container spacing={2}>
                <Grid item lg={12}>
                  <Grid container justify="center" alignItems="center" spacing={40}>
                    <h1>Add Educator :</h1>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={0} style={{marginTop: '10px',marginLeft: '300px'}}>                
                <Grid item lg={12} className="d-flex">
                  <FormControl>
                    <Row>
                      <FormLabel style={{marginRight: '58px'}}>Educator Title :</FormLabel>
                      <Select native placeholder="Title">
                        <option aria-label="None" value="" />
                        <option value={10}>Prof.</option>
                        <option value={20}>Assisstant Prof.</option>
                        <option value={30}>Dr.</option>
                      </Select>
                    </Row>
                  </FormControl>
                </Grid>
                <Grid item lg={12} className="d-flex">
                  <FormControl>
                    <Row>
                      <FormLabel style={{marginRight: '20px'}}>Educator First Name :</FormLabel>
                      <Input id="my-input" aria-describedby="my-helper-text" placeholder="  Without Title"/>
                    </Row>
                  </FormControl>
                </Grid>
                <Grid item lg={12} className="d-flex">
                  <FormControl>
                    <Row>
                      <FormLabel style={{marginRight: '20px'}}>Educator Last Name :</FormLabel>
                      <Input id="my-input" aria-describedby="my-helper-text" placeholder="  Last Name"/>
                    </Row>
                  </FormControl>
                </Grid>
                <Grid item lg={12} className="d-flex">
                  <FormControl>
                    <Row>
                      <FormLabel style={{marginRight: '20px'}}>Educator Department :</FormLabel>
                      <Select native>
                        <option aria-label="None" value="" />
                        <option value={10}>CSE</option>
                        <option value={20}>ECE</option>
                        <option value={30}>ME</option>
                        <option value={30}>Design</option>
                      </Select>
                    </Row>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{marginTop: '20px'}}>
                <Grid item lg={12}>
                  <Grid container justify="center" alignItems="center" spacing={40}>
                  <Button variant="contained" size="large" color="primary" className={classes.margin}>
                    Add Educator
                  </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Container>  
          </main>
        </div>
      </>
    );
  }

AddEducator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withSnackbar(withStyles(styles)(AddEducator));