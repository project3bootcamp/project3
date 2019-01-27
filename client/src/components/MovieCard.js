import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = {
  card: {
    width: 342,
  },
  media: {
    height: 500,
  },
};

function MovieCard(props) {
  const { classes, image, title, desc } = props;
  return (
    <Card className={classes.card}>
        <a href={props.href} target="_blank" rel="noopener noreferrer">
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={title}
          />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography component="p">
            {desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      </a>
    </Card>
  );
}

MovieCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MovieCard);
