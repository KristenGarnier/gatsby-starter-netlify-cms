import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

const Footer = ({ children }) => (
    <StaticQuery
    query={graphql`
      query MenuBottomQuery {
        markdownRemark(frontmatter: {templateKey: {eq: "index-page"}}) {
          frontmatter {
            partners {
              link
              logo {
                publicURL
              }
            },
            footerImage {
              publicURL
            }
          }
        }
      }
    `}
    render = {data => {

      const partners = data.markdownRemark.frontmatter.partners.map((item, i) => <li key={i} className="footerPartnersListItem">
        <a href="<!-- LINK -->">
          <img src={item.logo.publicURL} alt="<!-- ALT -->" title="<!-- TITLE -->"/>
        </a>
      </li>);

      return (
        <footer className="footer">
          <div className="container">
            <div className="footerPartners grid">
              <div className="gridItem gridItem--33">
                <p className="footerLogo"><a href="<!-- LINK -->"><img src={data.markdownRemark.frontmatter.footerImage.publicURL} alt="<!-- ALT -->"/></a></p>
              </div>
              <div className="gridItem gridItem--66">
                <h2>En partenariat avec</h2>
                <ul className="footerPartnersList grid">
                  {partners}
                </ul>
              </div>
            </div>
            <div className="footerLinks">
              <ul className="footerLinksList">
                <li className="footerLinksListItem"><a href="<!-- LINK -->">Mentions légales</a></li>
                <li className="footerLinksListItem"><a href="<!-- LINK -->">Plan du site</a></li>
              </ul>
            </div>
            <div className="footerCopyright">
              <p>Designed with <i className="fas fa-heart"></i> by <a href="https://dribbble.com/SimonMazzega" target="_blank">Mazzega Simon</a> and coded with a lot of <i className="fas fa-mug-hot"></i> by <a href="https://www.nerdy-bear.com" target="_blank">Nerdy Bear</a></p>
            </div>
          </div>
        </footer>
      )
    }}
  />
)

export default Footer
