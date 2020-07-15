import { Link, useStaticQuery, graphql } from 'gatsby';
import moment from 'moment';
import React from 'react';
import wikiLinkStyle from './wikilink.module.scss';

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

  let linkClassName = wikiLinkStyle.external_link;

  if (href.startsWith('WID:')) {
    const page = data.allMdx.nodes.find((e) => e.frontmatter.wid === href);

    // if the page doesn't exist
    if (page) {
      // If link title starts with '!!' then ignore it and use the one from
      // the actual page
      children = children.startsWith('!!')
        ? page.frontmatter.title
        : children || page.frontmatter.title;

      href = page.fields.slug;
      linkClassName = wikiLinkStyle.internal_link;
    } else {
      children = `BROKEN-LINK (${href})`;
      href = '#';
      linkClassName = `${wikiLinkStyle.internal_link} ${wikiLinkStyle.broken_link}`;
    }
  }

  if (href.includes('.wikipedia.')) linkClassName = wikiLinkStyle.external_wiki_link;
  else if (href.includes('.github.')) linkClassName = wikiLinkStyle.external_github_link;

  return (
    <a href={href} className={linkClassName}>
      {children}
    </a>
  );
};

export default WikiLink;
