import React from 'react'
import PropTypes from 'prop-types'
import {graphql } from 'gatsby'
import Layout from '../components/Layout'

export default class IndexPage extends React.Component {

  renderImageIfExists = (Thumbnail) => {
    return Thumbnail 
      ? <img src={Thumbnail.publicURL} alt="hello"/> 
      : ""
  }

  render() {
    const { data } = this.props
    const infos = data.markdownRemark
    const mainPresenter = data.allMarkdownRemark.edges[0].node;

    return (
      <Layout>
        <main>
          <div className="homeStrate strateProfil" id="profil">
            <p className="strateProfilBg"><img src={infos.frontmatter.heroBackgroundImage.publicURL} title="<!-- TITLE -->" alt="<!-- ALT -->"/></p>
            
            <div className="strateProfilDetails">
              <h3>&laquo; {infos.frontmatter.textCaptionHero} &raquo;</h3>
              <p className="profil">
                <span className="name">{infos.frontmatter.textNameHero}</span>
                <span className="fonction">{infos.frontmatter.textRoleHero}</span>
              </p>
            </div>
            <div className="strateProfilContent">
              <p className="badge"><img src={infos.frontmatter.heroBadgeIcon.publicURL} alt="<!-- ALT -->" title="<!-- TITLE -->"/></p>
              <h1>{infos.frontmatter.heroText}</h1>
              <a href="<!-- LINK -->" className="homeStrateLink homeStrateLink--left">Discutons ensemble</a>
            </div>
          </div>

          <div className="homeStrate strateConference" id="conference">
            <div className="container">
              <h2>La prochaine conf</h2>
              <a href="<!-- LINK -->" className="homeStrateLink homeStrateLink--right">Les précédentes</a>
              <div className="grid">
                <div className="gridItem gridItem--33 strateConferenceLeader">
                  <p className="strateConferenceLeaderThumb"><img src={mainPresenter.frontmatter.presenter.picture.publicURL} alt="Photo présentateur"/></p>
                  <h3><span className="strateConferenceLeaderLabel">Leadé par</span><span className="strateConferenceLeaderName">{mainPresenter.frontmatter.presenter.name}</span><span className="strateConferenceLeaderFunction">{mainPresenter.frontmatter.presenter.position}</span></h3>
                </div>
                <div className="gridItem gridItem--66 strateConferenceDetails">
                  <div className="strateConferenceDetailsContent">
                    <p className="strateConferenceDetailsContentDate">{mainPresenter.frontmatter.date}</p>
                    <h3>{mainPresenter.frontmatter.title}</h3>
                    <p>{mainPresenter.frontmatter.description}</p>
                    <a href="<!-- LINK -->" className="homeStrateLink homeStrateLink--left">ça déchire, je participe !</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="homeStrate stratePresentation" id="presentation">
            <div className="container">
              <h2>On va faire quoi ?</h2>
              <div className="grid">
                {
                  infos.frontmatter.doingInEvent.map((item, i) => {
                    return <div className="gridItem gridItem--25" key={i}>
                      <p className="stratePresentationIcon"><img src={item.icon.publicURL} alt={item.name}/></p>
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                    </div>
                  })
                }
              </div>
              <a href="<!-- LINK -->" className="homeStrateLink homeStrateLink--vertical">Et plus précisment ?</a>
            </div>
          </div>
          <div className="homeStrate strateHote" id="hote">
            <div className="container">
              <div className="grid">
                <div className="gridItem gridItem--50">
                  <p className="strateHoteTitle">{infos.frontmatter.eventDescription.description}</p>
                </div>
                <div className="gridItem gridItem--50">
                  <p>{infos.frontmatter.eventDescription.word}</p>
                  <p>Kristen, votre hôte</p>
                </div>
              </div>
            </div>
            <p className="strateHoteThumbnail"><img src={infos.frontmatter.eventDescription.icon.publicURL} alt="<!-- ALT -->" title="<!-- TITLE -->"/></p>
          </div>
          <div className="homeStrate strateContact" id="contact">
            <div className="container">
              <div className="grid">
                <div className="gridItem gridItem--50">
                  <h2>Vous voulez prendre la parole ?</h2>
                </div>
                <div className="gridItem gridItem--50">
                  <div className="formWrapper">
                    <form>
                      <input type="text" name="lastname" placeholder="Nom" className="input--half" />
                      <input type="text" name="firstname" placeholder="Prénom" className="input--half"/>
                      <input type="email" name="email" placeholder="Adresse mail"/>
                      <textarea name="message" placeholder="Sujet, thématique, de quoi allez vous parler ?"></textarea>
                      <button type="submit" className="homeStrateLink homeStrateLink--left">Je me présente</button>
                    </form>
                  </div>
                </div>
              </div>
      
              <div className="newsletter">
                <h3>Plus ? Vous en voulez plus ? Inscrivez-vous à la newsletter !</h3>
                <p>En renseignant votre adresse email, vous acceptez de recevoir les derniers évènements publiés et vous prenez connaissance de notre <a href="<!-- LINK -->" target="_blank">Politique de Confidientialité</a>.</p>
                <p>Vous pouvez vous désinscrire à tout moment à l'aide des <a href="<!-- LINK -->" target="_blank">liens de désinscriptions.</a></p>
                <form>
                  <input type="email" name="email" placeholder="Entrez votre adresse mail"/>
                  <button type="submit" className="homeStrateLink homeStrateLink--left">Allez Go !</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    markdownRemark(frontmatter: {templateKey: {eq: "index-page"}}) {
      id
      rawMarkdownBody
      frontmatter {
        title
        heroBadgeIcon {
          publicURL
        }
        heroBackgroundImage {
          publicURL
        }
        heroText
        textCaptionHero
        textNameHero
        textRoleHero
        doingInEvent {
          icon {
            publicURL
          }
          description
          name
        }
        eventDescription {
          description
          word
          icon {
            publicURL
          }
        }
        partners {
          link
          logo {
            publicURL
          }
        }
      }
    }
    allMarkdownRemark(limit: 1, filter: {frontmatter: {templateKey: {eq: "blog-post"}}}, sort: {fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          id
          frontmatter {
            date(formatString:"DD/MM", locale: "fr")
            title
            description
            tags
            presenter {
              name,
              position,
              picture {
                publicURL
              },
            }
          }
        }
      }
    }
  }
`
