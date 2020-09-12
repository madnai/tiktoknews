import React from 'react';
import Img from 'gatsby-image';
import {StaticQuery, graphql} from 'gatsby';

const EyeIcon = () => (
    <StaticQuery
        query={graphql`
        query {
            placeholderImage: file(relativePath: { eq: "icons8-eye-100.png" }) {
                childImageSharp {
                    fluid(maxWidth: 200) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
        `}
        render={data => <Img fluid={data.placeholderImage.childImageSharp.fluid} />} 
    />
)

export default EyeIcon;