import React from 'react';
import Img from 'gatsby-image';
import {StaticQuery, graphql} from 'gatsby';

const Logo = () => (
    <StaticQuery
        query={graphql`
        query {
            placeholderImage: file(relativePath: { eq: "logo.PNG" }) {
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

export default Logo;