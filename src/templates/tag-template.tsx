import React from 'react';
import { graphql } from 'gatsby';
import { TagPageQuery } from '../graphql';
import Layout from '../components/layout_components/Layout';
import { Helmet } from 'react-helmet';
import TagTemplateDetails from '../components/layout_components/TagTemplateDetails';

const TagTemplate = ({ data, pageContext }: { data: TagPageQuery; pageContext: any }) => {
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
