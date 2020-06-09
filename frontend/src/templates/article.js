import React from "react"
import { graphql } from "gatsby"
import Commento from '../components/Commento'
import ReactMarkdown from "react-markdown"
import Moment from "react-moment"
import Layout from "../components/layout"
import Box from '@material-ui/core/Box'

export const query = graphql`
  query ArticleQuery($id: Int!) {
    strapiArticle(strapiId: { eq: $id }) {
      strapiId
      title
      content
      published_at
      image {
        publicURL
      }
    }
  }
`

const Article = ({ data }) => {
  const article = data.strapiArticle
  return (
    <Layout>
      <div>
      <div
          className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
          data-src={article.image.publicURL}
          data-srcset={article.image.publicURL}
          data-uk-img
        >
        </div>
        
        
        <div className="uk-section">
          <div className="uk-container uk-container-small">
          <p style={{fontSize: '40px', color: 'black'}} >{article.title}</p>
            <ReactMarkdown source={article.content} escapeHtml={false}/>
            <p>
              <Moment format="MMM Do YYYY">{article.published_at}</Moment>
            </p>
          </div>
        </div>
      </div>
      <Commento id={article.id} />
    </Layout>
  )
}

export default Article
