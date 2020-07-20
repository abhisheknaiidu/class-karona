import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from '../Components/Header';
import SEO from '../Components/Seo';
import GoogleIcon from '../assets/google.png';
import authentication from '../services/authentication';
import { withSnackbar } from 'notistack';
import { Redirect } from 'react-router-dom';

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createSnackbar = (message, variant) => {
    this.props.enqueueSnackbar(message, {
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'bottom',
      },
      variant: variant,
    });
  };

  signInWithAuthProvider = (providerId) => {
    authentication
      .signInWithAuthProvider(providerId)
      .then((user) => {
        this.createSnackbar(
          `Signed in as ${user.displayName || user.email}`,
          'success',
        );
      })
      .catch((reason) => {
        console.log(reason)
        const code = reason.code;
        const message = reason.message;

        switch (code) {
          case 'auth/account-exists-with-different-credential':
          case 'auth/auth-domain-config-required':
          case 'auth/cancelled-popup-request':
          case 'auth/operation-not-allowed':
          case 'auth/operation-not-supported-in-this-environment':
          case 'auth/popup-blocked':
          case 'auth/popup-closed-by-user':
          case 'auth/unauthorized-domain':
            this.createSnackbar(message, 'error');
            return;

          default:
            this.createSnackbar(message, 'error');
            return;
        }
      });
  };

  render() {
    const { classes, user, access } = this.props;

    if (user && access) {
      return (
        <Redirect to={"/" + access} />
      );
    }

    return (
      <>
        <SEO title="Login" />
        <Header />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
          </Typography>
          </div>
          <Box mt={8}>
          </Box>
          <Button fullWidth
            onClick={() => this.signInWithAuthProvider('google.com')}>
            <img src={GoogleIcon}
              style={{ width: '25px', height: '25px' }}
              alt="Google Icon" />
              Log In with Google
          </Button>
        </Container>
      </>
    );
  }
}


Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withSnackbar(withStyles(styles)(Login));