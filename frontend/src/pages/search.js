import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import Avatar from "@material-ui/core/Avatar"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import PeopleAltIcon from "@material-ui/icons/PeopleAlt"
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline"
import abbreviateNumber from "../utils/abbreviateNumber"
import "../assets/css/main.css"
import CircularProgress from "@material-ui/core/CircularProgress"
import VerifiedIcon from "../images/verified.svg"
import { API_URL } from '../config/index';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}))

const SearchProfile = (props) => {
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(true)
  const classes = useStyles()

  useEffect(() => {
    loadData()
  }, [props.location])

  const loadData = async () => {
    setLoading(true)
    const response = await fetch(API_URL + props.location.pathname, {
      method: "POST",
    })
    const data = await response.json()
    setUser(data)
    setLoading(false)
  }

  return (
    <Layout>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          Ładuje dane...
          <CircularProgress />
        </div>
      )}
      {!loading && (
        <div style={{ marginTop: "100px" }}>
          <Grid container alignItems="center" justify="center" spacing={3}>
            <Grid item xl={6} style={{ marginTop: "30px" }}>
              <Avatar src={user.covers[0]} className={classes.large} />
              <Button
                target="_blank"
                href={"https://www.tiktok.com/@" + user.uniqueId}
                variant="contained"
                color="secondary"
                size="small"
                style={{ marginTop: "10px", marginLeft: "10px" }}
              >
                Profil
              </Button>
            </Grid>
            <Grid item xl={6}>
              <span
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  display: "inline",
                }}
              >
                {user.uniqueId}{" "}
                {user.verified && (
                  <span>
                    <VerifiedIcon />
                  </span>
                )}
              </span>
              <div>{user.nickName}</div>
            </Grid>
          </Grid>
          <Grid container alignItems="left" justify="center" spacing={3}>
            <Grid item xl={12}>
              <PeopleAltIcon />
              {abbreviateNumber(user.fans)} Obserwujących
            </Grid>
          </Grid>
          <Grid container alignItems="left" justify="center" spacing={3}>
            <Grid item xl={12}>
              <PeopleOutlineIcon />
              {abbreviateNumber(user.following)} Obserwuje
            </Grid>
          </Grid>
          <Grid container alignItems="center" justify="center" spacing={3}>
            <Grid item xl={12}>
              <FavoriteBorderIcon />
              {abbreviateNumber(user.heart)} Polubień
            </Grid>
          </Grid>
        </div>
      )}
    </Layout>
  )
}

export default SearchProfile
