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
