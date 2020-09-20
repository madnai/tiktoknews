import React from "react"
import CardComponent from "./card"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}))

const Articles = ({ articles, page }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {articles.map((article, i) => {
          return (
            <Grid item xs={12} lg={4} md={6} key={i}>
              <CardComponent
                article={article}
                page={page}
                key={`article__${article.node.id}`}
              />
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default Articles
