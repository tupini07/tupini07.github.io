import { graphql } from 'gatsby';
import React from 'react';
import { WikiBrokenLinksQuery } from '../graphql';

const WikiBrokenLinkRoute = ({
  data,
  location
}: {
  data: WikiBrokenLinksQuery;
  location: string;
}) => {
  const { title } = data.site.siteMetadata;
  const wikiPages = data.allMdx.nodes;

  const findLinksInAST = (root): any => {
    if (root.type === 'link' && root.url.startsWith('WID:'))
      return {
        wid: root.url,
        title: root.children.find(e => e.type === 'text')?.value || 'NO-TITLE'
      };
    else if (root.children) {
      var links = [];
      for (const c of root.children) {
        links = links.concat(findLinksInAST(c));
      }
      return links;
    } else {
      return [];
    }
  };

  const pageBrokenLinks = wikiPages
    .map(e => {
      return {
        pageWID: e.frontmatter.wid,
        pageTitle: e.frontmatter.title,
        pageSlug: e.fields.slug,
        brokenLinks: findLinksInAST(e.mdxAST).filter(e => {
          return !wikiPages.find(p => p.frontmatter.wid === e.wid);
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
        <div>
          <h4>
            Page: <a href={e.pageSlug}>{e.pageTitle}</a>{' '}
          </h4>
          <ul>
            {e.brokenLinks.map(l => (
              <li>
                Title: <code className="language-text">{l.title}</code> - WID:{' '}
                <code className="language-text">{l.wid}</code>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default WikiBrokenLinkRoute;

export const pageQuery = graphql`
  query WikiBrokenLinks {
    allMdx(filter: { frontmatter: { layout: { eq: "wiki" }, draft: { ne: true } } }) {
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
