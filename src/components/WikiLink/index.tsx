import { Link, useStaticQuery, graphql } from 'gatsby';
import moment from 'moment';
import React from 'react';
import './style.scss';

const WikiLink = ({ href, children }: { href: string; children?: string }) => {
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

  let isInternalLink = href.startsWith('WID:');
  if (isInternalLink) {
    const page = data.allMdx.nodes.find((e) => e.frontmatter.wid === href);

    // If link title starts with '!!' then ignore it and use the one from
    // the actual page
    children = children.startsWith('!!')
      ? page.frontmatter.title
      : children || page.frontmatter.title;

    href = page.fields.slug;
  }

  let linkClassName = isInternalLink ? '' : 'external-link';

  if (href.includes('.wikipedia.')) linkClassName = 'external-wiki-link';
  else if (href.includes('.github.com')) linkClassName = 'external-github-link';

  return (
    <a href={href} className={linkClassName}>
      {children}
    </a>
  );
};

export default WikiLink;
