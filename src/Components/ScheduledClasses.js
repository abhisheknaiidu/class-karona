import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

function ScheduledClasses() {

    const classes = useStyles();

    return(
        <div className="col-12 col-md-5 m-1">
            <h1>My Courses</h1>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image="/images/cards/naidu.jpg"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        React 101
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        React is an open-source JavaScript library for building user interfaces.
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
        </div>
    );
}

export default ScheduledClasses;