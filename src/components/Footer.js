import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

const Footer = ({ children }) => (
    <StaticQuery
    query={graphql`
      query MenuBottomQuery {
        allMarkdownRemark(filter: {frontmatter: {type:{eq: "bottom"} }}) {
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
          <div>
            {
              data.allMarkdownRemark ?
              data.allMarkdownRemark.edges.map((item, i) => {
                return <Link className="navbar-item" to={item.node.frontmatter.link} key={i}>
                  {item.node.frontmatter.title}
                </Link>
              }) :
              ""
            }
          </div>
      )
    }}
  />
)

export default Footer
