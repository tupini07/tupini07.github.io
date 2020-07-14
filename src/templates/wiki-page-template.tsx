import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import WikiLayout from '../components/WikiLayout';
import SEO from '../components/SEO';
import WikiTemplateDetails from '../components/WikiTemplateDetails';
import { PostBySlugQuery } from '../graphql';

const WikiPageTemplate = ({ data }: { data: PostBySlugQuery }) => {
  const { title, subtitle } = data.site.siteMetadata;
  const post = data.mdx;
  const { title: postTitle, description: postDescription } = post.frontmatter;
  const description = postDescription !== null ? postDescription : subtitle;

  return (
    <WikiLayout>
      <div>
        <Helmet>
          <title>{`${postTitle} - ${title}`}</title>
          <meta name='description' content={description} />
        </Helmet>
        <SEO article={true} title={postTitle} description={description} />
        <WikiTemplateDetails data={data} />
      </div>
    </WikiLayout>
  );
};

export default WikiPageTemplate;

export const pageQuery = graphql`
  query WikiPages($slug: String!) {
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
        description
      }
    }
  }
`;
