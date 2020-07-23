import React from 'react';
import { Link, graphql } from 'gatsby';
import lodash from 'lodash';
import Layout from '../components/layout_components/Layout';
import { Helmet } from 'react-helmet';
import Sidebar from '../components/shared_components/Sidebar';

const TagsRoute = ({ data, location }) => {
  const { title } = data.site.siteMetadata;
  const tags = data.allMdx.group;

  return (
    <Layout>
      <div>
        <Helmet title={`All Tags - ${title}`} />
        <Sidebar location={location} />
        <div className='content'>
          <div className='content__inner'>
            <div className='page'>
              <h1 className='page__title'>Tags</h1>
              <div className='page__body'>
                <div className='tags'>
                  <ul className='tags__list'>
                    {tags.map(tag => (
                      <li key={tag.fieldValue} className='tags__list-item'>
                        <Link
                          to={`/tags/${lodash.kebabCase(tag.fieldValue)}/`}
                          className='tags__list-item-link'
                        >
                          {tag.fieldValue} ({tag.totalCount})
                        </Link>
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

export default TagsRoute;

export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 2000, filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
