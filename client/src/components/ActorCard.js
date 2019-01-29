import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 200,
    margin: 20
  },
  media: {
    height: 200,
  },
};

function ActorCard(props) {
  const { classes, image, title } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h5">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

ActorCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActorCard);
