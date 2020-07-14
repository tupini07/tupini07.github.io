import kebabCase from 'lodash/kebabCase';
import React from 'react';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import WikiLink from '../components/WikiLink';

const WikiRoute = ({ data, location }) => {
  const { title } = data.site.siteMetadata;
  const wikiPages: Array<any> = data.allMdx.nodes;
  return (
    <Layout>
      <div>
        <Helmet title={`Wiki - ${title}`} />
        <Sidebar location={location} />
        <div className="content">
          <div className="content__inner">
            <div className="page">
              <h1 className="page__title">Wiki - Index</h1>
              <div className="page__body">
                <h3>Recent pages</h3>
                <div className="categories">
                  <ul className="categories__list">
                    {wikiPages.map(wikiP => (
                      <li key={wikiP.frontmatter.wid} className="categories__list-item">
                        <WikiLink url={wikiP.frontmatter.wid} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WikiRoute;

export const pageQuery = graphql`
query Wiki {
  site {
    siteMetadata {
      title
    }
  }
  allMdx(limit: 10, filter: {frontmatter: {layout: {eq: "wiki"}, draft: {ne: true}}}, sort: {fields: frontmatter___date, order: DESC}) {
    nodes {
      fields {
        slug
      }
      frontmatter {
        wid
        title
        date
      }
    }
  }
}
`;
