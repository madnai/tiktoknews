require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "Gatsby + Strapi Blog",
    description: "Gatsby blog with Strapi",
    author: "Strapi team",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sass`,
    "gatsby-plugin-material-ui",
    {
      resolve: "gatsby-plugin-antd",
      options: {
        style: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`rubik\:300,400,500,600,700`, `roboto`],
        display: "swap",
      },
    },
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.API_URL || "https://ttnewspl.herokuapp.com",
        contentTypes: [
          // List of the Content Types you want to be able to request from Gatsby.
          "article",
          "menu",
          "tipy",
        ],
        queryLimit: 1000,
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: "ttnewspl-gatsby",
      },
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyByEPD3eYaU1D0kKk4E6FOGeHYetzEKPsE",
          authDomain: "tiktoknews-68149.firebaseapp.com",
          databaseURL: "https://tiktoknews-68149.firebaseio.com",
          projectId: "tiktoknews-68149",
          storageBucket: "storageBucket",
          messagingSenderId: "965967556687",
          appId: "1:965967556687:web:64241d6ebf208b18acfa3a",
        },
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/search/*`] },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "gatsby-starter-default",
        short_name: "starter",
        start_url: "/news",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
      },
    },
    "gatsby-plugin-offline",
  ],
}
