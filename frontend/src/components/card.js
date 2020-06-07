import React, { useState } from "react"
import { Link } from "gatsby"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import accents from 'remove-accents';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const CardComponent = ({ article, page }) => {
  const [shadow, setShadow] = useState(1);
  const onMouseOver = () => setShadow(6)
  const onMouseOut = () => setShadow(1)
  const classes = useStyles();

  const title = accents(article.node.title);
    const removeSpaces = title.replace(/\s+/g, '-');
    const finalName = removeSpaces.replace(/\?/g,'');

    var formatter = new Intl.DateTimeFormat( 'pl', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    } );


  return (
    <Link to={`/${page}/${finalName}`} className="uk-link-reset">
      <Card 
          style={{height: '100%'}}
          className={classes.root}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          elevation={shadow}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={article.node.image.publicURL}
            height="100"
            image={article.node.image.publicURL}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="body2" component="h6" style={{fontSize: '12px'}}>
              {formatter.format( new Date(article.node.published_at) )}
            </Typography>
            <Typography gutterBottom variant="body1" component="h6" style={{fontWeight: '600'}}>
              {article.node.title}
            </Typography>
            <Typography gutterBottom style={{fontSize: '13px'}} color="textSecondary" component="p">
              {article.node.short_description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}

export default CardComponent
