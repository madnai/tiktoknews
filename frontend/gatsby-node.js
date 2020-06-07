const accents = require('remove-accents');


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
