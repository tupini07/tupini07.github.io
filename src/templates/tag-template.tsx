import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import TagTemplateDetails from '../components/TagTemplateDetails';

const TagTemplate = ({ data, pageContext }) => {
  const { title } = data.site.siteMetadata;
  const { tag } = pageContext;

  return (
    <Layout>
      <div>
        <Helmet title={`All Posts tagged as "${tag}" - ${title}`} />
        <TagTemplateDetails data={data} pageContext={pageContext} />
      </div>
    </Layout>
  );
};

export default TagTemplate;

export const pageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        menu {
          label
          path
        }
        author {
          name
          email
          telegram
          twitter
          github
          rss
          vk
        }
      }
    }
    allMdx(
      limit: 1000
      filter: { frontmatter: { tags: { in: [$tag] }, layout: { eq: "post" }, draft: { ne: true } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`;
