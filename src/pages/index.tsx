import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout_components/Layout';
import { Helmet } from 'react-helmet';
import Sidebar from '../components/shared_components/Sidebar';
import Post from '../components/layout_components/Post';

const IndexRoute = ({ data, location }) => {
  const items = [];
  const { title, subtitle } = data.site.siteMetadata;
  const posts = data.allMdx.edges;
  posts.forEach(post => {
    items.push(<Post data={post} key={post.node.fields.slug} />);
  });

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name='description' content={subtitle} />
        </Helmet>
        <Sidebar location={location} />
        <div className='content'>
          <div className='content__inner'>{items}</div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexRoute;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    allMdx(
      limit: 1000
      filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
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
