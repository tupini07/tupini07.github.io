import { Link, useStaticQuery, graphql } from 'gatsby';
import moment from 'moment';
import React from 'react';
import './style.scss';

const WikiLink = ({ wid, title }: { wid: string; title?: string }) => {
  const data = useStaticQuery(graphql`
    query WikiLinkQuery {
      allMdx(filter: { frontmatter: { layout: { eq: "wiki" }, draft: { ne: true } } }) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            wid
            title
          }
        }
      }
    }
  `);

  const page = data.allMdx.nodes.find((e) => e.frontmatter.wid === wid);
  const titleT = title || page.frontmatter.title;

  return <a href={page.fields.slug}>{titleT}</a>;
};

export default WikiLink;
