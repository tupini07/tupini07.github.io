import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import WikiLayout from '../components/WikiLayout';
import SEO from '../components/SEO';
import WikiTemplateDetails from '../components/WikiTemplateDetails';
import { WikiPagesQuery } from '../graphql';

const WikiPageTemplate = ({ data }: { data: WikiPagesQuery }) => {
  const { title, subtitle } = data.site.siteMetadata;
  const post = data.mdx;
  const { title: postTitle } = post.frontmatter;

  return (
    <WikiLayout wid={data.mdx.frontmatter.wid}>
      <div>
        <Helmet>
          <title>{`${postTitle} - ${title}`}</title>
          <meta name='description' content={subtitle} />
        </Helmet>
        <SEO article={true} title={postTitle} description={subtitle} />
        <WikiTemplateDetails data={data} />
      </div>
    </WikiLayout>
  );
};

export default WikiPageTemplate;

export const pageQuery = graphql`
  query WikiPagesQuery($slug: String!) {
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
