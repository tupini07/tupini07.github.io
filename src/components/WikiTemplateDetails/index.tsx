import React from 'react';
import { Link } from 'gatsby';
import moment from 'moment';
import Disqus from '../Disqus/Disqus';
import wikiTDStyle from './wikitemplatedetails.module.scss';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import WikiLink from '../WikiLink';

const WikiTemplateDetails = ({ data }) => {
  const { subtitle, author } = data.site.siteMetadata;
  const post = data.mdx;
  const tags = post.fields.tagSlugs;

  const tagsBlock = (
    <div className='post-single__tags'>
      <ul className='post-single__tags-list'>
        {tags &&
          tags.map((tag, i) => (
            <li className='post-single__tags-list-item' key={tag}>
              <Link to={tag} className='post-single__tags-list-item-link'>
                {post.frontmatter.tags[i]}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );

  return (
    <div>
      <h1 className={wikiTDStyle.title}>{post.frontmatter.title}</h1>
      <div className={wikiTDStyle.subtitleItem}>
        <em>{post.frontmatter.wid}</em>
      </div>
      <div className={wikiTDStyle.subtitleItem}>
        <em>Created on: {moment(post.frontmatter.date).format('D MMM YYYY')}</em>
      </div>
      <MDXProvider
        components={{
          a: (props) => <WikiLink {...props} />,
        }}
      >
        <MDXRenderer className='post-single__body'>{post.body}</MDXRenderer>
      </MDXProvider>
      {tagsBlock}
    </div>
  );
};

export default WikiTemplateDetails;
