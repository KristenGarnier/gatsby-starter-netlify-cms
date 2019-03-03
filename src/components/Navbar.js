import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import logo from '../img/logo-header.b9f0d7cf.svg'

const Navbar = class extends React.Component {

  componentDidMount() {
    // Get all "navbar-burger" elements
   const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
   if ($navbarBurgers.length > 0) {
 
     // Add a click event on each of them
     $navbarBurgers.forEach( el => {
       el.addEventListener('click', () => {
 
         // Get the target from the "data-target" attribute
         const target = el.dataset.target;
         const $target = document.getElementById(target);
 
         // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
         el.classList.toggle('is-active');
         $target.classList.toggle('is-active');
 
       });
     });
   }
 }
 
 render() {
   return (
    <StaticQuery
    query={graphql`
      query MenuQuery {
        allMarkdownRemark(filter: {frontmatter: {type:{eq: "top"} }}) {
          edges {
            node {
              id,
              frontmatter {
                title,
                description,
                type,
                link
              }
            }
          }
        }
      }
    `}
    render = {data => {
      return (
        <header>
          <div className="headerWrapper">
            <p className="logo"><a href=""><img src={logo} alt="Lepuy.dev"/></a></p>
            <nav className="nav">
              <ul>
                {
                  data.allMarkdownRemark.edges.map((item, i) => {
                    return <li key={i}>
                      <Link to={item.node.frontmatter.link}>
                        {item.node.frontmatter.title}
                      </Link>
                    </li>
                  })
                }
              </ul>
            </nav>
          </div>
        </header>
      )
    }}
  />
  
  )}
}

export default Navbar
