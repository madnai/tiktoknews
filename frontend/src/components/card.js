import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import accents from "remove-accents"
import FavoriteIcon from "@material-ui/icons/Favorite"
import IconButton from "@material-ui/core/IconButton"
import firebase from "gatsby-plugin-firebase"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  heart: {
    marginLeft: "auto",
    bottom: 0,
  },
  action: {
    display: "flex",
  },
})

const CardComponent = ({ article, page }) => {
  const [shadow, setShadow] = useState(1)
  const [viewCount, setViewCount] = useState(0)
  const [voted, SetVoted] = useState(false)
  const onMouseOver = () => setShadow(6)
  const onMouseOut = () => setShadow(1)
  const classes = useStyles()

  const title = accents(article.node.title)
  const removeSpaces = title.replace(/\s+/g, "-")
  const finalName = removeSpaces.replace(/\?/g, "")

  var formatter = new Intl.DateTimeFormat("pl", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const handleClick = () => {
    SetVoted(true)
    if (voted) {
      return
    } else {
      setViewCount(viewCount + 1)
      firebase
        .database()
        .ref(`${page}`)
        .child(article.node.strapiId)
        .set(viewCount + 1)
    }
  }

  useEffect(() => {
    // 1 is displayed for a split second and then the correct count
    // This is a workaround
    const onViews = (newViews) => {
      setViewCount(newViews.val() === 1 ? 0 : newViews.val())
    }

    let ref = firebase.database().ref(`${page}`).child(article.node.strapiId)
    ref.on("value", (snapshot) => {
      const state = snapshot.val()
      setViewCount(state)
    })
  }, [])

  return (
    <Card
      style={{ height: "100%" }}
      className={classes.root}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      elevation={0}
    >
      <Link to={`/${page}/${finalName}`} className="uk-link-reset">
        <CardMedia
          component="img"
          alt={article.node.image.publicURL}
          height="100"
          image={article.node.image.publicURL}
          title="Contemplative Reptile"
        />
        <CardContent style={{ padding: "16px 0px 0px 0px" }}>
          {/* <Typography gutterBottom variant="body2" component="h6" style={{fontSize: '12px'}}>
              {formatter.format( new Date(article.node.published_at) )}
            </Typography> */}
          <Typography
            gutterBottom
            variant="body1"
            component="h2"
            style={{ fontWeight: "600", fontSize: "2rem" }}
          >
            {article.node.title}
          </Typography>
          <Typography
            gutterBottom
            style={{ fontSize: "13px" }}
            color="textSecondary"
            component="p"
          >
            {article.node.short_description}
          </Typography>
        </CardContent>
      </Link>
      {/* <CardActions className={classes.action}>
          <IconButton className={classes.heart} aria-label="add to favorites" onClick={(article) => handleClick(article)}>
            {viewCount === 0 ? null : viewCount}
            <FavoriteIcon style={{ color: '#fe2c55' }} />
          </IconButton>
        </CardActions> */}
    </Card>
  )
}

export default CardComponent
