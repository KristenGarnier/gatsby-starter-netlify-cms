import React from 'react'
import PropTypes from 'prop-types'
import {graphql, navigate} from 'gatsby'
import Layout from '../components/Layout'

function encode(data) {
  const formData = new FormData();

  for (const key of Object.keys(data)) {
    formData.append(key, data[key]);
  }

  return formData;
}

export default class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error));
  };

  handleSubmitNewsletter = e => {
    e.preventDefault();
    fetch("https://api.sendgrid.com/v3/contactdb/recipients", {
      method: "POST",
      headers: {
        'Authorization': `Bearer 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`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([
        {
          "email": this.state.markettingEmail,
        }
      ])
    })
      .then((res) => res.json())
      .then((res) => console.log('IT WORKS', res))
      .catch(error => alert(error));
  };

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
                    <form
                      name="file-upload"
                      method="post"
                      action="/contact/thanks/"
                      data-netlify="true"
                      data-netlify-honeypot="bot-field"
                      onSubmit={this.handleSubmit}
                    >
                      <input type="text" name="lastname" placeholder="Nom" className="input--half" onChange={this.handleChange} required={true} />
                      <input type="text" name="firstname" placeholder="Prénom" className="input--half" onChange={this.handleChange} required={true}/>
                      <input type="email" name="email" placeholder="Adresse mail" onChange={this.handleChange} required={true}/>
                      <textarea name="message" placeholder="Sujet, thématique, de quoi allez vous parler ?" onChange={this.handleChange} required={true}></textarea>
                      <button type="submit" className="homeStrateLink homeStrateLink--left">Je me présente</button>
                      <div hidden>
                        <input type="hidden" name="form-name" value="file-upload"/>
                        <label>
                          Don’t fill this out:{" "}
                          <input name="bot-field" onChange={this.handleChange} />
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
      
              <div className="newsletter">
                <h3>Plus ? Vous en voulez plus ? Inscrivez-vous à la newsletter !</h3>
                <p>En renseignant votre adresse email, vous acceptez de recevoir les derniers évènements publiés et vous prenez connaissance de notre <a href="<!-- LINK -->" target="_blank">Politique de Confidientialité</a>.</p>
                <p>Vous pouvez vous désinscrire à tout moment à l'aide des <a href="<!-- LINK -->" target="_blank">liens de désinscriptions.</a></p>
                <form onSubmit={this.handleSubmitNewsletter}>
                  <input type="email" name="markettingEmail" placeholder="Entrez votre adresse mail"  onChange={this.handleChange} required={true}/>
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
