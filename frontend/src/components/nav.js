import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Logo from '../components/logo';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Navbar from 'react-bootstrap/Navbar';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserView,
  MobileView
} from "react-device-detect";
import { slide as Menu } from 'react-burger-menu'

var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%'
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 200,
    borderRadius: 50
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
const Nav = ({ data }) => {
  const classes = useStyles();

  const [active, setActive] = useState(false);
  const [activeItem, setActiveItem] = useState(undefined);
  const [searchText, setSearchText] = useState('');

  const toggleHover = (status, item) => {
    console.log(activeItem)
    setActive(status)
    setActiveItem(item)
  }

  const menu = ['news', 'tipy', 'ranking']
  const activeStyle = {
    color: '#fe2c55',
  }

  const onInput = (event) => {
    setSearchText(event.target.value)
  }

  const onSearch = () => {
    console.log('..........', )
    if(searchText !== '') {
      navigate('search/' + searchText)
    }
    
  }

  const showSettings = (event) => {
    event.preventDefault();

  }

  return (
    <>
    <BrowserView>
      <div className="header-container" style={{marginBottom: '50px'}}>
        <div className="header-content">
          <div className="logo-wrapper">
            <span className="logo-container">
              <img src="https://i.ibb.co/kxzsMRK/9.png" width="100px"/>
            </span>
          </div>
          <ul className="menu-wrapper">
            {menu.map((item, i) => {
              return (
                <li key={i}>
                  <div style={{padding: '10px'}} className={(active && i == activeItem) ? 'menu-item-link-active' : 'menu-item-link'} 
                      onMouseEnter={() => toggleHover(true, i)}
                      onMouseLeave={() => toggleHover(false, i)}
                      >
                    <Link to={`/${item}`} activeStyle={activeStyle} style={{textDecoration: 'none', color: 'white', fontSize: '30px', fontWeight: 'bold', fontFamily: 'Rubik'}}>{item.charAt(0).toUpperCase() + item.slice(1)}</Link>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="menu-right">
          <Paper className={classes.root} style={{marginRight: '30px'}}>
            <InputBase
              className={classes.input}
              placeholder="Szukaj użytkownika"
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={(event) => onInput(event)}
              value={searchText}
            />
            <IconButton className={classes.iconButton} aria-label="search" onClick={() => onSearch()}>
              <SearchIcon />
            </IconButton>
            </Paper>
            <img src='https://i.ibb.co/PcG8FJd/tiktok-removebg-preview.png' width='70px' />
          </div>
        </div>
      </div>
      </BrowserView>
      {/* <MobileView>
        <Menu styles={ styles }>
        <a id="home" className="menu-item" href="/">Home</a>
          <a id="about" className="menu-item" href="/about">About</a>
          <a onClick={ showSettings } className="menu-item--small" href="">Settings</a>

        </Menu> */}
      {/* <Navbar collapseOnSelect expand="sm" style={{marginTop: '30px', fontFamily: 'Lato'}}>
        <div className="navbar-header">
          <Navbar.Brand style={{padding: '0px'}} className="abs" href="#home"><Link to="/"><img src={logo} alt="UNOWmobile" width='100px;' /></Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
        </div>
          <Navbar.Collapse id="basic-navbar-nav">
            <div className='navbar-nav ml-auto' style={{marginRight: '15%'}}>
            <ul className="menu-wrapper">
            {menu.map((item, i) => {
              return (
                <li key={i}>
                  <div style={{padding: '10px'}} className={(active && i == activeItem) ? 'menu-item-link-active' : 'menu-item-link'} 
                      onMouseEnter={() => toggleHover(true, i)}
                      onMouseLeave={() => toggleHover(false, i)}
                      >
                    <Link to={`/${item}`} activeStyle={activeStyle} style={{textDecoration: 'none', color: 'black', fontSize: '30px', fontWeight: 'bold', fontFamily: 'Rubik'}}>{item.charAt(0).toUpperCase() + item.slice(1)}</Link>
                  </div>
                </li>
              )
            })}
          </ul>
            </div>
          </Navbar.Collapse>
        </Navbar> */}
      {/* </MobileView> */}
      </>
  )
} 

export const query = graphql`
  query {
    file(relativePath: { eq: "logo.PNG" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default Nav
