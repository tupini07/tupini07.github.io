import kebabCase from 'lodash/kebabCase';
import React from 'react';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import { CategoriesQuery } from '../graphql';

const CategoriesRoute = ({ data, location }: { data: CategoriesQuery }) => {
  const { title } = data.site.siteMetadata;
  const categories: Array<any> = data.allMdx.group;

  // // for the moment this is dead code
  // const hierarchy = categories.reduce((a, b) => {
  //   let splitted = b.fieldValue.split('/');

  //   if (splitted.length > 0) {
  //     let currentNode = a;
  //     for (let v of splitted) {
  //       if (!(v in currentNode)) {
  //         currentNode[v] = { _val: 0 };
  //       }
  //       currentNode[v]._val += b.totalCount;

  //       currentNode = currentNode[v];
  //     }
  //   }
  //   return a;
  // }, {});

  return (
    <Layout>
      <div>
        <Helmet title={`All Categories - ${title}`} />
        <Sidebar location={location} />
        <div className="content">
          <div className="content__inner">
            <div className="page">
              <h1 className="page__title">Categories</h1>
              <div className="page__body">
                <div className="categories">
                  <ul className="categories__list">
                    {categories.map(category => (
                      <li key={category.fieldValue} className="categories__list-item">
                        <Link
                          to={`/categories/${kebabCase(category.fieldValue)}/`}
                          className="categories__list-item-link"
                        >
                          {category.fieldValue} ({category.totalCount})
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

export default CategoriesRoute;

export const pageQuery = graphql`
  query Categories {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 2000, filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;
