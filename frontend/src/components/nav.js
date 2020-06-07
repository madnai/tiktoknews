import React, { useState } from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Logo from '../components/logo';

const Nav = ({ data }) => {
  const [active, setActive] = useState(false);
  const [activeItem, setActiveItem] = useState(undefined);

  const toggleHover = (status, item) => {
    console.log(activeItem)
    setActive(status)
    setActiveItem(item)
  }

  const menu = ['news', 'tipy', 'ranking']
  const activeStyle = {
    color: '#fe2c55',
  }
  return (
    <div className="header-container">
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
                  <Link to={`/${item}`} activeStyle={activeStyle} style={{textDecoration: 'none', color: 'black', fontSize: '24px', fontWeight: '700'}}>{item.charAt(0).toUpperCase() + item.slice(1)}</Link>
                </div>
              </li>
            )
          })}
          {/* <li>
            <div className={active ? 'menu-item-link-active' : 'menu-item-link'} 
                onMouseEnter={() => toggleHover(true)}
                onMouseLeave={() => toggleHover(false)}
                >
              <Link to='/news' style={{textDecoration: 'none', color: 'black', fontSize: '24px', fontWeight: '700'}}>News</Link>
            </div>
          </li>
          <li>
            <div className="menu-item-link" style={{marginLeft: '32px'}}>
              <Link to='/tipy' style={{textDecoration: 'none', color: 'black',fontSize: '24px'}}>Tipy</Link>
            </div>
          </li>
          <li>
            <div className="menu-item-link" style={{marginLeft: '32px'}}>
              <Link to='/ranking' style={{textDecoration: 'none', color: 'black', fontSize: '24px'}}>Ranking</Link>
            </div>
          </li> */}
        </ul>
        <div className="menu-right">
          <img src='https://i.ibb.co/6D1xXhn/icons8-tiktok-50.png' width='25px' />
        </div>
      </div>
    </div>
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
