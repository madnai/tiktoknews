import React from "react"
import { graphql } from "gatsby"

import ReactMarkdown from "react-markdown"
import Moment from "react-moment"
import Commento from '../components/Commento'

import Layout from "../components/layout"

export const query = graphql`
  query TipyQuery($id: Int!) {
    strapiTipy(strapiId: { eq: $id }) {
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

const Tipy = ({ data }) => {
  const article = data.strapiTipy

  return (
    <Layout>
      <div>
        <div
          id="banner"
          className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-light uk-padding uk-margin"
          data-src={article.image.publicURL}
          data-srcset={article.image.publicURL}
          data-uk-img
        >
         </div>

        <div className="uk-section" style={{padding: 0}}>
          <div className="uk-container uk-container-small">
          <p style={{fontSize: '30px', color: 'black'}} >{article.title}</p>

            <ReactMarkdown source={article.content} />
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

export default Tipy
