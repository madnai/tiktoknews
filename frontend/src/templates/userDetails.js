import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import Avatar from "@material-ui/core/Avatar"
import { makeStyles } from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"
import VerifiedIcon from "../images/verified.svg"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import PeopleAltIcon from "@material-ui/icons/PeopleAlt"
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline"
import abbreviateNumber from "../utils/abbreviateNumber"
import Typography from "@material-ui/core/Typography"
import CommentIcon from "@material-ui/icons/Comment"
import InstagramIcon from "../images/logo.svg"
import Hidden from "@material-ui/core/Hidden"
import { API_URL } from '../config/index';

var commaNumber = require("comma-number")

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
const UserDetails = (props) => {
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(true)
  const classes = useStyles()

  const loadData = async () => {
    console.log("PROPS ", props)
    const response = await fetch(`${API_URL}/user/` + props.pageContext.id)
    const data = await response.json()
    setUser(data)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

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
        <div>
          <Grid container alignItems="center" justify="center" spacing={3}>
            <Grid item style={{ marginTop: "30px" }}>
              <Avatar
                style={{ width: "132px", height: "132px" }}
                src={user.coversMedium[0]}
                className={classes.large}
              />
              <Button
                className="profile-button"
                target="_blank"
                href={"https://www.tiktok.com/@" + user.uniqueId}
                variant="contained"
                color="secondary"
                size="small"
                style={{
                  marginTop: "10px",
                  width: "132px",
                  textDecoration: "none",
                  borderRadius: "50px",
                  textAlign: "center",
                }}
              >
                Profil
              </Button>
            </Grid>
            <Grid item alignItems="center" justify="center">
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h4" style={{ fontWeight: "bold" }}>
                  {user.uniqueId}
                </Typography>{" "}
                {user.verified && (
                  <span style={{ paddingLeft: "10px" }}>
                    <VerifiedIcon />
                  </span>
                )}
              </div>
              <Typography variant="h6">{user.nickName}</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            justify="center"
            spacing={3}
            style={{ marginTop: "20px" }}
          >
            <Hidden xsDown>
              <Grid item lg={4} xs={0}></Grid>
            </Hidden>
            <Grid item lg={4} xs={12}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "35px",
                }}
              >
                {/* <PeopleAltIcon fontSize="large" /> */}
                <img
                  src="https://i.ibb.co/hDTK9Xj/icons8-staff-100.png"
                  width="50px"
                />
                <Typography
                  variant="h5"
                  style={{ fontWeight: "bold", paddingLeft: "10px" }}
                >
                  {abbreviateNumber(user.fans)} Obserwujących
                </Typography>
              </div>
            </Grid>
            <Hidden xsDown>
              <Grid item lg={4}></Grid>
            </Hidden>
          </Grid>
          <Grid container alignItems="left" justify="center" spacing={3}>
            <Hidden xsDown>
              <Grid item lg={4} xs={0}></Grid>
            </Hidden>
            <Grid item lg={4} xs={12}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "35px",
                }}
              >
                {/* <PeopleOutlineIcon fontSize="large" /> */}
                <img
                  src="https://i.ibb.co/J3BKvY6/icons8-staff-100-1.png"
                  width="50px"
                />
                <Typography
                  variant="h5"
                  style={{ fontWeight: "bold", paddingLeft: "10px" }}
                >
                  {abbreviateNumber(user.following)} Obserwuje
                </Typography>
              </div>
            </Grid>
            <Hidden xsDown>
              <Grid item lg={4} xs={0}></Grid>
            </Hidden>
          </Grid>
          <Grid container alignItems="center" spacing={3}>
            <Hidden xsDown>
              <Grid item lg={4}></Grid>
            </Hidden>
            <Grid item lg={4}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "35px",
                }}
              >
                {/* <FavoriteBorderIcon fontSize="large" /> */}
                <img
                  src="https://i.ibb.co/Mc65yJh/icons8-heart-100.png"
                  width="50px"
                />
                <Typography
                  variant="h5"
                  style={{ fontWeight: "bold", paddingLeft: "10px" }}
                >
                  {abbreviateNumber(user.heart)} Polubień
                </Typography>
              </div>
            </Grid>
            <Hidden xsDown>
              <Grid item lg={4}></Grid>
            </Hidden>
          </Grid>
          {user.totalComments[0] && (
            <Grid container alignItems="center" spacing={3}>
              <Hidden xsDown>
                <Grid item lg={4}></Grid>
              </Hidden>
              <Grid item lg={4}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "35px",
                  }}
                >
                  {/* <QuestionAnswerIcon fontSize="large" /> */}
                  <img
                    src="https://i.ibb.co/3z2Y1vf/icons8-communication-100.png"
                    width="50px"
                  />
                  <Typography
                    variant="h5"
                    style={{ fontWeight: "bold", paddingLeft: "10px" }}
                  >
                    {abbreviateNumber(user.totalComments[0].Total)} Komentarzy
                  </Typography>
                </div>
              </Grid>
              <Hidden xsDown>
                <Grid item lg={4}></Grid>
              </Hidden>
            </Grid>
          )}
          <Grid container alignItems="center" justify="center" spacing={3}>
            <Grid item lg={12} xs={12} style={{ marginTop: "50px" }}>
              <Typography
                variant="h4"
                style={{
                  textAlign: "center",
                  marginBottom: "30px",
                  fontFamily: "Rubik",
                  fontSize: "64px",
                  fontWeight: "bold",
                }}
              >
                Opis
              </Typography>
              <span style={{ fontSize: "1.5rem" }}>{user.description}</span>
              {!user.description && (
                <span>Nie mamy jeszcze opisu dla {user.uniqueId}</span>
              )}
            </Grid>
          </Grid>
          <Grid style={{ marginTop: "50px", marginBottom: "30px" }}>
            <Typography
              variant="h4"
              style={{
                textAlign: "center",
                fontFamily: "Rubik",
                fontSize: "64px",
                fontWeight: "bold",
              }}
            >
              Kluczowe wskaźniki
            </Typography>
          </Grid>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} lg={4}>
              <div style={{ paddingBottom: "15px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* <VisibilityIcon fontSize="large" /> */}
                  <img
                    src="https://i.ibb.co/TYprSd1/icons8-eye-100.png"
                    width="50px"
                  />
                  <span style={{ paddingLeft: "10px", fontSize: "2.125rem" }}>
                    {commaNumber(user.totalViews[0].Total)}
                  </span>
                </div>
                <span style={{ paddingLeft: "60px", fontSize: "14px" }}>
                  Całkowita ilość wyświetleń
                </span>
              </div>

              <div style={{ paddingBottom: "15px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* <FavoriteBorderIcon fontSize="large" /> */}
                  <img
                    src="https://i.ibb.co/Mc65yJh/icons8-heart-100.png"
                    width="50px"
                  />
                  <span style={{ paddingLeft: "10px", fontSize: "2.125rem" }}>
                    {commaNumber(user.heart)}
                  </span>
                </div>
                <span style={{ paddingLeft: "60px", fontSize: "14px" }}>
                  Całkowita ilość polubień
                </span>
              </div>

              <div style={{ paddingBottom: "15px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* <ShareIcon fontSize="large" /> */}
                  <img
                    src="https://i.ibb.co/NjhBNm8/icons8-forward-arrow-100-1.png"
                    width="50px"
                  />
                  <span style={{ paddingLeft: "10px", fontSize: "2.125rem" }}>
                    {commaNumber(user.totalShares[0].Total)}
                  </span>
                </div>
                <span style={{ paddingLeft: "60px", fontSize: "14px" }}>
                  Całkowita ilość udostępień
                </span>
              </div>

              <div style={{ paddingBottom: "15px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* <MessageIcon fontSize="large" /> */}
                  <img
                    src="https://i.ibb.co/3z2Y1vf/icons8-communication-100.png"
                    width="50px"
                  />
                  <span style={{ paddingLeft: "10px", fontSize: "2.125rem" }}>
                    {commaNumber(user.totalComments[0].Total)}
                  </span>
                </div>
                <span style={{ paddingLeft: "60px", fontSize: "14px" }}>
                  Całkowita ilość komentarzy
                </span>
              </div>
            </Grid>
            <Grid item xs={12} lg={4}>
              <div style={{ paddingBottom: "15px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* <FavoriteIcon fontSize="large" /> */}
                  <img
                    src="https://i.ibb.co/xzHNYyS/icons8-heart-plus-100.png"
                    width="50px"
                  />
                  <span style={{ paddingLeft: "10px", fontSize: "2.125rem" }}>
                    {(
                      ((user.totalComments[0].Total +
                        user.totalShares[0].Total +
                        parseInt(user.heart)) /
                        parseInt(user.totalViews[0].Total)) *
                      100
                    ).toFixed(2)}
                    %
                  </span>
                </div>
                <span style={{ paddingLeft: "60px", fontSize: "14px" }}>
                  Poziom zaangazowania
                </span>
              </div>

              <div style={{ paddingBottom: "15px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* <FavoriteIcon fontSize="large" /> */}
                  <img
                    src="https://i.ibb.co/4SkYSJN/icons8-handshake-heart-100.png"
                    width="50px"
                  />
                  <span style={{ paddingLeft: "10px", fontSize: "2.125rem" }}>
                    {(user.heart / parseInt(user.totalViews[0].Total)).toFixed(
                      2
                    )}
                    %
                  </span>
                </div>
                <span style={{ paddingLeft: "60px", fontSize: "14px" }}>
                  Współczynnik polubień
                </span>
              </div>

              <div style={{ paddingBottom: "15px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* <FavoriteIcon fontSize="large" /> */}
                  <img
                    src="https://i.ibb.co/hRzkv1B/icons8-forward-arrow-100.png"
                    width="50px"
                  />
                  <span style={{ paddingLeft: "10px", fontSize: "2.125rem" }}>
                    {(
                      (user.totalShares[0].Total /
                        parseInt(user.totalViews[0].Total)) *
                      100
                    ).toFixed(2)}
                    %
                  </span>
                </div>
                <span style={{ paddingLeft: "60px", fontSize: "14px" }}>
                  Współczynnik udostępień
                </span>
              </div>

              <div style={{ paddingBottom: "15px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* <CommentIcon fontSize="large" /> */}
                  <img
                    src="https://i.ibb.co/rGRsvnF/icons8-add-to-chat-100.png"
                    width="50px"
                  />
                  <span style={{ paddingLeft: "10px", fontSize: "2.125rem" }}>
                    {(
                      (user.totalComments[0].Total /
                        parseInt(user.totalViews[0].Total)) *
                      100
                    ).toFixed(2)}
                    %
                  </span>
                </div>
                <span style={{ paddingLeft: "60px", fontSize: "14px" }}>
                  Współczynnik komentarzy
                </span>
              </div>
            </Grid>
            <Grid item xs={12} lg={4}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "44px 35px",
                  backgroundColor: "#FE2C55",
                  height: "60px",
                  borderRadius: "50px",
                }}
              >
                {/* <FavoriteIcon fontSize="large" /> */}
                <img
                  src="https://i.ibb.co/xzHNYyS/icons8-heart-plus-100.png"
                  width="50px"
                />
                <span style={{ paddingLeft: "10px", fontSize: "2.125rem" }}>
                  {commaNumber(
                    (user.totalViews[0].Total / user.video).toFixed()
                  )}
                </span>{" "}
                <span
                  style={{
                    paddingLeft: "20px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  Średnia liczba wyswietlen na post
                </span>
              </div>
              <br></br>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "44px 35px",
                  backgroundColor: "#FE2C55",
                  height: "60px",
                  borderRadius: "50px",
                }}
              >
                {/* <FavoriteBorderIcon fontSize="large" /> */}
                <img
                  src="https://i.ibb.co/Mc65yJh/icons8-heart-100.png"
                  width="50px"
                />
                <span style={{ paddingLeft: "10px", fontSize: "2.125rem" }}>
                  {commaNumber((user.heart / user.video).toFixed())}
                </span>{" "}
                <span
                  style={{
                    paddingLeft: "20px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  Średnia liczba polubień na post
                </span>
              </div>
              <br></br>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "44px 35px",
                  backgroundColor: "#FE2C55",
                  height: "60px",
                  borderRadius: "50px",
                }}
              >
                {/* <CommentIcon fontSize="large" /> */}
                <img
                  src="https://i.ibb.co/rGRsvnF/icons8-add-to-chat-100.png"
                  width="50px"
                />
                <span style={{ paddingLeft: "10px", fontSize: "2.125rem" }}>
                  {commaNumber(
                    (user.totalComments[0].Total / user.video).toFixed()
                  )}
                </span>{" "}
                <span
                  style={{
                    paddingLeft: "20px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  Średnia liczba komentarzy na post
                </span>
              </div>
            </Grid>
          </Grid>
          <Grid style={{ marginTop: "50px", marginBottom: "30px" }}>
            <Typography
              variant="h4"
              style={{
                textAlign: "center",
                fontFamily: "Rubik",
                fontSize: "64px",
                fontWeight: "bold",
              }}
            >
              Profil na instagramie
            </Typography>
          </Grid>
          <Grid
            container
            alignItems="center"
            spacing={3}
            style={{ marginBottom: "30px" }}
          >
            <Grid item lg={4} xs={12}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <InstagramIcon />
                <Typography variant="h4" style={{ fontWeight: "bold" }}>
                  {user.uniqueId}
                </Typography>
              </div>
            </Grid>
            <Grid item lg={4} xs={12} alignItems="center" justify="center">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "35px",
                  paddingBottom: "15px",
                }}
              >
                <PeopleAltIcon fontSize="large" />
                <Typography
                  variant="h5"
                  style={{ fontWeight: "bold", paddingLeft: "10px" }}
                >
                  {abbreviateNumber(user.igFollowers)} Obserwujących
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "35px",
                }}
              >
                <PeopleOutlineIcon fontSize="large" />
                <Typography
                  variant="h5"
                  style={{ fontWeight: "bold", paddingLeft: "10px" }}
                >
                  {abbreviateNumber(user.igFollowing)} Obserwuje
                </Typography>
              </div>
            </Grid>
            <Grid item lg={4} xs={12} alignItems="center" justify="center">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "35px",
                  paddingBottom: "15px",
                }}
              >
                <FavoriteBorderIcon fontSize="large" />
                <Typography
                  variant="h5"
                  style={{ fontWeight: "bold", paddingLeft: "10px" }}
                >
                  {abbreviateNumber(user.igTotalLikes)} Polubień
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "35px",
                }}
              >
                <CommentIcon fontSize="large" />{" "}
                <Typography
                  variant="h5"
                  style={{ fontWeight: "bold", paddingLeft: "10px" }}
                >
                  {abbreviateNumber(user.igTotalComments)} Komentarzy
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </Layout>
  )
}

export default UserDetails
