import { graphql, useStaticQuery, Link } from 'gatsby';
import React from 'react';
import listOfTabsStyle from './listOfTabs.module.scss';
import { ListOfTabsItemsQuery } from '../../../graphql';

const ListOfTabs = ({ tabType }: { tabType: string }) => {
  const data: ListOfTabsItemsQuery = useStaticQuery(graphql`
    query ListOfTabsItems {
      allMdx(filter: { frontmatter: { path: { regex: "^/resources/music/" } } }) {
        edges {
          node {
            id
            frontmatter {
              path
              title
            }
          }
        }
      }
    }
  `);

  const dataToUse = data.allMdx.edges
    .filter(
      e => e.node.frontmatter.path.includes(tabType) && !e.node.frontmatter.path.endsWith(tabType)
    )
    .sort((a, b) => a.node.frontmatter.title >= b.node.frontmatter.title ? 1 : -1)
    .map(e => (
      <li>
        <Link to={e.node.frontmatter.path}>{e.node.frontmatter.title}</Link>
      </li>
    ));

  return <ul>{dataToUse}</ul>;
};

export default ListOfTabs;
