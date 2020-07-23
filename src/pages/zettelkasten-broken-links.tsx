import { graphql, Link } from 'gatsby';
import React from 'react';
// import { ZettBrokenLinksQuery } from '../graphql';

const ZettBrokenLinkRoute = (
  { data, location } /*: {
  data: ZettBrokenLinksQuery;
  location: string;
}*/
) => {
  const { title } = data.site.siteMetadata;
  const zettPages = data.allMdx.nodes;

  const findLinksInAST = (root): any => {
    if (root.type === 'link' && root.url.startsWith('WID:'))
      return {
        wid: root.url,
        title: root.children.find(e => e.type === 'text')?.value || 'NO-TITLE'
      };
    else if (root.children) {
      let links = [];
      for (const c of root.children) {
        links = links.concat(findLinksInAST(c));
      }
      return links;
    } else {
      return [];
    }
  };

  const pageBrokenLinks = zettPages
    .map(e => {
      return {
        pageWID: e.frontmatter.wid,
        pageTitle: e.frontmatter.title,
        pageSlug: e.fields.slug,
        brokenLinks: findLinksInAST(e.mdxAST).filter(x => {
          return !zettPages.find(p => p.frontmatter.wid === x.wid);
        })
      };
    })
    .filter(e => e.brokenLinks.length > 0);

  return (
    <div>
      <div>
        Broken Links (Total: {pageBrokenLinks.reduce((acc, e) => acc + e.brokenLinks.length, 0)})
      </div>
      {pageBrokenLinks.map(e => (
        <div key={`item-${e}`}>
          <h4>
            Page: <Link to={e.pageSlug}>{e.pageTitle}</Link>{' '}
          </h4>
          <ul>
            {e.brokenLinks.map(l => (
              <li key={`item-${l.wid}`}>
                Title: <code className='language-text'>{l.title}</code> - WID:{' '}
                <code className='language-text'>{l.wid}</code>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ZettBrokenLinkRoute;

export const pageQuery = graphql`
  query ZettBrokenLinks {
    allMdx(filter: { frontmatter: { layout: { eq: "zettelkasten" }, draft: { ne: true } } }) {
      nodes {
        mdxAST
        frontmatter {
          title
          wid
        }
        fields {
          slug
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`;
