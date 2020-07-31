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
      maxWidth: '100%',
      flexBasis: '82%', 
    },
    media: {
      height: 140,
    },
  });

function ScheduledClassesEducator({courses}) {

    const classes = useStyles();

    let cards;

     cards = courses.map( (item,i) => { 
        //  console.log(item)
     return (
        
        <Grid item xs={12} md={6} lg={4}>
            <Card key={i} className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    style={{backgroundColor: 'green'}}
                    title="CS202"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    <Link to="/student/courseId" style={{ color:'green', textDecoration: 'none'}}>
                        {item.courseCode}
                    </Link>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {item.courseName}
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
        // </Grid>
        )
     })  

       return(
           <div className={classes.cards}>
               <h1>My Lectures</h1>
               <Grid container spacing={2}>
                {cards}
               </Grid>
           </div>
    );
}

export default ScheduledClassesEducator;