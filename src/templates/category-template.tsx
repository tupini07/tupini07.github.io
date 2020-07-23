import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout_components/Layout';
import { Helmet } from 'react-helmet';
import CategoryTemplateDetails from '../components/layout_components/CategoryTemplateDetails';

const CategoryTemplate = ({ data, pageContext }) => {
  const { title } = data.site.siteMetadata;
  const { category } = pageContext;

  return (
    <Layout>
      <div>
        <Helmet title={`${category} - ${title}`} />
        <CategoryTemplateDetails data={data} pageContext={pageContext} />
      </div>
    </Layout>
  );
};

export default CategoryTemplate;

export const pageQuery = graphql`
  query CategoryPage($category: String) {
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
      filter: {
        frontmatter: { category: { eq: $category }, layout: { eq: "post" }, draft: { ne: true } }
      }
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
