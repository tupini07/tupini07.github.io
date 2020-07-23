import { graphql } from 'gatsby';
import React from 'react';
import SEO from '../components/shared_components/SEO';
import { ZettPagesQuery } from '../graphql';
import ZettLayout from '../components/layout_components/ZettLayout';
import { Helmet } from 'react-helmet';
import ZettTemplateDetails from '../components/layout_components/ZettTemplateDetails';

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
  query ZettPages($slug: String!) {
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
