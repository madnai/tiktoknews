import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import ArticlesComponent from "../components/articles"

import "../assets/css/main.css"

const NewsPage = () => (
  <Layout>
    <StaticQuery
      query={graphql`
        query {
          allStrapiArticle {
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
            <h3>News </h3>
            <ArticlesComponent page={'news'} articles={data.allStrapiArticle.edges} />
          </div>
        </div>
      )}
    />
  </Layout>
)

export default NewsPage
