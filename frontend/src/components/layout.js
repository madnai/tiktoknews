import React, { useState } from "react"
import PropTypes from "prop-types"
import { Container, Box } from '@material-ui/core';
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from '@material-ui/icons/Home';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Nav from "./nav"
import Seo from "./seo"
import { Link } from "gatsby"
import { makeStyles } from '@material-ui/core/styles';
import { navigate } from 'gatsby';

const useStyles = makeStyles({
  root: {
    color: 'black'
  },
});

const Layout = ({ children }) => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  const handleClick = (e, name) => {
    e.preventDefault();

    navigate('/' + name)
  }

  return (
    <Box>
      <Container>
        <Seo />
        <Nav />
        <main style={{marginTop: '40px'}}>{children}</main>
      </Container>
      <footer>
      <div class="container-footer">
        <div class="d-flex justify-content-between mb-50">
          <div>
            <p class="mb-15"><a href="/">About Us</a></p>
        <p class="mb-15"><a href="/">Search</a></p>
        <p><a href="/">Contact Information</a></p>
      </div>
      <div>
        <p class="mb-15"><a href="/">Site Map</a></p>
        <p class="mb-15"><a href="/">Private Policy</a></p>
        <p><a href="/">Terms of Use</a></p>
      </div>
    </div>
    <div class="d-flex align-items-center justify-content-center">
      <p class="ml-5" style={{color:'white'}}>Copyright 2020. All rights reserved.</p>
    </div>
</div>
</footer>
      {/* <BottomNavigation style={{position: 'fixed', bottom: 0, width: '100%'}} showLabels value={value} className={classes.root}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}>
          <BottomNavigationAction label="News"  onClick={(e) => handleClick(e, 'news')} icon={<LibraryBooksIcon style={{ color: 'black' }}/>} />
          <BottomNavigationAction label="Tipy"  onClick={(e) => handleClick(e, 'tipy')} icon={<LibraryBooksIcon style={{ color: 'black' }}/>} />
          <BottomNavigationAction label="Ranking" onClick={(e) => handleClick(e, 'ranking')} icon={<AssignmentIndIcon style={{ color: 'black' }}/>} />
        </BottomNavigation> */}
    </Box>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
