import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import ArticlesComponent from "../components/articles"

import "../assets/css/main.css"

const TipyPage = () => (
  <Layout>
    <StaticQuery
      query={graphql`
        query {
          allStrapiTipy {
            edges {
              node {
                strapiId
                title
                image {
                  publicURL
                }
                published_at
                short_description
              }
            }
          }
        }
      `}
      render={data => (
        <div className="uk-section">
          <div className="uk-container uk-container-large">
            <h3>Tipy</h3>
            <ArticlesComponent page={'tipy'} articles={data.allStrapiTipy.edges} />
          </div>
        </div>
      )}
    />
  </Layout>
)

export default TipyPage
