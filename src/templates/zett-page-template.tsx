import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import ZettLayout from '../components/ZettLayout';
import SEO from '../components/SEO';
import ZettTemplateDetails from '../components/ZettTemplateDetails';
import { ZettPagesQuery } from '../graphql';

const ZettPageTemplate = ({ data }: { data: ZettPagesQuery }) => {
  const { title, subtitle } = data.site.siteMetadata;
  const post = data.mdx;
  const { title: postTitle } = post.frontmatter;

  return (
    <ZettLayout wid={data.mdx.frontmatter.wid}>
      <div>
        <Helmet>
          <title>{`${postTitle} - ${title}`}</title>
          <meta name='description' content={subtitle} />
        </Helmet>
        <SEO article={true} title={postTitle} description={subtitle} />
        <ZettTemplateDetails data={data} />
      </div>
    </ZettLayout>
  );
};

export default ZettPageTemplate;

export const pageQuery = graphql`
  query ZettPagesQuery($slug: String!) {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        author {
          name
          twitter
        }
        disqusShortname
        url
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      fields {
        tagSlugs
        slug
      }
      frontmatter {
        title
        tags
        date
        wid
      }
    }
  }
`;
