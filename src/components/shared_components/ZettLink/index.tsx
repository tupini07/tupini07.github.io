import { graphql, useStaticQuery, Link } from 'gatsby';
import React from 'react';
import zettLinkStyle from './zettlink.module.scss';

const ZettLink = ({ href, children }: { href: string; children?: string }) => {
  const data = useStaticQuery(graphql`
    query ZettLinkItems {
      allMdx(filter: { frontmatter: { layout: { eq: "zettelkasten" }, draft: { ne: true } } }) {
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

  let linkClassName = zettLinkStyle.external_link;

  if (href.startsWith('WID:')) {
    const page = data.allMdx.nodes.find((e) => e.frontmatter.wid === href);

    // if the page doesn't exist
    if (page) {
      // If link title starts with '!!' then ignore it and use the one from
      // the actual page
      if (children)
        children = children.startsWith('!!')
          ? page.frontmatter.title
          : children || page.frontmatter.title;
      else children = page.frontmatter.title;

      href = page.fields.slug;
      linkClassName = zettLinkStyle.internal_link;
    } else {
      children = `BROKEN-LINK (${href})`;
      href = '#';
      linkClassName = `${zettLinkStyle.internal_link} ${zettLinkStyle.broken_link}`;
    }
  }

  if (href.includes('.wikipedia.')) linkClassName = zettLinkStyle.external_wiki_link;
  else if (href.includes('.github.')) linkClassName = zettLinkStyle.external_github_link;

  return (
    <Link to={href} className={linkClassName}>
      {children}
    </Link>
  );
};

export default ZettLink;
