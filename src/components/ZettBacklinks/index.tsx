import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import zettLinkStyle from '../ZettLink/zettlink.module.scss';
import zettBacklinksStyle from './zettbacklink.module.scss';

const ZettBacklinks = ({ wid }: { wid: string }) => {
  const data = useStaticQuery(graphql`
    query ZettBacklinkItems {
      allMdx(filter: { frontmatter: { layout: { eq: "zettelkasten" }, draft: { ne: true } } }) {
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
  const relevantNodes = nodes.filter(e => e.rawBody.includes(wid) && e.frontmatter.wid !== wid);
  return (
    <div>
      <h1 className={zettBacklinksStyle.title}>Backlinks</h1>
      <ul>
        {relevantNodes.map(e => (
          <li key={`item-${e.wid}`}>
            <a href={e.fields.slug} className={zettLinkStyle.internal_link}>
              {e.frontmatter.title} (Occurrences: {e.rawBody.split(wid).length - 1})
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ZettBacklinks;
