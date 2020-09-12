const accents = require('remove-accents');
const fetch = require('node-fetch');
fs = require('fs');


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        articles: allStrapiArticle {
          edges {
            node {
              strapiId
              title
            }
          }
        }
        tipy: allStrapiTipy {
          edges {
            node {
              strapiId
              title
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const response = await fetch('http://localhost:3000/users');
  const users = await response.json();
  console.log('.................', users)
  users.forEach((user, i) => {
    if (user.uniqueId !== undefined) {
      createPage({
        path: `/ranking/${accents(user.uniqueId)}`,
        component: require.resolve("./src/templates/userDetails.js"),
        context: {
          id: user.uniqueId,
        }
      })
    }
   
  })
  // Create blog articles pages.
  const articles = result.data.articles.edges
  const tipy = result.data.tipy.edges

  articles.forEach((article, index) => {

    createPage({
      path: `/news/${accents(article.node.title).replace(/\s+/g, '-').replace(/\?/g,'')}`,
      component: require.resolve("./src/templates/article.js"),
      context: {
        id: article.node.strapiId,
        title: article.node.title
      },
    })
  })

  tipy.forEach((article, index) => {

    createPage({
      path: `/tipy/${accents(article.node.title).replace(/\s+/g, '-').replace(/\?/g,'')}`,
      component: require.resolve("./src/templates/tipy.js"),
      context: {
        id: article.node.strapiId,
        title: article.node.title
      },
    })
  })
}
