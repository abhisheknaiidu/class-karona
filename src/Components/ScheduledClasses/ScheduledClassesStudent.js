import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    root: {
      maxWidth: 400,
    },
    media: {
      height: 140,
    },
  });

function ScheduledClassesStudent() {

    const classes = useStyles();

    return(
        <>
            <h1>Dashboard</h1>
            <div>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                className={classes.media}
                                style={{backgroundColor: 'green'}}
                                title="CS202"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                <Link to="/student/courseId" style={{ color:'green', textDecoration: 'none'}}>
                                   CS202 OOPs with Java
                                </Link>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    CS202
                                </Typography>
                                </CardContent>
                                </CardActionArea>
                                <CardActions>
                                <Button size="small" color="primary">
                                    Go to course
                                </Button>
                                <Button size="small" color="primary">
                                    See notes
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                style={{backgroundColor: 'red'}}
                                className={classes.media}
                                title="CS204"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h6" component="h2">
                                <Link to="/student/courseId" style={{ color:'red', textDecoration: 'none'}}>
                                    CS204 - Design and analysis of Algorithm
                                </Link>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    CS204
                                </Typography>
                                </CardContent>
                                </CardActionArea>
                                <CardActions>
                                <Button size="small" color="primary">
                                    Go to course
                                </Button>
                                <Button size="small" color="primary">
                                    See notes
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                style={{backgroundColor: 'pink'}}
                                className={classes.media}
                                title="CS203"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                <Link to="/student/courseId" style={{ color:'pink', textDecoration: 'none'}}>
                                    CS203
                                </Link>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    CS203
                                </Typography>
                                </CardContent>
                                </CardActionArea>
                                <CardActions>
                                <Button size="small" color="primary">
                                    Go to course
                                </Button>
                                <Button size="small" color="primary">
                                    See notes
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default ScheduledClassesStudent;