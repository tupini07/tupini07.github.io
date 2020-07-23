import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout_components/Layout';
import PostTemplateDetails from '../components/layout_components/PostTemplateDetails';
import SEO from '../components/shared_components/SEO';
import { PostBySlugQuery } from '../graphql';
import { Helmet } from 'react-helmet';

const PostTemplate = ({ data }: { data: PostBySlugQuery }) => {
  const { title, subtitle } = data.site.siteMetadata;
  const post = data.mdx;
  const { title: postTitle, description: postDescription } = post.frontmatter;
  const description = postDescription !== null ? postDescription : subtitle;

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${postTitle} - ${title}`}</title>
          <meta name='description' content={description} />
        </Helmet>
        <SEO article={true} title={postTitle} description={description} />
        <PostTemplateDetails data={data} />
      </div>
    </Layout>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
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
