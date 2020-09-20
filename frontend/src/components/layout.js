import React, { useState } from "react"
import PropTypes from "prop-types"
import { Container, Box } from "@material-ui/core"
import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import HomeIcon from "@material-ui/icons/Home"
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks"
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd"
import Nav from "./nav"
import Seo from "./seo"
import { Link } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import { navigate } from "gatsby"
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect"
import { slide as Menu } from "react-burger-menu"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles({
  root: {
    color: "black",
  },
})

var styles = {
  bmBurgerButton: {
    position: "absolute",
    width: "36px",
    height: "30px",
    left: "initial",
    right: "36px",
    top: "36px",
  },
  bmBurgerBars: {
    background: "#373a47",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    position: "absolute",
    height: "54px",
    width: "54px",
    left: "initial",
    right: "30px",
    top: "26px",
  },
  bmCross: {
    // background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: "#fe2c55",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
    display: "flex",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
  },
  bmItem: {},
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
}
const Layout = ({ children }) => {
  const [value, setValue] = React.useState(0)
  const classes = useStyles()

  const activeStyle = {
    color: "black",
  }

  const handleClick = (e, name) => {
    e.preventDefault()

    navigate("/" + name)
  }
  const menu = ["news", "tipy", "ranking"]

  return (
    <>
      <Box>
        <Container>
          {isMobile && (
            <div style={{ paddingBottom: "70px" }}>
              <Menu
                styles={styles}
                right={true}
                width="100%"
                customCrossIcon={
                  <img src="https://i.ibb.co/Zc7Wfr8/close.png" />
                }
                noTransition
              >
                {menu.map((item, i) => {
                  return (
                    <>
                      <Link
                        to={`/${item}`}
                        activeStyle={activeStyle}
                        style={{
                          textDecoration: "none",
                          color: "white",
                          fontSize: "30px",
                          fontWeight: "bold",
                          fontFamily: "Rubik",
                        }}
                      >
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </Link>
                      <br />
                    </>
                  )
                })}
              </Menu>
            </div>
          )}
          <Seo />
          <Nav />
          <BrowserView>
            <main style={{ marginTop: "100px" }}>{children}</main>
          </BrowserView>
          <MobileView>
            <main style={{ marginTop: "10px" }}>{children}</main>
          </MobileView>
        </Container>
        <footer>
          <section class="section-top">
            <div class="col">
              <img src="https://i.ibb.co/kxzsMRK/9.png" width="150px" />
            </div>
            <div class="col">
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              </div>
              <div>Lorem ipsum dolor sit amet.</div>
              <div>Line 3</div>
            </div>
            <div class="col">
              <div>Line 2</div>
              <div>Line 3</div>
            </div>
            <div class="col">
              <div>Line 2</div>
            </div>
          </section>
          <section class="section-bottom">
            <div style={{fontSize: '12px'}}>
              Tiktoknews nie jest powiązany z TikTok, Bytedance, Facebookiem,
              Instagramem ani Snapchatem. Nie przechowujemy żadnych filmów ani
              obrazów na naszych serwerach. Wszelkie prawa należą do ich
              odpowiednich właścicieli.
            </div>
            <br />
            <div>Copyright © 2020 tiktoknews.pl</div>
          </section>
        </footer>
      </Box>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
