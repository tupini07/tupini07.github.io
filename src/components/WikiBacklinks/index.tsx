import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import wikiLinkStyle from '../WikiLink/wikilink.module.scss'

const WikiBacklinks = ({ wid }: { wid: string }) => {
  const data = useStaticQuery(graphql`
    query WikiBacklinkQuery {
      allMdx(filter: { frontmatter: { layout: { eq: "wiki" }, draft: { ne: true } } }) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
            wid
          }
          rawBody
        }
      }
    }
  `);

  const nodes: Array<any> = data.allMdx.nodes;
  const relevantNodes = nodes.filter((e) => e.rawBody.includes(wid) && e.frontmatter.wid !== wid);
  return (
    <div>
      <h1>Backlinks</h1>
      <ul>
        {relevantNodes.map((e) => (
          <li>
            <a href={e.fields.slug} className={wikiLinkStyle.internal_link}>{e.frontmatter.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WikiBacklinks;
